import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchImages, deleteImage } from '../../actions/index.js';

class ImageIndex extends Component {
    
    componentDidMount(){
        this.props.fetchImages();
    }

    componentWillReceiveProps(nextProps, oldProps){
    }

    handleDelete(id){
        this.props.deleteImage(id, this.props.connected);        
    }

    renderImages(){
           
        //avoid mutate
        const data = Object.assign({}, this.props.images);
        //iterate on data
        return Object.keys(data)
            .map(key => {
                // operate on the full value since `key` is just the key
                const renderData = data[key]; 
                return <li key={renderData._id}>
                    <Link to={`/image/${renderData._id}`}>ID : {renderData._id}</Link>
                    <p>Title : {renderData.title}</p>
                    {
                        this.props.connected ? 
                        (
                        <div>
                            <button onClick={()=>{this.handleDelete(renderData._id)}}>Delete</button>
                            <Link to={`/image/${renderData._id}/edit`}>Edit</Link>
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
                <h1>Image Index</h1>
                <ul>
                    {this.renderImages()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { images:state.images };
}

export default withRouter(connect(mapStateToProps, { fetchImages, deleteImage })(ImageIndex));

//export default ImageIndex;