import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchImage } from '../../actions/index.js';

class ImageShow extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedImage: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedImage:id});
        this.props.fetchImage(id);
    }

    renderImage(){
        
        //avoid mutate
        const data = Object.assign({}, this.props.Images);

        // on recupere l'objet
        let Image = {};
        data[this.state.selectedImage] ? Image = data[this.state.selectedImage] : Image = {err:'sous objet inexistant'};

            return (
                <div>
                    <p>Id : {Image._id}</p>
                    <p>Title : {Image.title}</p>
                    <p>text : {Image.text}</p>
                    <Link to={'/image'}>Back</Link>
                    {
                        this.props.connected ?
                        (
                    <Link to={`/image/${Image._id}/edit`}>Edit</Link>
                    )
                        : ""                      
                    }
                </div>
            );            
            
    }

    render(){
        return(
            <div>
                <h1>Image Show</h1>
                {this.renderImage()}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { Images:state.images };
}

//export default ImageShow;
export default withRouter(connect(mapStateToProps, { fetchImage })(ImageShow));