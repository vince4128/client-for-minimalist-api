import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import Header from './Header';
import ItemIndex from './item/Item.index';
import ItemShow from './item/Item.show';
import ItemCreate from './item/Item.create';

class App extends Component {

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    componentWillReceiveProps(nextProps, oldProps){

    }

    render(){
        return(
            <div>
                <Header/>                         
                <Route path="/" exact render={({ match }) => <ItemIndex match={match} {...this.props} />} />                
                <Route path="/item/:id" exact render={({ match }) => <ItemShow match={match} {...this.props} />} />
                <Route path="/item/create/new" exact render={({ match }) => <ItemCreate match={match} {...this.props} />} />
            </div>
        )
    }
    
}

export default App;