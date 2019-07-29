import React, { Component } from 'react';
import { Modal, Form, Select ,message} from 'antd';
import Axios from '../../../axios'
const { Option } = Select


class ModalCity extends Component {
    constructor() {
        super()
        this.state = {}
    }


    handleCancel = () => {
        this.props.onCancel()
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.getOpenCity(values)
                this.props.handleOk(values)
                this.props.onCancel()
            }
        })
    }
    getOpenCity = (values) => {
        Axios.ajaxAxios({
            url: 'city/open',
            data: {
                param:values
            },
            isshow:false
        }).then(res => {          
            if (res.code == 0) {
                message.success('开通城市成功')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
        }
        return (
            <Modal
                title="开通城市"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form >
                    <Form.Item label="城市" {...formItemLayout}>
                        {getFieldDecorator("city", {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">全部</Option>
                                <Option value="2">北京市</Option>
                                <Option value="3">天津市</Option>
                                <Option value="4">深圳市</Option>
                            </Select>
                        )
                        }
                    </Form.Item>
                    <Form.Item label="营运模式" {...formItemLayout}>
                        {getFieldDecorator("op_Modal", {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                        }
                    </Form.Item>
                    <Form.Item label="营运模式" {...formItemLayout}>
                        {getFieldDecorator("usecar", {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                        }
                    </Form.Item>
                </Form>
            </ Modal>
        )
    }

}

export default Form.create({})(ModalCity)