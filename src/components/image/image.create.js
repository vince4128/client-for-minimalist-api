import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createImage } from '../../actions';
import requireAuth from '../requireAuth';
import DropZoneField from '../Field/DropzoneField';
import axios from 'axios';
import Dropzone from 'react-dropzone';

class ImageCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageFile: [],
            uploadStatus: false
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleOnDrop = (newImageFile, rejectedFile) => {
        console.log("onDrop !!! : ", newImageFile);
        this.setState({imageFile: newImageFile});        
    };

    handleUploadImage(ev){

        alert('handleUploadImage !');

        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        alert('la requete va etre passee !');

        axios.post('http://localhost:3000/upload', data)
            .then((r)=>{
                this.setState({ imageURL: `http://localhost:3000/${r.body.file}`, uploadStatus: true });
            }).catch((err)=>{
                console.log(err);
            })

    }

    render(){
        return(
            <div className="container">
            {JSON.stringify(this.state)}
                <form onSubmit={this.handleUploadImage}>
                    <div className="form-group">
                        <input className="form-controm" ref={(ref) => {this.uploadInput = ref;}} type="file"/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => {this.fileName = ref;}} type="text" placeholder="Optionnale name for the file"/>
                    </div>

                    {/*<Field
                        ref={(ref) => {this.uploadInput = ref;}}
                        name="uploadInput"
                        component={DropZoneField}
                        type="file"
                        imageFile={this.state.imageFile}
                        handleOnDrop={this.handleOnDrop}                    
                    />*/}

                    <button className="btn btn-success">Upload</button>

                </form>
            </div>
        )
    }

}

function validate(values){

    const errors = {};

    // validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

function mapStateToProps(state){
    return {auth:state.auth, categories:state.categories, images:state.images}
}

export default reduxForm({
    validate:validate,
    form:'CreateImageForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(connect(mapStateToProps, {createImage})(ImageCreate))
);


//export default withRouter(connect(mapStateToProps, {createImage})(ImageCreate))