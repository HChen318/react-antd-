import React, { Component } from 'react';
import { Card, Button, message } from 'antd'
import './ui.less'


export default class Loadings extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    messageClick = (type) =>{
        message[type]('我我我我')
    }


    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={() => this.messageClick('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.messageClick('info')}>info</Button>
                    <Button type="primary" onClick={() => this.messageClick('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.messageClick('error')}>error</Button>
                    <Button type="primary" onClick={() => this.messageClick('loading')}>loading</Button>
                </Card>
            </div>
        )
    }
}