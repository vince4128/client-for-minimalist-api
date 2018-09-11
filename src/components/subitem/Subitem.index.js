import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubItems, deleteSubItem } from '../../actions/index.js';
import requireAuth from '../requireAuth';

class SubItemIndex extends Component {
    
    componentDidMount(){
        this.props.fetchSubItems();
    }

    componentWillReceiveProps(nextProps, oldProps){
    }

    handleDelete(id){
        this.props.deleteSubItem(id, this.props.connected);        
    }

    renderItems(){
           
        //avoid mutate
        const data = Object.assign({}, this.props.subitems);
        //iterate on data
        return Object.keys(data)
            .map(key => {
                // operate on the full value since `key` is just the key
                const renderData = data[key]; 
                return <li key={renderData._id}>
                    <Link to={`/subitem/${renderData._id}`}>ID : {renderData._id}</Link>
                    <p>Title : {renderData.title}</p>
                    <p>Text : {renderData.text}</p>
                    {
                        this.props.connected ? 
                        (
                        <div>
                            <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                            <Link to={`/subitem/${renderData._id}/edit`}>Edit</Link>
                        </div>
                        ) 
                        : ""}
                    <hr/>
                </li>
            })
        
    }

    render(){
        return(
            <div>
                <h1>SubItem Index</h1>
                <ul>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { subitems:state.subitems };
}

export default withRouter(connect(mapStateToProps, { fetchSubItems, deleteSubItem })(SubItemIndex));

//export default SubItemIndex;