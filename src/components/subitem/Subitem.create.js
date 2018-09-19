import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSubitem, fetchImages } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../Field/RenderField';
import RenderSelectField from '../Field/RenderSelectField';

class SubitemCreate extends Component {

    componentDidMount(){
        this.props.fetchImages();
    }

    renderImages(){
        //avoid mutate
        const data = Object.assign({}, this.props.images);
        //options to return
        return Object.keys(data).map(
            (img)=>{
                return(
                    <option key={data[img]._id} value={data[img]._id}>
                    {data[img].title}</option>
                )
            }
        );
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){
        if(this.props.idParent){
            values.idParent = this.props.idParent;
        }        
        this.props.createSubitem(values, this.props.connected, () => {
            this.props.history.push('/subitem');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Create subitem</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    component={RenderField}
                />

                <Field
                    label="Text"
                    name="text"
                    component={RenderField}
                />

                <Field
                    label="Image"
                    name="image"
                    component={RenderSelectField}>
                    {this.renderImages()}
                </Field>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>

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

    if(!values.text){
        errors.description = "Enter a text !";
    }

    if(!values.image){
        errors.image = "Choose a image !";
    }


    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

function mapStateToProps(state){
    return {images:state.images}
}

export default reduxForm({
    validate:validate,
    form:'CreateSubitemForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { createSubitem, fetchImages })(SubitemCreate)))
);

//export default SubitemCreate;