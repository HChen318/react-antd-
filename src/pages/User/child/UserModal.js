import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import Axios from '../../../axios'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input;

class UserModal extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentWillReceiveProps(newProps) {
        const { params } = newProps
        // 弹框后发请求
        if (params.visible && this.props.params.visible != params.visible) {

        }
    }

    componentWillMount() {
        // console.log(1212121); 
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    handleOk = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (values.birthdy) {
                    values.birthdy = moment(values.birthdy).format('YYYY-MM-DD')
                }
                Axios.ajaxAxios({
                    url: this.props.params.dataItem ? '/user/edit' : '/user/add',
                    data: {
                        param: values
                    }
                }).then(res => {
                    this.props.form.resetFields()
                    this.props.onCancel()
                })
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
        }
        const { } = this.state
        const { params } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="用户授权"
                visible={params.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={800}
            >
                <Form>
                    <Form.Item label="角色名称" {...formItemLayout}>
                        {params && params.type == 'detail' ? params.dataItem.userName :
                            getFieldDecorator("name", {
                                initialValue: params.dataItem ? params.dataItem.userName : '',
                                rules: [{ required: true }],
                            })(
                                <Input placeholder="请输入姓名" style={{ width: 300 }} />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="性别" {...formItemLayout}>
                        {params && params.type == 'detail' ? params.dataItem.sex :
                            getFieldDecorator('gender', {
                                initialValue: params.dataItem ? params.dataItem.sex : '',
                                rules: [{ required: true }],
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="状态"  {...formItemLayout}>
                        {params && params.type == 'detail' ? params.dataItem.state :
                            getFieldDecorator('state', {
                                initialValue: params.dataItem ? params.dataItem.state : '',
                                rules: [{ required: true }],
                            })(
                                <Select placeholder="请选择">
                                    <Option value="1">咸鱼一条</Option>
                                    <Option value="2">风华浪子</Option>
                                    <Option value="3">北大才子一枚</Option>
                                    <Option value="4">百度PE</Option>
                                    <Option value="5">创业者</Option>
                                </Select>
                            )}
                    </Form.Item>
                    <Form.Item label="生日"  {...formItemLayout}>
                        {params && params.type == 'detail' ? params.dataItem.birthday :
                            getFieldDecorator('birthday', {
                                initialValue: params.dataItem ? moment(params.dataItem.birthday) : null,
                                rules: [{ required: true }]
                            })(
                                <DatePicker />
                            )}
                    </Form.Item>
                    <Form.Item label="联系地址" {...formItemLayout} >
                        {params && params.type == 'detail' ? params.dataItem.address :
                            getFieldDecorator('address', {
                                initialValue: params.dataItem ? params.dataItem.address : '',
                                rules: []
                            })(
                                <TextArea rows={4} />
                            )}
                    </Form.Item>
                </Form>
            </ Modal>
        )
    }

}

export default Form.create({})(UserModal)