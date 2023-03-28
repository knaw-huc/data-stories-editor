import React from "react";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {IResultList} from "../misc/interfaces";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';

function BrowserHome() {
    const [data, setData] = useState<IResultList>({amount: 0, items: []});
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeStore, setActiveStore] = useState("");
    const navigate = useNavigate();

    async function fetchData() {
        const response = await fetch("http://localhost:5000/browse");
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

    useEffect(() => {
        fetchData();
    }, [loading]);

    return (
        <div className="dsRepository">
            <div className="btnPanel">
                <div className="panelButton" onClick={() => navigate("edit")}>+ New</div>
                <div className="panelButton" onClick={() => {
                    if (activeStore === "") {
                        alert("No data story selected");
                    } else {
                        navigate("edit/" + activeStore);
                    }
                }}><img className="panelIcon" src={icon_edit}/> Edit</div>
                <div className="panelButton"><img  className="panelIcon" src={icon_delete}/> Delete</div>
            </div>
            {loading ? (
                <div>Data stories loading...</div>
            ) : (
                <div className="dsResultTable">
                    <div className="dsResultHeaderRow">
                        <div className="dsResultCell">Title</div>
                        <div className="dsResultCell">Filename</div>
                        <div className="dsResultCell">Owner</div>
                        <div className="dsResultCell">Group</div>
                        <div className="dsResultCell">Created</div>
                        <div className="dsResultCell">Modified</div>
                    </div>
                    {data.items.map((item, index: number) => {
                        return (
                                    <div className={`${item.store === activeStore ? 'dsActiveResultRow' : 'dsResultRow'}`} key={index} onClick={() => setActiveStore(item.store)}>
                                        <div className="dsResultCell">{item.title}</div>
                                        <div className="dsResultCell">{item.filename}</div>
                                        <div className="dsResultCell">{item.owner}</div>
                                        <div className="dsResultCell">{item.group}</div>
                                        <div className="dsResultCell">{item.created.replace('T', " ")}</div>
                                        <div className="dsResultCell">{item.modified.replace('T', " ")}</div>
                                    </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default BrowserHome;