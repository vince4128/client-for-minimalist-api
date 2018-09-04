import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import ItemIndex from './Item.index';

const App = () => {



    return(
        <div>App
            <Route path="/" exact component={ItemIndex} />
        </div>
    )
}

export default App;