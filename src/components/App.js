import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';

import Header from './Header/Header';
import HeaderItem from './Header/Header.item';
import HeaderSubitem from './Header/Header.subitem';

import ItemIndex from './item/Item.index';
import ItemShow from './item/Item.show';
import ItemCreate from './item/Item.create';
import ItemEdit from './item/Item.edit';

import SubitemIndex from './subitem/Subitem.index';
import SubitemShow from './subitem/Subitem.show';
import SubitemCreate from './subitem/Subitem.create';
import SubitemEdit from './subitem/Subitem.edit';

/*import ImageIndex from './image/image.index';
import ImageShow from './image/image.show';
import ImageCreate from './image/image.create';

import CategoryIndex from './category/category.index';
import CategoryShow from './category/category.show';
import CategoryCreate from './category/category.create';*/

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
                <Header/>                
                {/*ITEM PATH*/}
                <Route path="/" exact render={({ match }) => <HeaderItem match={match} {...this.props} />} />                         
                <Route path="/" exact render={({ match }) => <ItemIndex match={match} {...this.props} />} />
                <Switch>
                    <Route path="/item/:id/edit" render={({ match }) => <ItemEdit match={match} {...this.props} />} />
                    <Route path="/item/new" render={({ match }) => <ItemCreate match={match} {...this.props} />} />
                    <Route path="/item/:id" render={({ match }) => <ItemShow match={match} {...this.props} />} />                    
                </Switch>                
                {/*SUBITEM PATH*/}                
                <Route path="/subitem" exact render={({ match }) => <HeaderSubitem match={match} {...this.props} />} />
                <Route path="/subitem" exact render={({ match }) => <SubitemIndex match={match} {...this.props} />} />
                <Switch>
                    <Route path="/subitem/:id/edit" render={({ match }) => <SubitemEdit match={match} {...this.props} />} />
                    <Route path="/subitem/new" render={({ match }) => <SubitemCreate match={match} {...this.props} />} />
                    <Route path="/subitem/:id" render={({ match }) => <SubitemShow match={match} {...this.props} />} />
                </Switch>
                {/*IMAGE PATH*/}
                {/*<Route path="/" exact render={({ match }) => <ImageIndex match={match} {...this.props} />} />
                <Switch>
                    <Route path="/image/new" render={({ match }) => <ImageCreate match={match} {...this.props} />} />
                    <Route path="/image/:id" render={({ match }) => <ImageShow match={match} {...this.props} />} />
        </Switch>*/}
                {/*CATEGORY PATH*/}
                {/*<Route path="/category"></Route>
                <Switch>
                    <Route path="/category/new" render={({ match }) => <ItemCreate match={match} {...this.props} />} />
                    <Route path="/category/:id" render={({ match }) => <ItemShow match={match} {...this.props} />} />
    </Switch>   */}                               
            </div>
        )
    }
    
}

export default App;