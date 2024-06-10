import React, {ReactElement} from 'react';
import {useEffect} from "react";
import StoryBlockMD from "./dsStoryBlockContent_md";
import StoryBlockTable from "./dsStoryBlockContent_table";
import StoryBlockImage from "./dsStoryBlockContent_image";
import StoryBlockHeader from "./dsStoryBlockContent_storyHead";
import YasguiBlock from "./yasguiBlock";
import StoryBlockFrame from "./dsStoryBlockContent_frame";
import StoryBlockNew from "./dsStoryBlockNewBlock";
import CommentsElement from "../editorElements/commentsElement";
import icon_edit from '../assets/img/icons/icon-edit.svg';
import icon_delete from '../assets/img/icons/icon-delete.svg';
import icon_down from '../assets/img/icons/down-arrow-svgrepo-com.svg';
import icon_up from '../assets/img/icons/up-arrow-svgrepo-com.svg';


function StoryBlock({
                        content,
                        contentType,
                        dataStoryData,
                        currentEditBlock,
                        setCurrentEditBlock,
                        setDataStoryData,
                        setEditorStatus,
                        editorStatus,
                        deleteStoryBlockByID,
                        store,
                        orderArray,
                        setOrderArray,
                        reload,
                        editMode,
                        commentMode
                    }: {
    content: object,
    contentType: String,
    dataStoryData: object,
    currentEditBlock: object,
    setCurrentEditBlock: Function,
    setDataStoryData: Function,
    setEditorStatus: Function,
    editorStatus: boolean,
    deleteStoryBlockByID: Function,
    store: string
    orderArray: String[]
    setOrderArray: Function
    reload: Function,
    editMode: boolean,
    commentMode: boolean
}): ReactElement {
    const ifHeader = contentType === 'header';
    const ifText = contentType === 'text';
    const ifQuery = contentType === 'query';
    //const ifTestQuery = contentType === 'query' && content['_attributes']["xml:id"] === 'b7';
    const ifImage = contentType === 'media' && content['_attributes']["mime"] !== 'text/html';
    const ifFrame = contentType === 'media' && content['_attributes']["mime"] === 'text/html';

    let h2Title = '';
    let contentTxt = '';
    let blockId = '';
    let imgHref = '';
    let endpoint = '';
    let frameHref = '';
    let comments = [];

    let leftBlockPartClass = "dsBlock__left";
    if (editMode) {
        leftBlockPartClass = 'dsBlock__handle revealBlock dsBlock__left';
    }

    if (!content.hasOwnProperty("ds:Comments")) {
        content["ds:Comments"] = [];
    };

    function switchElements(value, direction = 'up') {
        const sourceIndex = orderArray.indexOf(value);
        let tmpArr = orderArray;
        let targetIndex = sourceIndex - 1;
        if (direction === 'down') {
            targetIndex = sourceIndex + 1;
        }
        [tmpArr[sourceIndex], tmpArr[targetIndex]] = [tmpArr[targetIndex], tmpArr[sourceIndex]];
        let blockList = dataStoryData["ds:DataStory"]["ds:Story"]["ds:Block"];
        [blockList[sourceIndex], blockList[targetIndex]] = [blockList[targetIndex], blockList[sourceIndex]];
        dataStoryData["ds:DataStory"]["ds:Story"]["ds:block"] = blockList;
        setDataStoryData(dataStoryData);
        setOrderArray(tmpArr);
        reload();
    }

    if (ifHeader) {
        blockId = 'pageHeader'  //
    }

    if (ifText) {
        blockId = content['_attributes']["xml:id"]  //

        if (content['ds:Metadata'] !== undefined) {
            h2Title = content['ds:Metadata']['dct:title']._text
        }
        contentTxt = content['_text'];
    }

    if (ifQuery) {
        blockId = content['_attributes']["xml:id"]  //
        endpoint = getEndpoint(content);
        if (content['ds:Metadata'] !== undefined) {
            h2Title = content['ds:Metadata']['dct:title']._text
        }
    }

    if (ifImage) {
        blockId = content['_attributes']["xml:id"]  //
        imgHref = content['_attributes']["href"]
        if (content['ds:Metadata'] !== undefined) {
            h2Title = content['ds:Metadata']['dct:title']._text
        }
    }

    if (ifFrame) {
        blockId = content['_attributes']["xml:id"]  //
        frameHref = content['_attributes']["href"]
        if (content['ds:Metadata'] !== undefined) {
            h2Title = content['ds:Metadata']['dct:title']._text
        }
    }

    function getEndpoint(content) {
        if (content?.["ds:Metadata"]?.["ds:Endpoint"]?.[0]?.["_text"] !== undefined && content["ds:Metadata"]["ds:Endpoint"][0]["_text"] !== '' ) {
            return content["ds:Metadata"]["ds:Endpoint"][0]["_text"];
        } else {
            if (dataStoryData["ds:DataStory"]["ds:Metadata"]?.["ds:Endpoint"]?.[0]?.["_text"] !== undefined && dataStoryData["ds:DataStory"]["ds:Metadata"]["ds:Endpoint"][0]["_text"] !== '') {
                return dataStoryData["ds:DataStory"]["ds:Metadata"]["ds:Endpoint"][0]["_text"]
            } else {
                return "no_endpoint";
            }
        }
    }

    function changeCurEdit() {
        setCurrentEditBlock({block_id: blockId})
        setEditorStatus(true);
    }

    function changeMetadata() {
        setCurrentEditBlock({block_id: "metadata"});
        setEditorStatus(true);
    }

    function deleteCurBlock() {

    }


    useEffect(() => {
    }, [dataStoryData, currentEditBlock]);


    return (
        <>

            <div className="dsBlock dsBlock__layout dsBlock__margin">
                <div className={leftBlockPartClass}>
                    {ifHeader ? (
                        editMode &&  (<button type="button" name="button" className="bt_icon block_event" onClick={changeMetadata}>
                            <img src={icon_edit} alt=""/>
                        </button>) ) : (
                        editMode && (<button type="button" name="button" className="bt_icon block_event" onClick={changeCurEdit}>
                            <img src={icon_edit} alt=""/>
                        </button>))}

                    {!ifHeader && editMode && (<>
                        <button type="button" name="button" className="bt_icon" onClick={() => {
                            if (window.confirm("Delete data story block?")) {
                                deleteStoryBlockByID(blockId);
                            }
                        }}>
                            <img src={icon_delete} alt=""/>
                        </button>
                        {blockId !== orderArray[0] && (<button type="button" name="button" className="bt_icon bt_icon_up" onClick={
                            () => {switchElements(blockId, 'up')}
                        }>
                            <img src={icon_up} alt=""/>
                        </button>)}
                            {blockId !== orderArray[orderArray.length -1] &&  (<button type="button" name="button" className="bt_icon bt_icon_down" onClick={
                                () => {switchElements(blockId, 'down')}
                            }>
                                <img src={icon_down} alt=""/>
                            </button>)}
                        </>
                    )}
                </div>
                <div className="dsBlock__content dsBlock__right" id={blockId}>

                    {ifHeader && (
                        <StoryBlockHeader contentHeader={content}/>
                    )}

                    {ifText && (
                        <StoryBlockMD contentHead={h2Title} contentBody={contentTxt}/>
                    )}


                    {ifQuery && (<YasguiBlock contentHead={h2Title} content={content} store={store} endpoint={endpoint} />)}
                    {ifImage && (
                        <StoryBlockImage
                            title={h2Title}
                            href={imgHref}
                        />
                    )}
                    {ifFrame && (<StoryBlockFrame title={h2Title} href={frameHref}/>)}

                    {commentMode && !editMode && <CommentsElement content={content}/>}

                </div>
            </div>
            { editMode && (<StoryBlockNew
                prevId={blockId}
                dataStoryData={dataStoryData}
                setDataStoryData={setDataStoryData}
                setCurrentEditBlock={setCurrentEditBlock}
            />)}
        </>

    )
}


export default StoryBlock;