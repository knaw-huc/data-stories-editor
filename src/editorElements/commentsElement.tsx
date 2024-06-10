import React from "react";
import {useState} from "react";

function CommentsElement({content}: {content: object}) {
    const [editCommentMode, setEditCommentMode] = useState(false);
    let comments = content["ds:Comments"]
    let commText = "";
    let newDate = Date();

    function handleChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        commText = e.currentTarget.value;
    }

    const saveComment = () => {
        comments.push({"comment": {"_text": commText}, "dct:author": "Rob Zeeman", "dct:date": Date()});
        console.log(comments);
        setEditCommentMode(false);
    }


    return (<div className="commentArea">
        {comments.map((item, index) => {
            return (
                <div key={index}>
                    <strong>{item["dct:author"]} - {item["dct:date"]}</strong>
                    <div className="multiLineText">{item["comment"]["_text"]}</div>
                    <hr className="commentDivider"/>
                </div>
            )
        })}
        {editCommentMode ?
            (<div>
                <textarea onChange={handleChange}></textarea>
                <div className="commentSaveBtn">
                <button onClick={saveComment}>Save comment</button>
                <button onClick={() => setEditCommentMode(false)}>Discard</button>
                </div>
            </div>) :
            (<div  className="addCommentElement" onClick={() => setEditCommentMode(true)}>Add comment</div>)}

    </div>)
}

export default CommentsElement;