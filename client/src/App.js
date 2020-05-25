import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserLogin from './components/UserLogin';
import UserReport from './components/UserReport';
import AdminReportTable from './components/AdminReportTable';
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
                                <Route exact path='/' component={UserLogin}/>
                                <Route path='/login' component={UserLogin}/>
                                <Route path='/report' component={UserReport}/>
                                <Route path='/admin' component={AdminReportTable}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
