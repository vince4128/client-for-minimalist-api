import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editItem, fetchItem, fetchCategories, fetchImages } from '../../actions';
import requireAuth from '../requireAuth';

class ItemEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedItem: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedItem:id});
        this.props.fetchItem(id);
        this.props.fetchCategories();
        this.props.fetchImages();
    }

    renderField(field) { // param field contain some event handlers to wire up to the .jsx that we're returning
        const { meta: {touched, error} } = field; // destructuring to access properties on nested objects for refactor
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    defaultValue={field.defaultValue}
                    //placeholder={field.placeholder}                    
                    //value={this.props.items[this.state.selectedItem].title}
                    {...field.input}
                />
                {/*JSON.stringify(field)*/}
                {touched ? error : ''}
            </div>
        );
    }

    renderSelectField(field){        
        const { meta: {touched, error} } = field;
        const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

        return(           
            <div className={className}>
                <label>{field.label}</label>
                <select
                    className="form-control"
                    type="select"
                    {...field.input}>                    
                    {/*<option value="valeur1">Valeur 1</option> 
                    <option value="valeur2" selected>Valeur 2</option>
        <option value="valeur3">Valeur 3</option>*/}
                    {field.children}
                </select>
                {touched ? error : ''}
            </div>
        )
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
        this.props.editItem(this.state.selectedItem, values, this.props.connected ,() => {
            this.props.history.push('/');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Edit Item</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    placeholder="Type your title"
                    defaultValue ="blablalba"            
                    component={this.renderField}                    
                />

                <Field
                    label="Description"
                    name="description"
                    placeholder="placeholder"
                    placeholder="Type your title"                                        
                    component={this.renderField}
                />

                <Field
                    label="Short Description"
                    name="shortdescription"
                    placeholder="placeholder"
                    placeholder="Type your title"                                        
                    component={this.renderField}
                />

                <Field
                    label="Image"
                    name="image"
                    component={this.renderSelectField}>
                    {this.renderImages()}
                </Field>

                <Field
                    label="Category"
                    name="category"
                    component={this.renderSelectField}>
                    {this.renderCategories()}
                </Field>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
                {/*JSON.stringify(this.props)*/}
                {/*JSON.stringify(this.props.items[this.state.selectedItem])*/}

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
    return { items:state.items, categories:state.categories, images:state.images };
}

export default reduxForm({
    validate:validate,
    initialValues:{ field1: 'value1', field2: 'value2' }, 
    form:'EditItemForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { editItem, fetchItem, fetchCategories, fetchImages })(ItemEdit)))
);