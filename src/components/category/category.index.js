import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../actions/index.js';

class CategoryIndex extends Component {
    
    componentDidMount(){
        this.props.fetchCategories();
    }

    componentWillReceiveProps(nextProps, oldProps){
    }

    handleDelete(id){
        this.props.deleteCategory(id);        
    }

    renderCategories(){
           
        //avoid mutate
        const data = Object.assign({}, this.props.categories);
        //iterate on data
        return Object.keys(data)
            .map(key => {
                // operate on the full value since `key` is just the key
                const renderData = data[key]; 
                return <li key={renderData._id}>
                    <Link to={`/category/${renderData._id}`}>ID : {renderData._id}</Link>
                    <p>Title : {renderData.title}</p>
                    <p>Description : {renderData.description}</p>
                    <p>Description : {renderData.shortDescription}</p>
                    <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                    <Link to={`/category/${renderData._id}/edit`}>Edit</Link>
                    <hr/>
                </li>
            })
        
    }

    render(){
        return(
            <div>
                <h1>Category Index</h1>
                <ul>
                    {this.renderCategories()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { categories:state.categories };
}

export default withRouter(connect(mapStateToProps, { fetchCategories, deleteCategory })(CategoryIndex));

//export default CategoryIndex;