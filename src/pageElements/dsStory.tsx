import React from 'react';
import {useState, useEffect} from "react";
import {json, useNavigate, useParams} from "react-router-dom";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";
import YasguiBlock from "./yasguiBlock";
import {API_URL} from "../misc/functions";



function Story() {
    const navigate = useNavigate();
    const params = useParams();
    const store = params.store as string;
    const [storyHeader, setStoryHeader] = useState(Object);
    const [loading, setLoading] = useState(true);
    const [currentEditBlock, setCurrentEditBlock] = useState({"block_id": ""});
    const [editorStatus, setEditorStatus] = useState(false);
    const [showOpenDialog, setShowOpenDialog] = useState(false);
    const [currentDataStory, setCurrentDataStory] = useState(store);
    const [contentType, setContentType] = useState<string>("");
    const [refresh, setRefresh] = useState(true);
    const [storyOrder, setStoryOrder] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [commentMode, setCommentMode] = useState(false);

    //console.log('currentDataStory', currentDataStory);

    const [dataStoryData, setDataStoryData] = useState({
        "_declaration": {},
        "_instruction": {},
        "ds:DataStory": {}
    });

    //console.log(dataStoryData);

    if (Object.keys(dataStoryData["ds:DataStory"]).length === 0) {
        fetch_data();
    }


    async function fetch_data() {
        const response = await fetch(API_URL + 'get_item?ds=' + store);
        const json = await response.json();
        setDataStoryData(json);
        setDataElements(json);
        setLoading(false);
    }



    function checkDataStoryData(data) {
        return new Promise((resolve, reject) => {
            setDataStoryData(data)
            resolve(data);
        })
    }



    function setDataElements(data) {
        setStoryHeader(data['ds:DataStory']['ds:Metadata']);
        if (storyOrder.length === 0) {
            let tmpArray = [];
            data["ds:DataStory"]["ds:Story"]["ds:Block"].map((item) => {
                tmpArray.push(item["_attributes"]["xml:id"]);
            });
            setStoryOrder(tmpArray);
        }

    }

    function reload() {
        setRefresh(!refresh);
    }


    const deleteStoryBlockByID = (id) => {
        const index = findBlockById(id);
        if (index > -1) {
            let buffer = dataStoryData['ds:DataStory']['ds:Story']['ds:Block'];
            delete buffer[index];
            let newDSD = dataStoryData;
            newDSD['ds:DataStory']['ds:Story']['ds:Block'] = buffer.flat();
            setDataStoryData(newDSD);
            setRefresh(!refresh);
        }
    }

    function findBlockById(currentBlock) {
        const allBlocks = dataStoryData['ds:DataStory']['ds:Story']['ds:Block']

        var out = -1;
        for (var i = 0; i < allBlocks.length; i++) {
            if (allBlocks[i]['_attributes']["xml:id"] === currentBlock) {
                out = i;
            }
        }
        return out;
    }


    return (
        <>


            <div className="dataStoryBlocks">


                {!loading ? (
                        <DsStoryBlock
                            content={dataStoryData['ds:DataStory']['ds:Metadata']}
                            contentType="header"
                            dataStoryData={dataStoryData}
                            currentEditBlock={currentEditBlock}
                            setCurrentEditBlock={setCurrentEditBlock}
                            setDataStoryData={setDataStoryData}
                            setEditorStatus={setEditorStatus}
                            editorStatus={editorStatus}
                            deleteStoryBlockByID={deleteStoryBlockByID}
                            store={store}
                            orderArray={storyOrder}
                            setOrderArray={setStoryOrder}
                            reload={reload}
                            editMode={editMode}
                            commentMode={commentMode}
                        ></ DsStoryBlock>

                    ) :
                    (<div className="dsBlock"></div>)
                }

                {!loading ? (
                        dataStoryData['ds:DataStory']['ds:Story']['ds:Block'].map((item, index) => {
                            return (

                                <DsStoryBlock
                                    content={item}
                                    contentType={item._attributes.type}
                                    dataStoryData={dataStoryData}
                                    currentEditBlock={currentEditBlock}
                                    setCurrentEditBlock={setCurrentEditBlock}
                                    setDataStoryData={setDataStoryData}
                                    setEditorStatus={setEditorStatus}
                                    editorStatus={editorStatus}
                                    deleteStoryBlockByID={deleteStoryBlockByID}
                                    key={index}
                                    store={store}
                                    orderArray={storyOrder}
                                    setOrderArray={setStoryOrder}
                                    reload={reload}
                                    editMode={editMode}
                                    commentMode={commentMode}
                                ></ DsStoryBlock>

                            )
                        })
                    ) :
                    (<div className="dsBlock">Loading storyblocks</div>)
                }


            </div>


            <DsEditor
                uuid={store}
                currentEditBlock={currentEditBlock}
                setCurrentEditBlock={setCurrentEditBlock}
                dataStoryData={dataStoryData}
                setDataStoryData={setDataStoryData}
                setEditorStatus={setEditorStatus}
                editorStatus={editorStatus}
                showOpenDialog={showOpenDialog}
                setShowOpenDialog={setShowOpenDialog}
                editMode={editMode}
                setEditMode={setEditMode}
                commentMode={commentMode}
                setCommentMode={setCommentMode}
                reload={reload}
            />

        </>


    )
}

export default Story;
