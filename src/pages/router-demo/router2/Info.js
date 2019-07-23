import React, { Component } from "react";



export default class Info extends Component {

    render() {
        return (
            <div>
                {/*动态路由参数 */}
                This is Info {this.props.match.params.a}
            </div>
        )
    }
}

