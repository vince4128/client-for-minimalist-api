import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header/Header';
import HeaderItem from './Header/Header.item';
import HeaderSubitem from './Header/Header.subitem';
import HeaderImage from './Header/Header.image';
import HeaderCategory from './Header/Header.category';

import ItemIndex from './item/Item.index';
import ItemShow from './item/Item.show';
import ItemCreate from './item/Item.create';
import ItemEdit from './item/Item.edit';

import SubitemIndex from './subitem/Subitem.index';
import SubitemShow from './subitem/Subitem.show';
import SubitemCreate from './subitem/Subitem.create';
import SubitemEdit from './subitem/Subitem.edit';

import ImageIndex from './image/image.index';
import ImageShow from './image/image.show';
import ImageCreate from './image/image.create';
import ImageEdit from './image/image.edit';

import CategoryIndex from './category/category.index';
import CategoryShow from './category/category.show';
import CategoryCreate from './category/category.create';
import CategoryEdit from './category/category.edit';

import UserIndex from './user/user.index';
import UserShow from './user/user.show';
/*import UserCreate from './user/user.create';
import UserEdit from './user/user.edit';*/

import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';

class App extends Component {

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    componentWillReceiveProps(nextProps, oldProps){

    }

    render(){
        return(
            <div>
                <h1>Hello {this.props._id}</h1>
                <Header/>
                {/*SIGN PATH*/}                
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signout" exact component={Signout} />
                {/*ITEM PATH*/}
                <Route path="/" exact component={HeaderItem} />                         
                <Route path="/" exact render={()=><ItemIndex connected={this.props.authenticated}/>} />
                <Switch>
                    <Route path="/item/:id/edit" render={()=><ItemEdit connected={this.props.authenticated}/>} />
                    <Route path="/item/new" render={()=><ItemCreate connected={this.props.authenticated}/>} />
                    <Route path="/item/:id" render={()=><ItemShow connected={this.props.authenticated}/>} />                    
                </Switch>                
                {/*SUBITEM PATH*/}                
                <Route path="/subitem" exact component={HeaderSubitem} />
                <Route path="/subitem" exact render={()=><SubitemIndex connected={this.props.authenticated} />} />
                <Switch>
                    <Route path="/subitem/:id/edit" render={()=><SubitemEdit connected={this.props.authenticated}/>} />
                    <Route path="/subitem/new" render={()=><SubitemCreate connected={this.props.authenticated}/>} />
                    <Route path="/subitem/:id" render={()=><SubitemShow connected={this.props.authenticated}/> } />
                </Switch>
                {/*IMAGE PATH*/}
                <Route path="/image" exact component={HeaderImage} />                         
                <Route path="/image" exact render={()=><ImageIndex connected={this.props.authenticated}/>} />
                <Switch>
                    <Route path="/image/:id/edit" render={()=><ImageEdit connected={this.props.authenticated}/>} />
                    <Route path="/image/new" render={()=><ImageCreate connected={this.props.authenticated}/>} />
                    <Route path="/image/:id" render={()=><ImageShow connected={this.props.authenticated}/>} />
                </Switch>
                {/*CATEGORY PATH*/}
                <Route path="/category" exact component={HeaderCategory} />                         
                <Route path="/category" exact render={()=><CategoryIndex connected={this.props.authenticated}/>} />
                <Switch>
                    <Route path="/category/:id/edit" render={()=><CategoryEdit connected={this.props.authenticated}/>} />
                    <Route path="/category/new" render={()=><CategoryCreate connected={this.props.authenticated}/>} />
                    <Route path="/category/:id" render={()=><CategoryShow connected={this.props.authenticated}/>} />
                </Switch>
                {/*USER PATH*/}
                {/*<Route path="/category" exact component={HeaderCategory} />*/}                         
                <Route path="/user" exact render={()=><UserIndex connected={this.props.authenticated}/>} />
                <Switch>
                    {/*<Route path="/category/:id/edit" render={()=><CategoryEdit connected={this.props.authenticated}/>} />
                    <Route path="/category/new" render={()=><CategoryCreate connected={this.props.authenticated}/>} />*/}
                    <Route path="/user/:id" render={()=><UserShow connected={this.props.authenticated}/>} />
                </Switch>                                
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated, _id:state.auth._id };
}

export default connect(mapStateToProps)(App);