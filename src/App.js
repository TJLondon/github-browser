import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/layout/Header';
import RepoList from './components/list/RepoList';
import RepoDetails from './components/details/RepoDetails';
import './sass/main.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <div className="content-wrapper">
                        <Route exact path="/" component={RepoList} />
                        <Route path="/:id" component={RepoDetails} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default inject("GithubStore")(observer(App));