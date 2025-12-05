import React from "react";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {IResultList} from "../misc/interfaces";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';
import icon_settings from '../assets/img/icons/icon-settings.svg';
import icon_view from '../assets/img/icons/documents-svgrepo-com.svg';
import {API_URL} from "../misc/functions";

function BrowserHome() {
    const [data, setData] = useState<IResultList>({status: "", structure: []});
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeStore, setActiveStore] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    async function fetchData() {
        const response = await fetch(API_URL + "get_data_stories");
        const json = await response.json();
        setData(json);
        if (json.auth.logged_in === 'yes') {
            document.getElementById("login_status").innerText = json.auth.user;
            setLoggedIn(true);
        }
        setLoading(false);
    }

    function activeRow(store): string {
        if (store === activeStore) {
            return "dsActiveIndexRow";
        } else {
            return "dsResultRow";
        }
    }

    async function delete_datastory(uuid) {
        if (window.confirm("Delete datastory?") === true) {
            const response = await fetch(API_URL + 'delete?ds=' + uuid);
            const json = await response.json();
            if (json.status === "OK") {
                setLoading(true);
            }
        }
    }

    async function createDataStory() {
        const response = await fetch(API_URL + 'create_new');
        const json = await response.json();
        if (json.datastory_id !== undefined) {
            navigate(0);
        } else {
            alert("ERROR: No new data story created!");
        }
    }

    function getStatus(s) {
        switch (s) {
            case 'D':
                return 'Draft';
            case 'P':
                return 'Published';
            default:
                return "?";
        }
    }

    useEffect(() => {
        fetchData();
    }, [loading]);

    return (
        <div className="dsRepository">
            <div className="btnPanel">
                {loggedIn && <div className="panelButton" onClick={() => createDataStory()}>+ New</div>}
                {/*<div className="panelButton" onClick={() => {
                    if (activeStore === "") {
                        alert("No data story selected!");
                    } else {
                        navigate("story/" + activeStore);
                    }
                }}><img className="panelIcon" src={icon_edit}/> Edit
                </div>
                <div className="panelButton" onClick={() => {
                    if (activeStore === "") {
                        alert("No data story selected for deletion!");
                    } else {
                        delete_datastory();
                    }
                }}><img className="panelIcon" src={icon_delete}/> Delete
                </div>*/}
            </div>
            {loading ? (
                <div>Data stories loading...</div>
                //<div id={"announcement"}>CLARIAH Data Stories Editor will be available from June 11th.</div>
            ) : (
                <div>
                    <div className="dsResultTable">
                        <div className="dsResultHeaderRow">
                            <div className="dsResultCell">Title</div>
                            <div className="dsResultCell">Status</div>
                            <div className="dsResultCell">Owner</div>
                            {/*<div className="dsResultCell">Group</div>*/}
                            <div className="dsResultCell">Created</div>
                            <div className="dsResultCell">Modified</div>
                            <div className="dsPicResultCell"></div>
                            {loggedIn && <>
                                <div className="dsPicResultCell"></div>
                                <div className="dsPicResultCell"></div>
                                <div className="dsPicResultCell"></div>
                            </>}
                        </div>
                        {data.structure.map((item, index: number) => {
                            return (
                                <div className={`${item.uuid === activeStore ? 'dsActiveResultRow' : 'dsResultRow'}`}
                                     key={index} onClick={() => setActiveStore(item.uuid)}
                                     onDoubleClick={() => {
                                         setActiveStore(item.uuid);
                                         navigate("story/view/" + activeStore);
                                     }}>
                                    <div className="dsResultCell dsTitleCell">{item.title}</div>
                                    <div className="dsResultCell">{getStatus(item.status)}</div>
                                    <div className="dsResultCell">{item.owner}</div>
                                   {/* <div className="dsResultCell">{item.groep}</div>*/}
                                    <div className="dsResultCell">{item.created}</div>
                                    <div className="dsResultCell">{item.modified}</div>
                                    <div title="View datastory" className="dsPicResultCell" onClick={() => {
                                        setActiveStore(item.uuid);
                                        navigate("story/view/" + item.uuid);
                                    }}><img className="panelIcon"
                                                                                                 src={icon_view}/></div>
                                    {loggedIn &&
                                    <>
                                        {item.rights[1] === 'W' ? (
                                            <div title="Edit datastory" className="dsPicResultCell" onClick={() => {
                                                setActiveStore(item.uuid);
                                                navigate("story/edit/" + item.uuid);
                                            }}><img className="panelIcon" src={icon_edit}/></div>) : (
                                            <div title="Edit datastory" className="dsPicResultCell"><img
                                                className="panelIconDisabled" src={icon_edit}/></div>
                                        )}</>}
                                    {loggedIn &&
                                    <>{item.rights[2] === 'D' ? (
                                        <div title="Delete datastory" className="dsPicResultCell" onClick={() => {
                                            delete_datastory(item.uuid)
                                        }}><img className="panelIcon" src={icon_delete}/></div>) : (
                                        <div className="dsPicResultCell"><img className="panelIconDisabled"
                                                                              src={icon_delete}/></div>)}</>}
                                    {loggedIn && <>{item.rights[4] === 'S' ? (<div title="Settings" className="dsPicResultCell" onClick={() => {
                                        setActiveStore(item.uuid);
                                        navigate("settings/" + item.uuid);
                                    }}><img className="panelIcon" src={icon_settings}/></div>) : (
                                        <div title="Settings" className="dsPicResultCell"><img className="panelIconDisabled" src={icon_settings}/></div>
                                    )}</>}
                                </div>
                            )
                        })}
                    </div>
                    <div className="homeText"><h3>About this version</h3>
                        <div>
                            This version of the Data Stories editor is not an official version, but a demonstration of
                            the work in progress.
                            The viewer mode of the editor is nearly completed, but editing a complete data story is nog
                            yet possible.
                        </div>
                        <div>
                            Editing texts and adding images and external media is possible, but the SPARQL editor is
                            still in progress. That's also the case for the metadata and provenance editors.<br/>
                            Global metadata are editable, but limited, due to an overhaul of the metadata editor.
                        </div>
                        <div>
                            The release of the first test version is expected in the first week of May. That version
                            will contain the main part of the projected functionality, like:
                            <ul>
                                <li>The SPARQL editor</li>
                                <li>Metadata and provenance editors</li>
                                <li>Authorisation</li>
                                <li>Comments</li>
                            </ul>
                            <div>Besides these features we are working on bugfixing, user documentation and improving
                                usability.
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BrowserHome;