import React, { Component } from "react";
import {  Link,  } from "react-router-dom";



export default class Home extends Component {

    render() {
        
        
        return (
            <div>
                <Link to="/main/params1">嵌套路由1</Link>
                <br/>
                <Link to="/main/params2">嵌套路由2</Link>
                <br/>
                {this.props.children} 
            </div>
        )
    }
}

