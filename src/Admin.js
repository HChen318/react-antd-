import React, { Component } from 'react';
import { Col, Row } from 'antd'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'


import './style/common.less'

export default class Ammin extends Component {
    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="nav-left">
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={21} className="main">
                        <Header></Header>
                        <Row className="content">content</Row>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }

}