import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import Details from './RepoContent';

class RepoDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readme: null
        }
    }

    componentWillMount() {
        if (this.props.GithubStore.GithubData.length === 0) {
            this.props.GithubStore.repoById(parseInt(this.props.match.params.id));
        }
    }

    render() {
        return (
            <div className="details-wrapper">
                {this.props.GithubStore.GithubData
                    .filter((item) => item.id === parseInt(this.props.match.params.id))
                    .map(item => <Details key={item.id} item={item} />
                    )}
            </div>
        )
    }
}

export default inject("GithubStore")(observer(RepoDetails));