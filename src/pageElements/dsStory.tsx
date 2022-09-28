import React from 'react';
import {useState, useEffect} from "react";
import DsStoryBlock from "./dsStoryBlock";
import DsEditor from "./dsEditor";

import axios from 'axios';
const DOMParse = new DOMParser();


function Story() {

  const [storyHeader, setStoryHeader] = useState(Object);
  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  const [loading, setLoading] = useState(true);

async function fetch_data() {
    axios
        .get(
            'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
        )
        .then(response => {
            const xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');


            // content blocks
            const allBlocksHTML = xmlDoc.getElementsByTagName('ds:Block');
            const allBlocks = [].slice.call(allBlocksHTML);

            setStoryHeader(xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0]);
            setStoryBlocksData(allBlocks);
            setLoading(false);

        })
        .catch(err => console.log(err));
}

    useEffect(() => {
    fetch_data()
     }, [loading]);


    return (
      <>

        <div className="dataStoryBlocks">

        <DsStoryBlock
          blockId="h"
          contentType="header"
          contentMime="h"
          contentFromXml={storyHeader}
          ></ DsStoryBlock>

        {!loading ? (
          storyBlocksData.map((item, index) => {
              return (

                <DsStoryBlock
                    key={index}
                  blockId={item.getAttribute('xml:id')}
                  contentType={item.getAttribute('type')}
                  contentMime={item.getAttribute('mime')}
                  contentFromXml={item}
                  ></ DsStoryBlock>

              )
            })
        ):
          (<div className="">Loading...</div>)
         }
        </div>
        
        <DsEditor />
        </>




    )
}

export default Story;
