import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';

import IndexWrapper from '../container/index';
import CommentWrapper from '../container/comment';
import DetailWrapper from '../container/detail';

import App from '../container/app';
import DevTools from '../../common/devtools/DevTools';
import { DEBUG } from '../constants/constants';
// import { routeConfig } from './route';

import {
    syncHistoryWithStore
} from 'react-router-redux';

import {
    Router,
    IndexRoute,
    Route,
    hashHistory
} from 'react-router';

// for hot reload
// if (module.hot) {
//     module.hot.accept();
// }

let store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

let DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {
    render() {
        return (
            <Provider
                store={store}
            >
                <div>
                    <Router
                        history={history}
                    >
                        <Route
                            path="/"
                            component={App}
                        >
                            <IndexRoute
                                component={IndexWrapper}
                            />
                            <Route
                                path="comment/:id"
                                component={CommentWrapper}
                            />
                            <Route
                                path="detail/:id/:commentid"
                                component={DetailWrapper}
                            />
                        </Route>
                    </Router>
                    {DevToolsWrapper}
                </div>
            </Provider>
        );
    }
}

// render(
//     <Root />,
//     document.getElementById('pages')
// );
