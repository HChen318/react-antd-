import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from '../src/pages/Login/Login'
import App from './App'
import Admin from './Admin'
import NoMatch from '../src/pages/NoMatch/NoMatch'
import Button from './pages/UI/Button'
import Modal from './pages/UI/Modal'
import Loadings from './pages/UI/Loadings'
import Messages from './pages/UI/Messages'
import Notifications from './pages/UI/Notification'
import Tabs from './pages/UI/Tabs'
import Register from './pages/Form/Register'
import BaseTable from './pages/Table/BaseTable'
import HighTable from './pages/Table/HighTable'

export default class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/ui/buttons" component={Button} />
                                    <Route path="/ui/modals" component={Modal} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notifications} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/form/reg" component={Register} />
                                    <Route path="/table/basic" component={BaseTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                        <Route path="/order/detail" component={Login} />
                    </App>
                </HashRouter>


            </div>
        )
    }

}