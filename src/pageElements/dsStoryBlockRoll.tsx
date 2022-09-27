import React from 'react';
import DsStoryBlock from "./dsStoryBlock";
import axios from 'axios';
//import XMLParser from 'react-xml-parser';
const DOMParse = new DOMParser();



let xmlDoc;
axios
  .get(
    'https://raw.githubusercontent.com/CLARIAH/data-stories/main/spec/WP4-Story.xml',
  )
  .then(response => {
    xmlDoc = DOMParse.parseFromString(response.data, 'text/xml');
    console.log(xmlDoc.getElementsByTagName('ds:Block'))


  })
  .catch(err => console.log(err));








function StoryBlocksRoll() {
    return (

        <div className="dataStoryBlocks">
          <DsStoryBlock contentType="h1">
          <h1>The 1918-19 flu epidemic in The Netherlands</h1>
          <p>By <em>Thomas de Groot</em> and <em>Wouter Beek</em> <br/>
          <small><a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA</a></small></p>
          </ DsStoryBlock>


        </div>

    )
}

export default StoryBlocksRoll;
