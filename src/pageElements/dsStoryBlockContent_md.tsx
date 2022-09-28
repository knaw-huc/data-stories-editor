import React, { ReactElement} from 'react';






function StoryBlockMD( {contentHead,contentBody }: {contentHead: string, contentBody: string} ): ReactElement {

    return (

      <div className="" >
      <h2>{contentHead}</h2>
      {contentBody}
      </div>

    )
}





export default StoryBlockMD;
