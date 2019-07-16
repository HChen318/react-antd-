import React, { Component } from 'react';
import { Col, Row } from 'antd'
import NavLeft from './components/NavLeft/NavLeft'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/home/Home'


import './style/common.less'

export default class Ammin extends Component {
    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={4} className="nav-left">
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={20} className="main">
                        <Header></Header>
                        <Row className="content">
                            <Home />
                        </Row>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }

}