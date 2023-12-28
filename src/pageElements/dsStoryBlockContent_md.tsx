import React, { ReactElement} from 'react';
import ReactMarkdown from 'react-markdown';




function StoryBlockMD( {contentHead,contentBody }: {contentHead: string, contentBody: string} ): ReactElement {

  const hasHead = contentHead === '';


    return (

      <div className="" >
      {!hasHead ? (
        <h2>{contentHead}</h2>
      ) : (
        <div></div>
      ) }
      <ReactMarkdown children={contentBody}/>

      </div>

    )
}





export default StoryBlockMD;
//<ReactMarkdown>{contentBody}</ReactMarkdown>
