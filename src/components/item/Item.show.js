import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import SubitemCreate from '../subitem/Subitem.create';
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
                    <p>Title : {Item.title}</p>
                    <p>Description : {Item.description}</p>
                    <p>ShortDescription : {Item.shortDescription}</p>
                    <p>Category : {this.renderCat(Item.category)}</p>
                    <p>Subitem : </p>
                    <ul>
                        <li>{this.renderSubitem(Item.subitem)}</li>
                        <li>                        
                            <hr/>
                                <button type="button">ajouter un subitem</button>
                            <hr/>
                            <SubitemCreate connected={this.props.connected} idParent={Item._id}/>
                        </li>
                    </ul>                
                    <p>Image : {this.renderImage(Item.image)}</p>                    
                    <p>Date : {Item.date}</p>
                    {
                        this.props.connected ?
                        (
                            <Link to={`/item/${Item._id}/edit`}>Edit</Link>
                        )
                        : ""                      
                    }
                    <Link to={'/'}>Back</Link>                     
                </div>
            );         

    }

    renderSubitem(subItem){

        return subItem
            ? subItem.map((sub)=>{
                return( 
                <li key={sub._id}>
                    <p>id : {sub._id}</p>
                    <p>title : {sub.title}</p>
                <p>text : {sub.text}</p>
                </li>
                )
            })
            : <span>Loading</span>

    }

    renderImage(image){
        if(image){
            return image
            ? image.title
            : <span>Loading</span>
        }
    }

    renderCat(cat){
        if(cat){
            return cat
            ? cat.title
            : <span>Loading</span>
        }
    }

    render(){
        return(
            <div>
                <h1>Item Show</h1>
                {this.renderItem()}
                <hr/>
                {/*this.renderSubItem()*/}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { items:state.items };
}

export default withRouter(connect(mapStateToProps, { fetchItem })(ItemShow));