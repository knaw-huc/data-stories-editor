import React, { ReactElement} from 'react';
import {useState} from "react";


function StoryBlockHeader( {contentHeader }: {contentHeader: Object} ): ReactElement {

  let storyTitle, storyAuthors, storyLicense;

  storyTitle = contentHeader['dct:title'][0]._text;
  storyAuthors = contentHeader['dct:creator'];
  storyLicense = contentHeader['dct:license'][0]._text;


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
