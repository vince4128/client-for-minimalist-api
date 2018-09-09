import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editItem, fetchItem } from '../../actions';
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

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){
        this.props.editItem(this.state.selectedItem, values, () => {
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

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

function mapStateToProps(state){
    return { items:state.items };
}

export default reduxForm({
    validate:validate,
    initialValues:{ field1: 'value1', field2: 'value2' }, 
    form:'EditItemForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(mapStateToProps, { editItem, fetchItem })(ItemEdit)))
);