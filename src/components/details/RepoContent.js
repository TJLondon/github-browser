import React, {Component} from 'react';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readme: null
        }
    }

    componentWillMount() {
        fetch(`https://api.github.com/repos/${this.props.item.owner.login}/${this.props.item.name}/readme`, {
            headers: {'Accept': 'application/vnd.github.html'}
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.text().then(data => this.setState({readme: data}))
                }
            })
    }

    render() {
        return (
            <div key={this.props.item.id}>
                <div className="head-container">
                    <h1>{this.props.item.name}</h1>
                </div>

                <div className="userpane">
                    <img src={this.props.item.owner.avatar_url} alt={this.props.item.owner.login} className="avatar"/>
                    <p><a target="_blank" href={this.props.item.owner.html_url}> {this.props.item.owner.login} </a></p>
                </div>

                <div className="content">
                    <p>{this.props.item.description}</p>

                    <p>
                        Watchers: {this.props.item.watchers_count}
                    </p>

                    {this.props.item.homepage ?
                        <p>Homepage: <a target="_blank" href={this.props.item.homepage}>{this.props.item.homepage}</a></p> : null}


                    <div className="readme">
                        <div dangerouslySetInnerHTML={{__html: this.state.readme}} />
                    </div>

                </div>
            </div>
        )
    }
};

export default Details;