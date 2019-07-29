import React, { Component } from 'react';
import {Card ,Button,Table} from 'antd';
import Utils from '../../utils/utils'
import Axios from '../../axios'
import ListSearch from './child/ListSearch'
import ModalCity from './child/ModalCity'

export default class City extends Component {
    constructor() {
        super()
        this.state = {
            columns:[
                {title:'城市ID',dataIndex:'id'},
                {title:'城市名称',dataIndex:'name'},
                {title:'用车模式',dataIndex:'mode',render:(text)=>text==1 ? '禁停区' :'停车点'},
                {title:'营运模式',dataIndex:'op_mode',render:(text)=>text==1 ? '加盟' :'自营'},
                {title:'授权加盟商',dataIndex:'franchisee_name'},
                {title:'城市管理员',dataIndex:'city_admins',render(text){
                    let citymanager = text.map(ele=>{
                        return ele.userName
                    })
                    return citymanager.join(',')
                }},
                {title:'城市开通时间',dataIndex:'opentime'},
                {title:'操作时间',dataIndex:'updatetime',render(text){
                    return Utils.formateDate(text)
                }},
                {title:'操作人',dataIndex:'sysusername'},
            ],
            dataSource:[],
            visible:false
        }
    }

    param = {
        page:1
    }

    componentWillMount(){
        this.getTableList()
    }

    getTableList = () => {
        Axios.ajaxAxios({
            url: 'open_city',
            data: {
                param: {
                    page: this.param.page
                }
            }
        }).then(res => {
            if (res.code == 0) {
                this.setState({
                    dataSource: res.result.list,
                    pagination: Utils.pagination(res.result, (page) => {
                        this.param.page = page
                        this.getTable()
                    })
                })
            }
        })
    }

    search = (values) =>{
        console.log(values);    
    }
    openCityClick = () =>{
        this.setState({
            visible:true
        })
    }
    handleOk =(values)=>{
        console.log(values);
        this.getTable()
        
    }

    render(){
        const {dataSource,columns,pagination,visible} = this.state
        return (
            <div>
                <Card>
                    <ListSearch search={this.search} />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openCityClick}>开通城市</Button>
                </Card>
                <div className="table-wrap">
                    <Table columns={columns} bordered dataSource={dataSource} pagination={pagination} rowKey={(record)=>record.id}/>
                </div>
                <ModalCity visible={visible} onCancel={() => this.setState({visible:false})}  handleOk={this.handleOk}/>

            </div>
        )
    }

}