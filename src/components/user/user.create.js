import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../Field/RenderField';

class UserCreate extends Component {

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){
        this.props.createUser(values, this.props.connected, () => {
            this.props.history.push('/user');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Create User</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    component={RenderField}
                />

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/user" className="btn btn-danger">Cancel</Link>

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

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

export default reduxForm({
    validate:validate,
    form:'createUserForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { createUser })(UserCreate)))
);

//export default UserCreate;