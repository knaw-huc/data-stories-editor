import React, { ReactElement} from 'react';
import imagePlaceholder from '../assets/img/image-placeholder.png';

import ReactDom from 'react-dom'
import Iframe from "react-iframe";




function StoryBlockFrame( {title, href}: {title: string, href: string} ): ReactElement {

const hasTitle = title.trim() !== "";


    return (

        <div>
            {hasTitle && (<h2>{title}</h2>)}
            <Iframe url={href} width="100%" height="500"/>
        </div>

    )
}





export default StoryBlockFrame;
