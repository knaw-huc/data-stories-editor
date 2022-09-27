import React from 'react';
import {useState} from "react";
import DsStoryBlock from "./dsStoryBlock";

import axios from 'axios';
const DOMParse = new DOMParser();

//let allBlocks = ['itempje1', 'itempje2'];



interface StoryBlockData {
  [index: number]: Object;
}
//
// interface StoryAuthor {
//   [index: number]: string;
// }

interface StoryData {
  // title: string;
  // authors: StoryAuthor;
  // copyright: string;
  //storyBlocks: Object;
  storyXml: StoryBlockData;
}

function Story() {

  const [storyBlocksData, setStoryBlocksData] = useState(Object);
  const [storyTitle, setStoryTitle] = useState(String);
  const [storyAuthors, setStoryAuthors] = useState([]);
  const [storyCopyright, setCopyright] = useState(String);
  const [loading, setLoading] = useState(true);
  //let allBlocksHTML = [];





  axios
    .get(
      'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
    )
    .then(response => {
      const xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');


      const allBlocksHTML = xmlDoc.getElementsByTagName('ds:Block');
      const allBlocks = [].slice.call(allBlocksHTML);


      setStoryBlocksData(allBlocks);
      //setStoryTitle();
      //setStoryAuthors();
      //setCopyright();
      setLoading(false);





    })
    .catch(err => console.log(err));


    return (

        <div className="dataStoryBlocks">
        {!loading ? (
          storyBlocksData.map((item, index) => {
              return (

                <DsStoryBlock
                  blockId={item.getAttribute('xml:id')}
                  contentType={item.getAttribute('type')}
                  contentMime={item.getAttribute('mime')}
                  contentFromXml={item.innerHTML}
                  ></ DsStoryBlock>

              )
            })
        ):
          (<div className="">Loading...</div>)
         }
        </div>




    )
}

export default Story;




// <div className="hcFacetItems">
//     {!loading ? (<div>
//         {facetValues.map((item, index) => {
//             if (item.amount > 0) {
//                 return (<div key={index} className="hcFacetItem" onClick={() => props.add({
//                     facet: "Page dimensions",
//                     field: "page_dimensions",
//                     candidate: item.facetValue
//                 })}>
//                     <div className="checkBoxLabel"> {item.facetValue}
//                         <div className="facetAmount"> ({item.amount})</div>
//                     </div>
//                 </div>);
//             }
//         })}
//     </div>) : (<div>Loading...</div>)}
//     <div>
//     </div>
// </div>


// {!loading ? (
//   allBlocks.map((item, index) => {
//       return (
//
//         <DsStoryBlock
//           blockId={item.getAttribute('xml:id')}
//           contentType={item.getAttribute('type')}
//           contentMime={item.getAttribute('mime')}
//           contentFromXml={item.innerHTML}
//           ></ DsStoryBlock>
//
//       )
//     })
// ):
//   (<div className="">Loading...</div>)
// }
