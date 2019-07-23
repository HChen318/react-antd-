import React, { Component } from 'react';
import { Col, Row } from 'antd';
import time from '../../utils/utils'
import axios from '../../axios'


import './header.less'

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            sysTime: '',
            weather:'',
            picUrl:''
        }
    }

    componentWillMount() { 
        this.timeInterval = setInterval(() => {
           let sysTime = time.formateDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000)
        this.setState({
            name: 'CH',
        })
        let city = "shenzhen"
        //获取百度天气
        axios.jsonp(
            {url: "http://api.map.baidu.com/telematics/v3/weather?location=" + encodeURIComponent(city) +"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"}
        ).then(res =>{
            // console.log(res,111);
            if(res.status === 'success'){
                this.setState({
                    weather:res.results[0] && res.results[0].weather_data[0].weather,
                    picUrl:res.results[0] && res.results[0].weather_data[0].dayPictureUrl
                })
            }   
        })
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval)
    }

    render() {
        const { sysTime,weather,picUrl } = this.state
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎,{this.state.name}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">首页</Col>
                    <Col span={20} className="weather">
                        <span>{sysTime}</span>
                        <span><img src={picUrl} alt=""/></span>
                        <span>{weather}</span>
                    </Col>
                </Row>


            </div>
        )
    }
}