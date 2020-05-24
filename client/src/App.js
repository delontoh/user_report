import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserLogin from './components/UserLogin';
import UserReport from './components/UserReport';
import AdminReport from './components/AdminReport';
import 'react-table-6/react-table.css';
import './styles/custom.scss';

import './App.css';

function App() {
    const history = createHistory();

    return (
        <MuiThemeProvider>
            <div className="App">
                <div id="app-inner">
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route exact path='/login' component={UserLogin}/>
                                <Route exact path='/report' component={UserReport}/>
                                <Route exact path='/admin' component={AdminReport}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
