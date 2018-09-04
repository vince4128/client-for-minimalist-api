import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import Header from './Header';
import ItemIndex from './Item.index';

const App = () => {

    return(
        <div>
            <Header/>
            <Route path="/" exact component={ItemIndex} />
        </div>
    )
}

export default App;