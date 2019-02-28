import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import RepoItem from './RepoItem';
import SearchBar from '../layout/SearchBar';
import Loading from '../layout/Loading';
import Error from '../layout/Error';

class RepoList extends Component {
    render() {


        if (this.props.GithubStore.error) {
            return (
                <div>
                    <SearchBar />
                    <Error />
                </div>
            )
        }

        return (
            <div>
                <SearchBar />

                {this.props.GithubStore.loading ? <Loading /> : null}

                {!this.props.GithubStore.loading && this.props.GithubStore.GithubData.length === 0 ? <p className="home-message">Search for a GIT user</p> : null}

                {!this.props.GithubStore.loading ?
                    <div className="repo_list">
                        {this.props.GithubStore.GithubData
                            .filter((item) => item.fork === false)
                            .sort((obj1, obj2) => obj2.stargazers_count - obj1.stargazers_count)
                            .map(item => RepoItem(item))}
                    </div> : null}

            </div>
        )
    }
}

export default inject("GithubStore")(observer(RepoList));