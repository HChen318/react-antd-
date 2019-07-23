import React, { Component } from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Home from './Home2'
import Router from './Router'
import About from './About2'
import Info from './Info'
import Topics from './Topics2'
import NoMach from './NoMach'

export default class Main extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch >
                        <Router>
                            <Route path="/main" render={() =>
                                <Home>
                                    <Route path="/main/:a" component={Info} />
                                </Home>
                            } />
                            <Route path="/about" component={About} />
                            <Route path="/topics" component={Topics} />
                            <Route  component={NoMach} />
                        </Router>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}



