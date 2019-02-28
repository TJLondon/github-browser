import {
    action,
    observable,
    decorate
} from 'mobx'
import parse from 'parse-link-header';

class GithubStore {
    constructor() {
        this.GithubData = [];
        this.Memo = {};
        this.loading = false;
        this.error = false;
    }

    repoById = id => {
        this.loading = true;
        fetch('https://api.github.com/repositories/' + id)
            .then(response => response.json())
            .then(data => this.reposByUser(data.owner.login))
            .catch(e => this.error = e);
    };

    reposByUser = async user => {
        if (this.Memo[user]) { //check if we've already memoized the data
            this.GithubData = this.Memo[user];
            return
        }
        this.loading = true;
        this.GithubData = [];
        await this.getData('https://api.github.com/users/' + user + '/repos');
        this.Memo[user] = this.GithubData;
        this.loading = false;
    };

    //Overly fancy, but I wanted to illustrate how I'd retrieve more than n records
    getData = async (uri, count = 1) => {
        await fetch(uri)
            .then(response => {
                const link = parse(response.headers.get("link"));
                response.json().then((data) => this.setData(data));
                count++;
                return link && count < 6 ? this.getData(link.next.url,count) : null; //Limit to 5 pages before it gets ridiculous
            })
            .catch(e => this.error = e)
    };

    setData = (data) => this.GithubData = [...this.GithubData,...data];
}

decorate(GithubStore, {
    GithubData: observable,
    loading: observable,
    error: observable,
    loadUserDataAsync: action,
    RepoById: action
});

export default new GithubStore();