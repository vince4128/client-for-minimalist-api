import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItem } from '../../actions/index.js';

class ItemShow extends Component {

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

    renderItem(){
        //avoid mutate
        const data = Object.assign({}, this.props.items);

        // on recupere l'objet
        let Item = {};
        data[this.state.selectedItem] ? Item = data[this.state.selectedItem] : Item = {err:'objet inexistant'};

            return (
                <div>
                    <p>Id : {Item._id}</p>
                    <p>Subitem : {Item.subitem}</p>
                    <p>Title : {Item.title}</p>
                    <p>Description : {Item.description}</p>
                    <p>Date : {Item.date}</p>
                </div>
            );            

    }

    render(){
        return(
            <div>
                <h1>Item Show</h1>
                {this.renderItem()}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { items:state.items };
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemShow));