import React from "react";

export default function MenuAddBox() {
    return (
        <div className="dsmenu">
            <div className="dsAddBox">
                <div className="dsItemmenu">
                    <strong>TEXT</strong>
                    <ul>
                        <li>Markdown</li>
                        <li>HTML</li>
                        <li>WYSISYG</li>
                        <li>Wiki</li>
                    </ul>
                </div>
                <div className="dsItemmenu">
                    <strong>MEDIA</strong>
                    <ul>
                        <li>Image</li>
                        <li>Sound file</li>
                        <li>Movie</li>
                    </ul>
                </div>
                <div className="dsItemmenu">
                    <strong>QUERY</strong>
                    <ul>
                        <li>SQL (Postgresql)</li>
                        <li>SQL (MySQL)</li>
                        <li>SPARQL</li>
                        <li>GraphQL</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}