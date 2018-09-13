import React, { Component } from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubItem } from '../../actions/index.js';

class SubitemShow extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedSubitem: null,
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({selectedSubitem:id});
        this.props.fetchSubItem(id);
    }

    renderImage(image){
        if(image){
            return image.title;
        }
        
        return image
            ? image.title
            : <span>Loading</span>

    }

    renderSubitem(){
        
        //avoid mutate
        const data = Object.assign({}, this.props.subitems);

        // on recupere l'objet
        let Subitem = {};
        data[this.state.selectedSubitem] ? Subitem = data[this.state.selectedSubitem] : Subitem = {err:'sous objet inexistant'};

            return (
                <div>
                    <p>Id : {Subitem._id}</p>
                    <p>Title : {Subitem.title}</p>
                    <p>text : {Subitem.text}</p>
                    <p>Image : {this.renderImage(Subitem.image)}</p>
                    <Link to={'/subitem'}>Back</Link>
                    {
                        this.props.connected ?
                        (
                            <Link to={`/subitem/${Subitem._id}/edit`}>Edit</Link>
                        )
                        : ""                      
                    }
                </div>
            );            
            
    }

    render(){
        return(
            <div>
                <h1>Subitem Show</h1>
                {this.renderSubitem()}                
            </div>
        )
    }

}

function mapStateToProps(state){
    return { subitems:state.subitems };
}

//export default SubitemShow;
export default withRouter(connect(mapStateToProps, { fetchSubItem })(SubitemShow));