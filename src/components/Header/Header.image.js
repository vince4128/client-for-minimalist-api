import React from 'react';
import {Route, Link} from 'react-router-dom';

const HeaderImage = () => {
    return(
        <div>
            <ul>
                <li><Link to={'/image/new'}>New Image</Link></li>
            </ul>              
        </div>
    )
}

export default HeaderImage;