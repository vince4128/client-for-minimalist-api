import React from 'react';
import {Route, Link} from 'react-router-dom';

const HeaderItem = () => {
    return(
        <div>
            <ul>
                <li><Link to={'/item/new'}>New Item</Link></li>
            </ul>              
        </div>
    )
}

export default HeaderItem;