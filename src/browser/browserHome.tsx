import React from "react";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {IResultList} from "../misc/interfaces";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';
import {API_URL} from "../misc/functions";

function BrowserHome() {
    const [data, setData] = useState<IResultList>({status: "", structure: []});
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeStore, setActiveStore] = useState("");
    const navigate = useNavigate();

    async function fetchData() {
        const response = await fetch(API_URL +  "get_data_stories");
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function activeRow(store): string {
        if (store === activeStore) {
            return "dsActiveIndexRow";
        } else {
            return "dsResultRow";
        }
    }

    async function delete_datastory() {
        if (window.confirm("Delete datastory?") === true   ) {
            const response = await fetch(API_URL + 'delete?ds=' + activeStore);
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
            navigate('edit/' + json.datastory_id);
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
                <div className="panelButton" onClick={() => createDataStory()}>+ New</div>
                <div className="panelButton" onClick={() => {
                    if (activeStore === "") {
                        alert("No data story selected!");
                    } else {
                        navigate("edit/" + activeStore);
                    }
                }}><img className="panelIcon" src={icon_edit}/> Edit</div>
                <div className="panelButton" onClick={() => {
                    if (activeStore === "") {
                        alert("No data story selected for deletion!");
                    } else {
                        delete_datastory();
                    }
                }}><img  className="panelIcon" src={icon_delete}/> Delete</div>
            </div>
            {loading ? (
                <div>Data stories loading...</div>
            ) : (
                <div className="dsResultTable">
                    <div className="dsResultHeaderRow">
                        <div className="dsResultCell">Title</div>
                        <div className="dsResultCell">Status</div>
                        <div className="dsResultCell">Owner</div>
                        <div className="dsResultCell">Group</div>
                        <div className="dsResultCell">Created</div>
                        <div className="dsResultCell">Modified</div>
                    </div>
                    {data.structure.map((item, index: number) => {
                        return (
                                    <div className={`${item.uuid === activeStore ? 'dsActiveResultRow' : 'dsResultRow'}`} key={index} onClick={() => setActiveStore(item.uuid)}>
                                        <div className="dsResultCell">{item.title}</div>
                                        <div className="dsResultCell">{getStatus(item.status)}</div>
                                        <div className="dsResultCell">{item.owner}</div>
                                        <div className="dsResultCell">{item.groep}</div>
                                        <div className="dsResultCell">{item.created}</div>
                                        <div className="dsResultCell">{item.modified}</div>
                                    </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default BrowserHome;