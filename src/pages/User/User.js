import React, { Component } from 'react';
import { Card, Button, Table, Modal} from 'antd';
import Utils from '../../utils/utils'
import Axios from '../../axios'
import BaseForm from '../../components/BaseForm/BaseForm'
import UserModal from './child/UserModal'
import moment from 'moment';

export default class User extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                { title: 'id', dataIndex: 'id', key: 'id' },
                { title: '用户名', dataIndex: 'userName', key: 'userName' },
                { title: '性别', dataIndex: 'sex', key: 'sex', render: (text) => text == 1 ? '男' : '女' },
                {
                    title: '状态', dataIndex: 'state', key: 'state', render(state) {
                        let config = {
                            '1': '咸🐟一条',
                            '2': '风华浪子',
                            '3': '北大才子一枚',
                            '4': '百度FE',
                            '5': '创业者',
                        };
                        return config[state]
                    }
                },
                {
                    title: '爱好', dataIndex: 'interest', key: 'interest', render(interest) {
                        let config = {
                            '1': '🏊‍',
                            '2': '🏀',
                            '3': '⚽',
                            '4': '🏃',
                            '5': '🏔',
                            '6': '🚴',
                            '7': '🎱',
                            '8': '🎤',
                        };
                        return config[interest]
                    }
                },
                { title: '生日', dataIndex: 'birthday', key: 'birthday' },
                { title: '地址', dataIndex: 'address', key: 'address' },
                { title: '早起时间', dataIndex: 'time', key: 'time' }
            ],
            selectedRowKeys: [],
            selectedRows: {},
            params:{visible:false,dataItem:'',type:''}
        }
    }

    param = {
        page: 1
    }

    formList = [
        {
            type: 'Input_type',
            label: '用户名',
            field: "userName",
            initialValue: '',
            width: 150
        },
        {
            type: 'Input_type',
            label: '用户手机号',
            initialValue: '',
            field: "mobile",
            width: 150,
        },
        {
            type: 'DatePicker_type',
            label: '请选择入职日期',
            field: "entry_date",
            dateFormat: 'YYYY-MM-DD HH:mm',
            width: 150,
        }
    ]

    componentWillMount() {
        this.getTableList()
    }

    //获取列表
    getTableList = () => {
        Axios.ajaxAxios({
            url: '/user/list',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            console.log(res);
            if (res.code == 0) {
                let list = res.result.list.map((ele, index) => {
                    ele.key = index;
                    return ele
                })
                this.setState({
                    dataSource: list,
                    pagination: Utils.pagination(res.result, (page) => {
                        this.param.page = page
                        this.getTableList()
                    }
                    )
                })
            }
        })
    }

    //新增/编辑/删除
    userClick = (type) =>{
        if(type == 'add'){
            this.setState({
                params:{...this.state.params,visible:true}
            })
        }else if (type == 'edit' || type == 'detail'){
            const {selectedRows} = this.state
            if(!Object.values(selectedRows).length){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return
            }
            if(type == 'edit'){
                this.setState({
                    params:{...this.state.params,visible:true,dataItem:selectedRows}
                }) 
            }else if(type == 'detail'){
                this.setState({
                    params:{visible:true,dataItem:selectedRows,type:'detail'}
                }) 
            }
        }
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

    searchVal = (values) => {
        console.log(values);
    }


    render() {
        const { columns, dataSource, pagination, selectedRowKeys,params } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
        }
        return (
            <div>
                <Card>
                    {/* <ListSearch search={this.search} /> */}
                    <BaseForm formList={this.formList} searchVal={this.searchVal} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button icon="plus" type="primary" style={{ marginRight: 20 }} onClick={() =>this.userClick('add')}>创建员工</Button>
                    <Button icon="edit" style={{ marginRight: 20 }} onClick={() =>this.userClick('edit')} >编辑员工</Button>
                    <Button style={{ marginRight: 20 }} onClick={() =>this.userClick('detail')} >员工详情</Button>
                    <Button icon="delete" type="danger">删除员工</Button>
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
                <UserModal params={params} onCancel={()=>{this.setState({params:{...this.state.params,visible:false,dataItem:''}})}} />
            </div>
        )
    }

}