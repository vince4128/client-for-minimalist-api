import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';

import Header from './Header';
import ItemIndex from './Item.index';
import ItemShow from './Item.show';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentItem: null,
        }

    }

    componentDidMount(){
        alert('did mount ! (app)');
        this.setState(this.state);
    }

    componentDidUpdate(){
        alert('did update (app)');
        //this.setState(this.state);
    }

    componentWillReceiveProps(nextProps, oldProps){
        //alert('will receive props! (app) ' + JSON.stringify(this.props.history.location.pathname));
    }

    render(){
        const prop = "coucou";
        return(
            <div>
                <Header/>                         
                <Route path="/" exact render={({ match }) => <ItemIndex match={match} {...this.props} />} />
                <Route path="/item/:id" render={({ match }) => <ItemShow match={match} {...this.props} />} />
            </div>
        )
    }
    
}

export default App;