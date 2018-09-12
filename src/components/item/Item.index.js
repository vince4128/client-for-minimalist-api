import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllItems, deleteItem } from '../../actions/index.js';

class ItemIndex extends Component {
    
    componentDidMount(){
        this.props.fetchAllItems();
    }

    componentWillReceiveProps(nextProps, oldProps){
    }

    handleDelete(id){
        this.props.deleteItem(id,this.props.connected);        
    }

    renderItems(){    
        //avoid mutate
        const data = Object.assign({}, this.props.items);
        //iterate on data
        return Object.keys(data)
            .map(key => {
                // operate on the full value since `key` is just the key
                const renderData = data[key]; 
                return <li key={renderData._id}>
                    <Link to={`/item/${renderData._id}`}>ID : {renderData._id}</Link>
                    <p>Subitem : {renderData.subitem.length}</p>
                    <p>Title : {renderData.title}</p>
                    <p>Image : {renderData.image.title}</p>
                    <p>Category : {renderData.category.title}</p>
                    <p>Description : {renderData.description}</p>
                    <p>Date : {renderData.date}</p>
                    <p>Author : {renderData.author.email}</p>
                    {
                        this.props.connected ? 
                        (
                        <div>
                            <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                            <Link to={`/item/${renderData._id}/edit`}>Edit</Link>
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

export default withRouter(connect(mapStateToProps, { fetchAllItems, deleteItem })(ItemIndex));