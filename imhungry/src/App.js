import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

import Search from "./component/Search";
import Result from "./component/Result";
import Restaurant from "./component/Restaurant";
import Recipe from "./component/Recipe";
import Favorite from "./component/Favorite";
import NoShow from "./component/NoShow";
import Explore from "./component/Explore";
import SignIn from "./component/SignIn"
import Register from "./component/Register"
import Grocery from "./component/Grocery";
import SavedSearch from "./component/SavedSearch"

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={SignIn} exact />
                    <Route path="/Search" component={Search} />
                    <Route path="/Result" component={Result} />
                    <Route path="/Restaurant" component={Restaurant} />
                    <Route path="/Recipe" component={Recipe} />
                    <Route path="/Favorite" component={Favorite} />
                    <Route path="/NoShow" component={NoShow} />
                    <Route path="/Explore" component={Explore} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/Register" component={Register} />
                    <Route path="/Grocery" component={Grocery} />
                    <Route path="/SavedSearch" component={SavedSearch} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
