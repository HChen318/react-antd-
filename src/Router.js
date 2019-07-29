import React, { Component } from 'react';
import { HashRouter, Switch, Route,Redirect } from 'react-router-dom'
import Login from '../src/pages/Login/Login'
import App from './App'
import Admin from './Admin'
import Common from './Common'
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
import City from './pages/City/City'
import Order from './pages/Order/Order'
import OrderDetail from './pages/Order/OrderDetail'
import Permission from './pages/Permission/Permission'
import Home from '../src/pages/home/Home'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


export default class Router extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common" render={()=>
                            <Common>
                                <Route path="/common/order/detail/:id" component={OrderDetail} />
                            </Common>
                        }/>
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Button} />
                                    <Route path="/ui/modals" component={Modal} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notifications} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/form/reg" component={Register} />
                                    <Route path="/table/basic" component={BaseTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/permission" component={Permission} />
                                    <Redirect exact from="/" to="/home"  />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                    </App>
                </HashRouter>


            </div>
        )
    }

}