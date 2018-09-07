import React from 'react';
import {Route, Link} from 'react-router-dom';

const HeaderSubitem = () => {
    return(
        <div>
            <ul>
                <li><Link to={'/subitem/new'}>New Subitem</Link></li>
            </ul>              
        </div>
    )
}

export default HeaderSubitem;