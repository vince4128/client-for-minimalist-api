import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../../actions/index.js';

class UserIndex extends Component {
    
    componentDidMount(){
        this.props.fetchUsers();
    }

    componentWillReceiveProps(nextProps, oldProps){
    }

    handleDelete(id){
        this.props.deleteUser(id, this.props.connected);        
    }

    renderUsers(){
           
        //avoid mutate
        const data = Object.assign({}, this.props.users);
        //iterate on data
        return Object.keys(data)
            .map(key => {
                // operate on the full value since `key` is just the key
                const renderData = data[key]; 
                return <li key={renderData._id}>
                    <Link to={`/user/${renderData._id}`}>ID : {renderData._id}</Link>
                    <p>Email : {renderData.email}</p>
                    {/*
                        this.props.connected ? 
                        (
                        <div>                            
                            <Link to={`/user/${renderData._id}/edit`}>Edit</Link>
                        </div>
                        ) 
                        : ""*/}
                    <hr/>
                </li>
            })
        
    }

    render(){
        return(
            <div>
                <h1>User Index</h1>
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state){
    return { users:state.users };
}

export default withRouter(connect(mapStateToProps, { fetchUsers, deleteUser })(UserIndex));

//export default UserIndex;