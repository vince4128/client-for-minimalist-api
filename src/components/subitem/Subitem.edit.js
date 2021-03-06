import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editSubitem } from '../../actions';
import requireAuth from '../requireAuth';
import RenderField from '../Field/RenderField';

class SubitemEdit extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedSubitem: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedSubitem:id});        
    }

    renderTagsField(field){
        return(
            <div className="form-group">

            </div>
        );
    }

    onSubmit(values){        
        this.props.editSubitem(this.state.selectedSubitem, values, this.props.connected, () => {
            this.props.history.push('/subitem');
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return(

            <div>

            <h1>Edit Subitem</h1>

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

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/subitem" className="btn btn-danger">Cancel</Link>

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
        errors.text = "Enter a text !";
    }

    //if errors is empty, the form is fine to submit
    //if errors as any property, redux form is invalid
    return errors;

}

export default reduxForm({
    validate:validate,
    form:'EditSubitemForm'   //name must be unique (in case of several form it's usefull), and could be whatever string we want. 
})(
    withRouter(requireAuth(connect(null, { editSubitem })(SubitemEdit)))
);