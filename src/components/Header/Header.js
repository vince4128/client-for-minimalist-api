import React from 'react';
import {Route, Link} from 'react-router-dom';

const Header = () => {
    return(
        <div>
            <h1>Header</h1>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/subitem"}>Subitem (optional)</Link></li>
            </ul>              
        </div>
    )
}

export default Header;