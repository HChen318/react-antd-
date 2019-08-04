import React, { Component } from 'react';
import { Col, Row } from 'antd';
import time from '../../utils/utils'
import axios from '../../axios'
import { connect } from 'react-redux'
import {menuAction} from '../../react-redux/action/action'
import './header.less'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            sysTime: '',
            weather: '',
            picUrl: ''
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
            { url: "http://api.map.baidu.com/telematics/v3/weather?location=" + encodeURIComponent(city) + "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2" }
        ).then(res => {
            // console.log(res,111);
            if (res.status === 'success') {
                this.setState({
                    weather: res.results[0] && res.results[0].weather_data[0].weather,
                    picUrl: res.results[0] && res.results[0].weather_data[0].dayPictureUrl
                })
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval)
    }

    render() {
        const { sysTime, weather, picUrl } = this.state
        const { menuType } = this.props
        return (
            <div className="header">
                <Row className="header-top">
                    {menuType ? <Col span={8}>
                        <div className="logo">
                            <img src="/assets/logo-ant.svg" alt="" />
                            <span>IMooc 通用管理系统</span>
                        </div>
                    </Col> : null}
                    <Col span={menuType ? 16 : 24}>
                        <span>欢迎,{this.state.name}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    !menuType ?
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">{this.props.title}</Col>
                            <Col span={20} className="weather">
                                <span>{sysTime}</span>
                                <span><img src={picUrl} alt="" /></span>
                                <span>{weather}</span>
                            </Col>
                        </Row> : null
                }
            </div>
        )
    }
}

//把仓库中的数据映射到props
const mapStateToPros = (state) =>{
    console.log(state);
    return {
        title:state && state.title
    }
}


export default connect(mapStateToPros,null)(Header)
