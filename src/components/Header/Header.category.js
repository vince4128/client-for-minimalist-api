import React from 'react';
import {Route, Link} from 'react-router-dom';

const HeaderCategory = () => {
    return(
        <div>
            <ul>
                <li><Link to={'/category/new'}>New Category</Link></li>
            </ul>              
        </div>
    )
}

export default HeaderCategory;