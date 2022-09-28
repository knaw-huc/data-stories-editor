import React, { ReactElement} from 'react';

import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'




function StoryBlockMD( {contentHead,contentBody }: {contentHead: string, contentBody: string} ): ReactElement {

  const hasHead = contentHead === '';


    return (

      <div className="" >
      {!hasHead ? (
        <h2>{contentHead}</h2>
      ) : (
        <div></div>
      ) }
      <ReactMarkdown>{contentBody}</ReactMarkdown>

      </div>

    )
}





export default StoryBlockMD;
//<ReactMarkdown>{contentBody}</ReactMarkdown>
