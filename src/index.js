import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "mobx-react";
import GithubStore from './stores/GithubStore';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider GithubStore={GithubStore}>
        <App  />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
