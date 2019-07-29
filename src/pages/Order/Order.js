import React, { Component } from 'react';
import { Card, Button, Table,message,Modal } from 'antd';
import ListSearch from './child/ListSearch'
import Utils from '../../utils/utils'
import Axios from '../../axios'
import BaseForm from '../../components/BaseForm/BaseForm'
import moment from 'moment';

export default class Order extends Component {
    constructor() {
        super()
        this.state = {
            columns: [
                {
                    title: '订单编号',
                    dataIndex: 'order_sn'
                },
                {
                    title: '车辆编号',
                    dataIndex: 'bike_sn'
                },
                {
                    title: '用户名',
                    dataIndex: 'userName'
                },
                {
                    title: '手机号',
                    dataIndex: 'mobile'
                },
                {
                    title: '里程',
                    dataIndex: 'distance',
                    render(distance) {
                        return distance / 1000 + 'Km';
                    }
                },
                {
                    title: '行驶时长',
                    dataIndex: 'total_time'
                },
                {
                    title: '状态',
                    dataIndex: 'status'
                },
                {
                    title: '开始时间',
                    dataIndex: 'start_time'
                },
                {
                    title: '结束时间',
                    dataIndex: 'end_time'
                },
                {
                    title: '订单金额',
                    dataIndex: 'total_fee'
                },
                {
                    title: '实付金额',
                    dataIndex: 'user_pay'
                }
            ],
            selectedRowKeys: [],
            selectedRows:{}
        }
    }
    param = {
        page: 1
    }

    formList = [
        {
        type:'Select_type',
        label:'城市',
        field:"city",
        initialValue:'1',
        width:150,
        value:[{id:"1",value:'全部'},{id:"2",value:'北京市'},{id:"3",value:'深圳市'}]
        },
        {
        type:'Input_type',
        label:'测试',
        initialValue:'s',
        field:"test",
        width:150,
        },
        {
        type:'RangePicker_type',
        label:'订单时间',
        field:"order_time",
        startTime:moment().subtract(1,'months').format('YYYY-MM-DD'),
        endTime:moment().format("YYYY-MM-DD"),
        initialValue:'1',
        width:150,
        },
        {
        type:'Select_type',
        label:'订单状态',
        initialValue:'1',
        width:150,
        field:"order_status",
        value:[{id:"1",value:'全部'},{id:"2",value:'进行中'},{id:"3",value:'结束行程'}]
        },
 
    ]


    componentWillMount() {
        this.getTableList()
    }

    getTableList = () => {
        Axios.ajaxAxios({
            url: '/order/list',
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
    //订单详情
    orderDetails = () =>{
        const {selectedRows} = this.state
        console.log(selectedRows);
        if(!Object.keys(selectedRows).length) {
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return 
        }
        window.open(`#/common/order/detail/${selectedRows.id}`,'_blank')
    }
    searchVal = (values) =>{
        console.log(values);
        
    }


    render() {
        const { columns, dataSource, pagination, selectedRowKeys } = this.state
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
                    <Button type="primary" style={{ marginRight: 20 }} onClick={this.orderDetails}>订单详情</Button>
                    <Button type="primary">结束订单</Button>
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
            </div>
        )
    }

}