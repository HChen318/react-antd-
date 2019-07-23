import React, { Component } from 'react';
import { Card, Spin, Alert } from 'antd'
import './ui.less'

export default class Loadings extends Component {
    constructor() {
        super()
        this.state = {
    
        }
    }


    render() {
        return (
            <div>
           
                <Card title="内容遮罩">
                    <Alert
                        message="React"
                        description="欢迎CH"
                        type="info"
                    />

                    <Spin tip="Loading...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                            style={{marginTop:10}}
                        />
                    </Spin>,
                    mountNode
                </Card>
            </div>
        )
    }
}