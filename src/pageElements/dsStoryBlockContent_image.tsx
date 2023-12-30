import React, { ReactElement} from 'react';
import imagePlaceholder from '../assets/img/image-placeholder.png';

import ReactDom from 'react-dom'




function StoryBlockImage( {title, href}: {title: string, href: string} ): ReactElement {




    return (

      <div className="" style={{width:'100%'}}>
        <figure 
        style={{width:'100%', margin: '0 0 0 0', textAlign: "center"}}
        >
          <img 
          src={href}
          alt={title} 
          style={{maxWidth: '100%', height:'auto', margin: '0 0 0 0'}}
          />
        </figure>
          <caption style={{width:'100%', fontSize: '.85rem'}}>{title}</caption>

      </div>

    )
}





export default StoryBlockImage;
