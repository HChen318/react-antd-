import React, { Component } from "react";
import {  Link } from "react-router-dom";

export default class Main extends Component {

    render() {
      
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/main">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/me">22222</Link>
                    </li>
                    <li>
                        <Link to="/meme">33333</Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        )
    }
}



