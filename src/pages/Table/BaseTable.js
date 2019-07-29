import React, { Component } from 'react';
import { Card, Table,message,Button } from 'antd'
// import axios from 'axios'
import Axios from '../../axios'
import Utils from '../../utils/utils'


export default class BaseTable extends Component {
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
            dataSource: [],
            selectedRowKeys:[],
            selectedRowKeys2:[],
            pagination:{}
        }
    }

    param = {
        page:1
    }

    componentWillMount() {
        // let url = 'https://www.easy-mock.com/mock/5d342ba81dacec11eafbfd63/mockapi'
        // axios.get(`${url}/table/list`).then((res)=>{
        //     console.log(res);
        // })
        this.getTable()
    }

    getTable = () => {
        Axios.ajaxAxios({
            url: '/table/list1',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    dataSource: res.result.list,
                    selectedRowKeys2:[],
                    selectedRows2:null,
                    pagination:Utils.pagination(res.result,(page)=>{
                        console.log(this.getTable);
                        
                        this.param.page = page
                        this.getTable()
                    })
                })
            }
        })
    }
    //点击行
    rowClick = (row,index) => {
        console.log(row,index);
        let selectedRowKeys = [index+1]
        this.setState({
            selectedRowKeys
        })
    }
    
    onSelectChange = (selectedRowKeys,row) =>{
        console.log(selectedRowKeys,row);
        message.info(`id为${row[0].id}姓名${row[0].userName}`)
        this.setState({
            selectedRowKeys
        })  
    }
    
    delCheck = () =>{
        let {selectedRowKeys2,row}  = this.state
        this.getTable()
    }

    render() {
        const { columns, dataSource,selectedRowKeys,selectedRowKeys2,pagination } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            // onChange:this.onSelectChange
        }
        const rowCheckSelection = {
            selectedRowKeys:selectedRowKeys2,
            onChange: (selectedRowKeys2,selectedRows2) =>{
                console.log(selectedRowKeys2,selectedRows2);
                
                this.setState({
                    selectedRowKeys2,
                    selectedRows2
                })
            }
        }

        return (
            <div>
                <Card title="动态数据渲染表格-Mock" >
                    <Table columns={columns} dataSource={dataSource} rowKey={(record) => record.id} pagination={false} />
                </Card>
                <Card title="Mock单选框" style={{ marginTop: 20 }}>
                    <Table columns={columns}
                        rowSelection={rowSelection}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        pagination={false}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.rowClick(record,index)// 点击行
                                }, 
                            }
                        }}
                    />
                </Card>
                <Button type="primary" onClick={this.delCheck}>删除</Button>
                <Card title="Mock多选框" >
                    <Table columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock分页"   style={{ marginTop: 20 }}>
                    <Table columns={columns}
                        rowSelection={rowCheckSelection}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                </Card>

            </div>
        )
    }
}

