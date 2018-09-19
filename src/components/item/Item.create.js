import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createItem, fetchCategories, fetchImages} from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../Field/RenderField';
import RenderSelectField from '../Field/RenderSelectField';

class ItemCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            imageFile: []
        }
    }

    componentDidMount(){
        this.props.fetchCategories();
        this.props.fetchImages();
    }

    renderCategories(){
        //avoid mutate
        const data = Object.assign({}, this.props.categories);
        //options to return
        return Object.keys(data).map(            
            (cat)=>{
                return(
                    <option key={data[cat]._id} value={data[cat]._id}>{data[cat].title}</option>
                )
            }
        );    
    }

    renderImages(){
        //avoid mutate
        const data = Object.assign({}, this.props.images);
        //options to return
        return Object.keys(data).map(            
            (img)=>{
                return(
                    <option key={data[img]._id} value={data[img]._id}>{data[img].title}</option>
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
        values.author = this.props.auth._id;      
        this.props.createItem(values, this.props.connected, (newlyCreatedObjId) => {
            this.props.history.push(`/item/${newlyCreatedObjId}`);
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Create Item</h1>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    component={RenderField}
                />

                <Field
                    label="Description"
                    name="description"
                    component={RenderField}
                />

                <Field
                    label="Short Description"
                    name="shortdescription"
                    component={RenderField}
                />

                <Field
                    label="Image"
                    name="image"
                    component={RenderSelectField}>
                    {this.renderImages()}
                </Field>

                <Field
                    label="Category"
                    name="category"
                    component={RenderSelectField}>
                    {this.renderCategories()}
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

    if(!values.description){
        errors.description = "Enter a description !";
    }

    if(!values.shortdescription){
        errors.shortdescription = "Enter a shortdescription !";
    }

    if(!values.category){
        errors.category = "Choose a category !";
    }

    if(!values.image){
        errors.image = "Choose a image !";
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
    form:'CreateItemForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { createItem, fetchCategories, fetchImages })(ItemCreate)))
);