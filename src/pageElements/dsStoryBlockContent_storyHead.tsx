import React, { ReactElement} from 'react';

// header
// let headerMD = '##yo \n _123123123_ \n [HSN Occupations](https://iisg.amsterdam/en/hsn/data/occupations)'
// let headerHTML = xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0];
// console.log(headerHTML)
// let headerHTML2 = xmlDoc.getElementsByTagName('ds:DataStory')[0].getElementsByTagName('ds:Metadata')[0]




function StoryBlockHeader( {contentHeader }: {contentHeader: Object} ): ReactElement {

  let storyTitle, storyAuthors, storyLicense;

  storyTitle = contentHeader['dct:title'][0]._text;
  storyAuthors = contentHeader['dct:creator'];
  storyLicense = contentHeader['dct:license'][0]._text;
  //console.log('storyAuthors', storyAuthors)


    return (

      <div className="" >
        <h1>{storyTitle}</h1>
        <div>
        Created by {storyAuthors.map((item, i, row) => {
            let comma = ', ';
            if (i + 1 === row.length) {
              comma = '';
            }
              return (
                <div className="inlineStoryItem" key={i}><em>{item._text}</em>{comma}</div>
              )
            })

         }
        <br/>
        <small>License: <a href={storyLicense}>{storyLicense}</a></small></div>
      </div>

    )
}


export default StoryBlockHeader;
//
