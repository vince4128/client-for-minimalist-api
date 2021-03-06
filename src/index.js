import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Root from './Root';
import App from './components/App';

ReactDOM.render(
    <Root>
        <BrowserRouter>        
            <Route path="/" render={({ match }) => <App match={match} {...this.props} />}/>
        </BrowserRouter>
    </Root>
    , document.querySelector('#root')
);