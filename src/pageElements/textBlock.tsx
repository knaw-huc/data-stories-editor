import React from 'react';
import {Fragment} from "react";
import {useState} from "react";
import MenuAddBox from "./menuAddBox";

function TextBlock() {
    const [editView, setEditView] = useState(true);
    const [preview, setPreview] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    return (
        <div className="dsTextBlock">
            <div className="dsBlockHeadMenu">
                <ul>
                    <li><span className="material-symbols-sharp">toggle_off</span> Metadata</li>
                    <li><span className="material-symbols-sharp">toggle_off</span> Notes & commentaries</li>
                    <li><span className="material-symbols-sharp">toggle_off</span> Provenance</li>
                    <li onClick={() => {setEditView(!editView)}}>
                        {editView ? (<span className="material-symbols-sharp">toggle_on</span>) : (<span className="material-symbols-sharp">toggle_off</span>)} Edit view</li>
                    <li onClick={() => {setPreview(!preview)}}>{preview ? (<span className="material-symbols-sharp">toggle_on</span>) : (<span className="material-symbols-sharp">toggle_off</span>)} Preview</li>
                </ul>
                <div className="dsTypeName">TEXT</div>
            </div>
            {!collapsed && (<div className="dsTextBlockContent">
                {editView && (<div className="dsEditor dsEditFont">
                    <p>## Cultural objectivism and capitalist narrative</p>
                    <p>The subject is contextualised into a Marxist capitalism that includes
                    language as a totality. In a sense, the futility, and eventually the defining
                    characteristic, of capitalist narrative depicted in Stone’s *Natural Born
                        Killers* emerges again in *Heaven and Earth*.</p>

                    <p>Derrida promotes the use of cultural objectivism to challenge archaic
                    perceptions of class. Thus, in *JFK*, Stone examines Marxist capitalism;
                        in *Natural Born Killers*, although, he reiterates cultural objectivism.</p>
                </div>)}
                {preview && (<div className="dsEditor dsPreview">
                    <h2>Cultural objectivism and capitalist narrative</h2>
                    <p>The subject is contextualised into a Marxist capitalism that includes
                    language as a totality. In a sense, the futility, and eventually the defining
                    characteristic, of capitalist narrative depicted in Stone’s <em>Natural Born
                    Killers</em> emerges again in <em>Heaven and Earth</em>.</p>

                            <p>Derrida promotes the use of cultural objectivism to challenge archaic
                    perceptions of class. Thus, in <em>JFK</em>, Stone examines Marxist capitalism;
                    in <em>Natural Born Killers</em>, although, he reiterates cultural objectivism.</p>
                </div>)}
            </div>)}
            <div className="dsBlockMenuBottom">
                <ul>
                    <li onClick={() => {setMenuActive(true)}}><span className="material-symbols-sharp">add_box</span> Add block below</li>
                    <li><span className="material-symbols-sharp">pinch</span> Move this block</li>
                    <li onClick={() => {setCollapsed(!collapsed)}}>{!collapsed ? (<React.Fragment><span className="material-symbols-sharp">unfold_less</span>Collapse block</React.Fragment>) :(<React.Fragment><span className="material-symbols-sharp">unfold_more</span>Expand block</React.Fragment>)}</li>

                </ul>
            </div>
            {menuActive && (<div className="dsMenuBox" onClick={() => {setMenuActive(false)}}>
                <MenuAddBox/>
            </div>)}
        </div>
    )
}

export default TextBlock;