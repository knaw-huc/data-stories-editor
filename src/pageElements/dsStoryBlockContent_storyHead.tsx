import React, { ReactElement, ReactNode } from 'react';

// header
// let headerMD = '##yo \n _123123123_ \n [HSN Occupations](https://iisg.amsterdam/en/hsn/data/occupations)'
// let headerHTML = xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0];
// console.log(headerHTML)
// let headerHTML2 = xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0]




function StoryBlockHeader( {contentBody }: {contentBody: HTMLElement} ): ReactElement {
  //console.log('header',contentBody.getElementsByTagName('dct:title')[0].textContent)

  //const headerH1 = contentBody.getElementsByTagName('dct:title')[0].textContent;



    return (

      <div className="" >
        <h1>Datastory title</h1>
        <p><a href="">Author</a><br/><a href="">license</a></p>
      </div>

    )
}





export default StoryBlockHeader;
