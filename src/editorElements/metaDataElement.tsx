import React from "react";
import {useState} from "react";
import {API_URL} from "../misc/functions";

function MetaDataElement({block, changeStyle}: { block: object, changeStyle: Function }) {
    const [title, setTitle] = useState(block["dct:title"]["_text"]);
    const [authors, setAuthors] = useState(get_authors);
    const [landing, setLanding] = useState(get_landing_page);
    const [endpoint, setEndpoint] = useState(get_endpoint);
    const [refresh, setRefresh] = useState(false);

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        //setHeaderValue(e.currentTarget.value);
        if (e.currentTarget.id === 'title') {
            setTitle(e.currentTarget.value);
        }
        if (e.currentTarget.className === 'author') {
            let buffer = authors;
            const index =  parseInt(e.currentTarget.id.substring(1));
            buffer[index] = e.currentTarget.value;
            setAuthors(buffer);
        }
        if (e.currentTarget.id === 'landing') {
            reset_status('landing');
            setLanding(e.currentTarget.value);
        }
        if (e.currentTarget.id === 'endpoint') {
            reset_status('endpoint');
            setLanding(e.currentTarget.value);
        }
    }

    function get_landing_page() {
        if (block.hasOwnProperty("ds:LandingPage")) {
            return block["ds:LandingPage"]["_text"];
        } else {
            return ""
        }
    }

    function get_endpoint() {
        if (block.hasOwnProperty("ds:Endpoint")) {
            return block["ds:Endpoint"]["_text"];
        } else {
            return ""
        }
    }

    function get_authors() {
        let list = [];
        block["dct:creator"].map((item) => {
            list.push(item["_text"]);
        })
        return list;
    }

    function saveMetadata() {
        console.log(authors);
        block["dct:title"]["_text"] = title;
        changeStyle();
    }

    function delete_author(id) {
        let buffer = authors;
        buffer.splice(id, 1);
        setAuthors(buffer);
        setRefresh(!refresh);
    }

    function add_author() {
        let buffer = authors;
        authors.push("")
        setAuthors(buffer);
        setRefresh(!refresh);
    }

    async function check_url(url_type) {
        let url = "";
        switch(url_type) {
            case "landing":
                url = landing;
                break;
            case "endpoint":
                url = endpoint;
                break;
            default:
                return
        }
        const urlStruc = {url: url}
        const response = await fetch(API_URL + "check_url", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlStruc)
        });
        const json = await response.json();
        if (json.status === 200) {
            set_status_ok(url_type);
        } else {
            set_status_not_ok(url_type);
        }
        console.log(json);
    }


    function set_status_ok(url_type) {
        switch(url_type) {
            case "landing":
                document.getElementById("landing_ok").classList.remove("no_view");
                break;
            case "endpoint":
                document.getElementById("endpoint_ok").classList.remove("no_view");
                break;
        }
    }

    function set_status_not_ok(url_type) {
        switch(url_type) {
            case "landing":
                document.getElementById("landing_not_ok").classList.remove("no_view");
                break;
            case "endpoint":
                document.getElementById("endpoint_not_ok").classList.remove("no_view");
                break;
        }
    }

    function reset_status(url_type) {
        switch(url_type) {
            case "landing":
                document.getElementById("landing_ok").classList.add("no_view");
                document.getElementById("landing_not_ok").classList.add("no_view");
                break;
            case "endpoint":
                document.getElementById("endpoint_ok").classList.add("no_view");
                document.getElementById("endpoint_not_ok").classList.add("no_view");
                break;
        }
    }

return (
    <div>
        <h1>Edit metadata </h1>
        <div className="editorWrapper">
            <h4>Datastory title</h4>
            <input type="text" id="title" defaultValue={title} size={400} onChange={handleChange}/>
            <h4>Author(s)</h4>
            {
                authors.map((item, index) => {
                    const a_id = "a" + index.toString();
                    if (index === 0) {
                    return (<div><input type="text" id={a_id}  className="author" defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={add_author}>+</button></div>);}
                    else {
                        return (<div><input type="text" id={a_id} className="author" defaultValue={item} size={40} onChange={handleChange} /><button className="authorBtn" onClick={() => {delete_author(index)}}>-</button></div>);
                    }
                })
            }
            <h4>License</h4>
            <input type="text" id="license" defaultValue={block["dct:license"]["_text"]} size={40}  onChange={handleChange}/>
            <h4>Landing page</h4>
            <input type="text" id="landing" defaultValue={landing} size={500}  onChange={handleChange}/><button className="authorBtn" onClick={() => {check_url('landing')}}>Check</button><span id="landing_ok" className="no_view">&#10003;</span><span id="landing_not_ok" className="no_view">X</span>
            <h4>Endpoint</h4>
            <input type="text" id="endpoint" defaultValue={block["ds:Endpoint"]["_text"]} size={1000}  onChange={handleChange}/><button className="authorBtn" onClick={() => {check_url('endpoint')}}>Check</button><span id="endpoint_ok" className="no_view">&#10003;</span><span id="endpoint_not_ok" className="no_view">X</span>
        </div>
        <button onClick={saveMetadata}>Save</button>
    </div>
)
}

export default MetaDataElement;