import React, { Component } from 'react';
import { Col, Row } from 'antd'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/home/Home'
import './style/common.less'

export default class Common extends Component {
    render() {
        return (
            <div>
                <Row className="second-page">
                    <Header menuType="second"></Header>
                </Row>
                <Row className="content" style={{padding:20}}>
                    {this.props.children}
                </Row>
                <Footer></Footer>
            </div>
        )
    }

}