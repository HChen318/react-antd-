import React, { Component } from 'react';
import { Card, Button, Radio ,Modal} from 'antd'
import './ui.less'

export default class Buttons extends Component {

    constructor() {
        super()
        this.state = {
            Modal1:false,
            Modal2:false,
            Modal3:false,
            Modal4:false,
        }
    }
    openModal = (type) =>{
        this.setState({
            [type]:true
        })
    }

    handleConfirm = (type) =>{
        Modal[type]({
            title:'哈哈哈',
            content:'不是吧',
            onOk(){
                console.log('this.ok');
            },
            onCancel(){
                console.log('this.cancel');
                
            }
        })
    }

    render() {
        const {Modal1,Modal2,Modal3,Modal4} = this.state
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() =>this.openModal('Modal1')}>Open</Button>
                    <Button type="primary" onClick={() =>this.openModal('Modal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() =>this.openModal('Modal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() =>this.openModal('Modal4')}>水平垂直居中</Button>
                </Card>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm("confirm")}>confrim</Button>
                    <Button type="primary" onClick={() => this.handleConfirm("info")}>info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm("success")}>success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm("error")}>Error</Button>
                    <Button type="primary" onClick={() => this.handleConfirm("warning")}>Warning</Button>
                </Card>

                <Modal
                    title="React"
                    visible={Modal1}
                    onOk={()=>{this.setState({Modal1:false})}}
                    onCancel={()=>{this.setState({Modal1:false})}}
                >
                  欢迎
                </Modal>
                <Modal
                    title="React"
                    visible={Modal2}
                    okText="好的"
                    cancelText="算了"
                    onOk={()=>{this.setState({Modal2:false})}}
                    onCancel={()=>{this.setState({Modal2:false})}}
                >
                  欢迎
                </Modal>
                <Modal
                    title="React"
                    visible={Modal3}
                    style={{top:20}}
                    onOk={()=>{this.setState({Modal3:false})}}
                    onCancel={()=>{this.setState({Modal3:false})}}
                >
                  欢迎
                </Modal>
                <Modal
                    title="React"
                    visible={Modal4}
                    style={{textAlign:'center'}}
                    wrapClassName ="vertical-center-modal"
                    onOk={()=>{this.setState({Modal4:false})}}
                    onCancel={()=>{this.setState({Modal4:false})}}
                >
                  欢迎
                </Modal>
            </div>
        )
    }
}