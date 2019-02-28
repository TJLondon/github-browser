import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({user: e.target.value});
    };

    onSubmit = (e) => {
        if (this.state.user.length > 0) {
            this.props.GithubStore.reposByUser(this.state.user);
        }
        e.preventDefault();
    };

    render() {
        return (
            <div className="searchbar">
                <form onSubmit={this.onSubmit}>
                    <input type="text" id="username" placeholder="Search by git name" value={this.state.user} onChange={this.onChange} />
                    <div>
                        <input type="submit" id="submit" value="Search"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default inject("GithubStore")(observer(SearchBar));
