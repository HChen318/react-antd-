import React, { Component } from 'react';
import { Card, Button, Table,message,Modal } from 'antd';
import Utils from '../../utils/utils'
import Axios from '../../axios'
import UserAuthorization from './child/UserAuthorization'
import PermissionSet from './child/PermissionSet'

export default class Permission extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                {
                    title: '角色ID',
                    dataIndex: 'id'
                },
                {
                    title: '角色名称',
                    dataIndex: 'role_name'
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_time'
                },
                {
                    title: '使用状态',
                    dataIndex: 'status',
                    render(text){
                        return text == 1 ? '停用' : '启用'
                    }
                },
                {
                    title: '授权时间',
                    dataIndex: 'authorize_time',
                },
                {
                    title: '授权人',
                    dataIndex: 'authorize_user_name'
                }
            ],
            selectedRowKeys: [],
            selectedRows:{},
            userParams:{  // 用户权限参数
                visible:false,
                userId:'',
                name:''
            },
            permissionParams:{
                visible:false,
                checkedKeys:[],
                name:''
            } 
        }
    }

    param = {
        page: 1
    }

    componentWillMount() {
        this.getTableList()
    }

    getTableList = () => {
        Axios.ajaxAxios({
            url: '/role/list',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            if (res.code == 0) {
                let list = res.result.item_list.map((ele, index) => {
                    ele.key = index;
                    return ele
                })
                this.setState({
                    dataSource:res && res.result.item_list,
                    pagination: Utils.pagination(res.result, (page) => {
                        this.param.page = page
                        this.getTableList()
                    })
                })
            }
        })
    }
    // 选择行
    onRowClick = (selectedRows, index) => {
        let selectedRowKeys = [index]
        console.log(selectedRowKeys);
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }
    //用户授权
    userAuthorization = (info) =>{
        const {selectedRows} = this.state
        console.log(selectedRows);
        if(!Object.keys(selectedRows).length) {
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return 
        }
        if(info == 'user') {
            this.setState({
                userParams:{userId:selectedRows.id || '',visible:true, name:selectedRows.authorize_user_name || ''},
               
    
            })
        } else if (info == 'permissionSet'){
            this.setState({
                permissionParams:{checkedKeys:selectedRows.menus || [],visible:true, name:selectedRows.authorize_user_name || ''},
            })
        }
     
    }

    searchVal = (values) =>{
        console.log(values);
    }
    handleOk = () =>{
        this.getTableList()
    }


    render() {
        const { columns, dataSource, pagination, selectedRowKeys,userParams,permissionParams } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys,selectedRows);     
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
        }
        return (
            <div>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" style={{ marginRight: 20 }} >创建角色</Button>
                    <Button type="primary" style={{ marginRight: 20 }} onClick={() =>this.userAuthorization('permissionSet')}>设置权限</Button>
                    <Button type="primary" onClick={() =>this.userAuthorization('user')}>用户授权</Button>
                </Card>
                <div className="table-wrap">
                    <Table columns={columns} bordered dataSource={dataSource}
                        pagination={pagination}
                        // rowKey={(record)=>record.order_sn}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: event => {
                                    this.onRowClick(record, index)
                                }, // 点击行
                            };
                        }}
                    />
                </div>
                <UserAuthorization userParams={userParams} handleOk={this.handleOk} onCancel={() => this.setState({userParams:{...this.state.params,visible:false}})} />
                <PermissionSet permissionParams={permissionParams} handleOk={this.handleOk} onCancel={() => this.setState({permissionParams:{...this.state.params,visible:false}})} />
            </div>
        )
    }

}