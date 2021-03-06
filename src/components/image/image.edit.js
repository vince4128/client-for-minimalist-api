import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editImage } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../Field/RenderField';

class ImageEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedImage: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedImage:id});        
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){        
        this.props.editImage(this.state.selectedImage, values,  this.props.connected, () => {
            this.props.history.push('/image');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Edit Image</h1>

            <hr/>

            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                
                <Field
                    label="Title"
                    name="title"
                    component={RenderField}
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

    // validate the inputs from 'values'
    if(!values.title){
        errors.title = "Enter a title !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

export default reduxForm({
    validate:validate,
    form:'EditImageForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editImage })(ImageEdit)))
);