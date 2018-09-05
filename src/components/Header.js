import React from 'react';
import {Route, Link} from 'react-router-dom';

const Header = () => {
    return(
        <div>
            <h1>Header</h1>
            <p><Link to={"/"}>Back</Link></p>
            <p><Link to={'/item/create/new'}>New</Link></p>            
        </div>
    )
}

export default Header;