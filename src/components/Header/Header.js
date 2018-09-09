import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

    renderLinks(){
        if(this.props.authenticated) {
            return(
                <div>
                    <li><Link to={"/signout"}>Sign out</Link></li>
                    <li><Link to={"/subitem"}>Subitem (optional)</Link></li>
                    <li><Link to={"/image"}>Image (optional)</Link></li>
                    <li><Link to={"/category"}>Categories (optional)</Link></li>
                </div>
            )
        } else {
            return(
                <div>
                    <li><Link to={"/signin"}>Sign in</Link></li>
                    <li><Link to={"/signup"}>Sign up</Link></li>
                </div>
            );
        }
    }
    
    render(){
        return(
            <div>
                <h1>Header</h1>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    { this.renderLinks() }
                </ul>              
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);