import React, { Component } from 'react';
import { Card, Table, message, Button } from 'antd'
// import axios from 'axios'
import Axios from '../../axios'
import Utils from '../../utils/utils'


export default class HighTable extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                { title: 'id', dataIndex: 'id', key: 'id', width: 80 },
                { title: '用户名', dataIndex: 'userName', key: 'userName', width: 80 },
                { title: '性别', dataIndex: 'sex', key: 'sex', width: 80, render: (text) => text == 1 ? '男' : '女' },
                {
                    title: '状态', dataIndex: 'state', key: 'state', width: 80, render(state) {
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
                    title: '爱好', dataIndex: 'interest', key: 'interest', width: 80, render(interest) {
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
                { title: '生日', dataIndex: 'birthday', width: 80, key: 'birthday' },
                { title: '地址', dataIndex: 'address', width: 80, key: 'address' },
                { title: '早起时间', dataIndex: 'time', width: 80, key: 'time' }
            ],

            dataSource: [],
            selectedRowKeys: [],
            selectedRowKeys2: [],
            pagination: {},
            sortOrder: null
        }
    }

    param = {
        page: 1
    }
    componentWillMount() {
        this.getTable()
    }

    getTable = () => {
        Axios.ajaxAxios({
            url: '/table/high/list',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    dataSource: res.result.list,
                    selectedRowKeys2: [],
                    selectedRows2: null,
                    pagination: Utils.pagination(res.result, (page) => {
                        this.param.page = page
                        this.getTable()
                    })
                })
            }
        })
    }
    onChangesorter = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
        this.setState({
            sortOrder: sorter.order
        })
    }


    render() {
        const { columns, dataSource, pagination,  } = this.state
        const columns1 = [
            { title: 'id', dataIndex: 'id', key: 'id', width: 80 },
            { title: '用户名', dataIndex: 'userName', key: 'userName', width: 80 },
            { title: '性别', dataIndex: 'sex', key: 'sex', width: 80, render: (text) => text == 1 ? '男' : '女' },
            {
                title: '年龄', dataIndex: 'age', key: 'age', width: 80, sorter(a, b) {
                    return a.age - b.age
                }
            },
            {
                title: '状态', dataIndex: 'state', key: 'state', width: 80, render(state) {
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
                title: '爱好', dataIndex: 'interest', key: 'interest', width: 80, render(interest) {
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
            { title: '生日', dataIndex: 'birthday', width: 80, key: 'birthday' },
            { title: '地址', dataIndex: 'address', width: 80, key: 'address' },
            { title: '早起时间', dataIndex: 'time', width: 80, key: 'time' }
        ]
        return (
            <div>
                <Card title="头部固定" style={{ marginTop: 20 }}>
                    <Table columns={columns}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        bordered
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="排序" style={{ marginTop: 20 }}>
                    <Table columns={columns1}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        bordered
                        onChange={this.onChangesorter}
                    />
                </Card>
            </div>

        )
    }
}