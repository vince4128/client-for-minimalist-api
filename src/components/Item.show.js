import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItem } from '../actions/index.js';

class ItemShow extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.fetchItem(id);
    }

    render(){
        return(
            <div>
                <h1>Item Show</h1>
                {JSON.stringify(this.props.items)}
                <p><Link to={"/"}>Back</Link></p>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { items:state.items };
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemShow));

//export default ItemShow;