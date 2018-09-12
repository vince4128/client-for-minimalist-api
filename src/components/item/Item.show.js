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
                    {JSON.stringify(Item)}
                    <p>Id : {Item._id}</p>
                    {/*<p>Subitem : {JSON.stringify(Item.subitem)}</p>*/}
                    <p>Subitem : </p>
                    <ul>
                        <li>{this.renderSubItem()}</li>
                    </ul>
                    <p>Title : {Item.title}</p>
                    <p>Image : {Item.image.title}</p>
                    {/*JSON.stringify(Item.image)*/}
                    {/*<p>Category : {Item.category.title}</p>*/}
                    <p>Description : {Item.description}</p>
                    <p>Date : {Item.date}</p>
                    {/*<p>Author : {Item.author.email}</p>*/}
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

    renderSubItem(){
        //avoid mutate
        if(this.props.items){

            const data = Object.assign({}, this.props.items[this.state.selectedItem]);

            if(data.subitem){
                const subitemData = data.subitem;
                //iterate on subitem
                return subitemData.map((subitem)=>{
                    return( 
                    <li key={subitem._id}>
                        <p>id : {subitem._id}</p>
                        <p>title : {subitem.title}</p>
                        <p>text : {subitem.text}</p>
                    </li>
                    )
                })
            }
            
        }else{
            return 'loading';
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