import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllItems } from '../actions/index.js';

class ItemIndex extends Component {
    
    componentDidMount(){
        this.props.fetchAllItems();
    }

    componentWillReceiveProps(nextProps, oldProps){
        //alert('will receive props! (item index)');
    }

    renderItems(){
        return this.props.items.map(i=>{
                return(
                <li key={i._id}>
                    <Link to={`/item/${i._id}`}>ID : {i._id}</Link>
                    <p>Subitem : {i.subitem}</p>
                    <p>Title : {i.title}</p>
                    <p>Description : {i.description}</p>
                    {/*<p>Shortdescription : {i.shortdescription}</p>*/}
                    <p>Date : {i.date}</p>
                    <hr/>
                </li>                
            )
        });
    }

    render(){
        return(
            <div>
                <h1>Item Index</h1>
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { items:state.items };
}

export default withRouter(connect(mapStateToProps, { fetchAllItems })(ItemIndex));