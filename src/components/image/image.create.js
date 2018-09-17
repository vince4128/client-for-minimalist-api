import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createImage } from '../../actions';
import requireAuth from '../requireAuth';
import axios from 'axios';

class ImageCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            uploadStatus: false
        }
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

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

    /*renderField(field) {
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {touched ? error : ''}
            </div>
        );
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values, event){
        this.props.createImage(values, this.props.connected, () => {
            this.props.history.push('/image');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Create Image</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
                
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />       

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/image" className="btn btn-danger">Cancel</Link>

        </form>

        </div>

        )
    
    }
    
}

function validate(values){

    const errors = {};

    if(!values.title){
        errors.title = "Enter a title !";
    }

    if(!values.text){
        errors.description = "Enter a text !";
    }

    return errors;

}

export default reduxForm({
    validate:validate,
    form:'CreateImageForm'
})(
    withRouter(requireAuth(connect(null, { createImage })(ImageCreate)))
);
*/

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleUploadImage}>
                    <div className="form-group">
                        <input className="form-controm" ref={(ref) => {this.uploadInput = ref;}} type="file"/>
                    </div>

                    <div className="form-group">
                        <input className="form-control" ref={(ref) => {this.fileName = ref;}} type="text" placeholder="Optionnale name for the file"/>
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

export default withRouter(connect(mapStateToProps, {createImage})(ImageCreate))