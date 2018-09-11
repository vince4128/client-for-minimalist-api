import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/index.js';

class UserShow extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedUser: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedUser:id});
        this.props.fetchUser(id);
    }

    renderUser(){
        
        //avoid mutate
        const data = Object.assign({}, this.props.users);

        // on recupere l'objet
        let User = {};
        data[this.state.selectedUser] ? User = data[this.state.selectedUser] : User = {err:'sous objet inexistant'};

            return (
                <div>
                    <p>Id : {User._id}</p>
                    <p>Title : {User.title}</p>
                    <p>text : {User.text}</p>
                    <Link to={'/user'}>Back</Link>
                    {
                        this.props.connected ?
                        (
                    <Link to={`/user/${User._id}/edit`}>Edit</Link>
                    )
                        : ""                      
                    }
                </div>
            );            
            
    }

    render(){
        return(
            <div>
                <h1>User Show</h1>
                {this.renderUser()}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { users:state.users };
}

//export default UserShow;
export default withRouter(connect(mapStateToProps, { fetchUser })(UserShow));