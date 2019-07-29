import React, { Component } from 'react';
import { Modal, Form,Input,Transfer } from 'antd';
import Axios from '../../../axios'



class UserAuthorization extends Component {
    constructor() {
        super()
        this.state = {
            dataSource:[], //数据源
            targetKeys:[] // 目标源
        }
    }



    componentWillReceiveProps(newProps){
        const {userParams} = newProps
        // 弹框后发请求
        if(userParams.visible && this.props.userParams.visible != userParams.visible ){
            Axios.ajaxAxios({
                url:'/user_list',
                data:{
                    param:{id:userParams.userId}
                }
            }).then(res =>{
                if(res.code == 0){
                    if(res && res.result.length >0 ){                    
                        let dataSource = []
                        let targetKeys = []
                        res.result.forEach(ele =>{
                            const objData = {
                                key:ele.user_id,
                                title:ele.user_name
                            }
                            if(ele.status == 1){
                                targetKeys.push(ele.user_id)
                            }
                            dataSource.push(objData) 
                        })                        
                        this.setState({
                            dataSource,
                            targetKeys
                        })
                    }
                }
            })
        }   
}

    componentWillMount(){
        // console.log(1212121); 
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    handleOk = () => {
        let objParams = {}
        objParams.userId = this.props.userParams.userId
        objParams.targetKeys = this.state.targetKeys  
        Axios.ajaxAxios({
            url:'/user_role_edit',
            data:{
                param:{...objParams}
            }
        }).then(res =>{
            this.props.handleOk()
            this.props.onCancel()
        })

    }

    // 帅选过滤
    filterOption = (inputValue, option) =>{
        return option.title.indexOf(inputValue) > -1
    }
    //穿梭框Change事件
    handleChange = (targetKeys) =>{
        console.log(targetKeys);
        this.setState({
            targetKeys
        })
        
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
        }

        const {dataSource,targetKeys} = this.state
        const {userParams} = this.props
        return (
            <Modal
                title="用户授权"
                visible={userParams.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={1000}
            >
                <Form >
                    <Form.Item label="角色名称" {...formItemLayout}>
                        <Input value={userParams.name } disabled style={{width:300}} />
                    </Form.Item>
                    <Form.Item label="选择用户" {...formItemLayout}>
                        <Transfer 
                             dataSource={dataSource}
                             titles={['Source', 'Target']}
                             targetKeys={targetKeys}
                             onChange={this.handleChange}
                             showSearch
                             filterOption={this.filterOption}
                             render={item => item.title}
                             listStyle={{
                                width: 250,
                                height: 400,
                              }}
                        />
                    </Form.Item>

                </Form>
            </ Modal>
        )
    }

}

export default Form.create({})(UserAuthorization)