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
            optionalName: "",
            errors:{
                imageFile:"",
                title:""
            },
            uploadStatus: false
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleOnDrop = (newImageFile, rejectedFile) => {
        this.setState({imageFile: newImageFile});        
    };

    onInputChange = (optionalName) => {
        this.setState({optionalName});
        this.checkError();
    }

    checkError = () => {
        this.state.imageFile.length < 1 ? this.setError("file", true) : this.setError("file", false);
        this.state.optionalName === "" ? this.setError("title", true) : this.setError("title", false);

        if(this.state.imageFile.length < 1 || this.state.optionalName === ""){
            return true;
        }else{
            return false;
        }
    }

    setError = (err, status) => {
        if(err === "file"){
            if(status){
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        imageFile: "pas de fichier"
                    }
                }))
            }else{
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        imageFile: ""
                    }
                }))
            }       
        }else if(err === "title"){
            if(status){
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        title: "pas de titre"
                    }
                }))
            }else{
                this.setState(prevState => ({
                    errors: {
                        ...prevState.errors,
                        title: ""
                    }
                }))
            }            
        }
    }

    handleUploadImage = (ev) => {
        ev.preventDefault();

        if(this.checkError()){

            alert('il y a des erreurs !');

        }else{

            alert('handleUploadImage !');

            const data = new FormData();
            data.append('filename', this.state.optionalName);
            data.append('file', this.state.imageFile[0]);   

            alert('la requete va etre passee !');

            axios.post('http://localhost:3000/upload', data, {
                headers: {authorization: this.props.connected}
            })
                .then((r)=>{
                    //this.setState({ imageURL: `http://localhost:3000/${r.body.file}`, uploadStatus: true });
                    //lancer action
                    //alert('callback');
                    //console.log('callback post image', r.data);
                }).catch((err)=>{
                    console.log(err);
                })

        }

    }

    render(){
        return(
            <div className="container">
            {JSON.stringify(this.state)}
                <form onSubmit={this.handleUploadImage}>

                    <div className="form-group">
                        <lable>nom du fichier</lable>
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Optional name for the file" 
                            value={this.state.optionalName}
                            onChange={event => this.onInputChange(event.target.value)}
                            />                        
                        {this.state.errors.title?this.state.errors.title:""}                        
                    </div>

                    <div className="form-group">
                    <Field
                        name="uploadInput"
                        component={DropZoneField}
                        type="file"
                        imageFile={this.state.imageFile}
                        handleOnDrop={this.handleOnDrop}                    
                    />
                    {this.state.errors.imageFile?this.state.errors.imageFile:""}
                    </div>

                    <button className="btn btn-success">Upload</button>

                </form>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {auth:state.auth, categories:state.categories, images:state.images}
}

export default reduxForm({
    form:'CreateImageForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, {createImage})(ImageCreate)))
);


//export default withRouter(connect(mapStateToProps, {createImage})(ImageCreate))