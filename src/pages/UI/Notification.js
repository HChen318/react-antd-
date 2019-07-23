import React, { Component } from 'react';
import { Card, Button,notification } from 'antd'
import './ui.less'


export default class Loadings extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    noteClick =(type,position) =>{
        if(position) {
            notification.config({
                placement:position
            })
        }
        notification[type]({
            message:'HI',
            description:'我我我我我我我'
        })
    }

    render(){
        return (
            <div>
               <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={() =>this.noteClick('success')}>Success</Button>
                    <Button type="primary" onClick={() =>this.noteClick('info')}>Info</Button>
                    <Button type="primary" onClick={() =>this.noteClick('warning')}>Warning</Button>
                    <Button type="primary" onClick={() =>this.noteClick('error')}>Error</Button>
               </Card>
               <Card title="通知提醒框-方向控制" className="card-wrap">
                    <Button type="primary" onClick={() =>this.noteClick('success','topLeft')}>Success-TopLeft</Button>
                    <Button type="primary" onClick={() =>this.noteClick('info','topRight')}>Info-TopRight</Button>
                    <Button type="primary" onClick={() =>this.noteClick('warning','bottomLeft')}>Warning-BottomLeft</Button>
                    <Button type="primary" onClick={() =>this.noteClick('error','bottomRight')}>Error-BootomRight</Button>
               </Card>
            </div>
        )
    }
}
