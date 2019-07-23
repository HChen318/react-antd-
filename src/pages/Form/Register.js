import React, { Component } from 'react';
import { Card, Button, Radio, Form, Input, Select, Switch, DatePicker, TimePicker, Upload, Icon, message,Checkbox } from 'antd'
import moment from 'moment'


const { Option } = Select;
const { TextArea } = Input;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
class Register extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    getVal = () =>{
        let userInfo = this.props.form.getFieldsValue();// 可以(获取表单中)object对象
        console.log(userInfo);
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const layoutStyle = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        }
        const layoutOffsetStyle = {
            wrapperCol: {
                xs: { span: 24, },
                sm: { span: 10,offset:4 },
            },
        }
        const { imageUrl } = this.state
        return (

            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form>
                        <Form.Item label="用户名" {...layoutStyle}>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })(
                                    <Input />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="密码"  {...layoutStyle}>
                            {
                                getFieldDecorator('pwd', {
                                    initialValue: '',
                                    rules: [{ required: true }]
                                })(
                                    <Input />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="性别"  {...layoutStyle}>
                            {
                                getFieldDecorator('gender', {
                                    initialValue: 1,

                                })(
                                    <Radio.Group >
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </ Radio.Group >
                                )
                            }
                        </Form.Item>
                        <Form.Item label="当前状态"  {...layoutStyle}>
                            {
                                getFieldDecorator('status', {
                                    initialValue: 1,
                                })(
                                    <Select>
                                        <Option value={1}>风华浪子</Option>
                                        <Option value={2}>咸鱼一条</Option>
                                        <Option value={3}>北大才子一枚</Option>
                                        <Option value={4}>创业者</Option>
                                        <Option value={5}>百度FE</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="爱好"  {...layoutStyle}>
                            {
                                getFieldDecorator('hobby', {
                                    initialValue: ['1', '2']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">🏊‍</Option>
                                        <Option value="2">🏀</Option>
                                        <Option value="3">⚽</Option>
                                        <Option value="4">🏃</Option>
                                        <Option value="5">🏔</Option>
                                        <Option value="6">🚴</Option>
                                        <Option value="7">🎱</Option>
                                        <Option value="8">🎤</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否已婚"  {...layoutStyle}>
                            {
                                getFieldDecorator('ifMarry', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="生日"  {...layoutStyle}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019/7/21')

                                })(
                                    <DatePicker showTime />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="联系地址"  {...layoutStyle}>
                            {
                                getFieldDecorator('address', {
                                })(
                                    <TextArea rows={5} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="早起时间"  {...layoutStyle}>
                            {
                                getFieldDecorator('morningtime', {
                                })(
                                    <TimePicker />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="头像"  {...layoutStyle}>
                            {
                                getFieldDecorator('head', {
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : <Icon type={this.state.loading ? 'loading' : 'plus'} />}
                                    </ Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item   {...layoutOffsetStyle}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox></Checkbox>)}
                            <a href="#">
                                耶耶耶
                            </a>
                        </Form.Item>
                        <Form.Item   {...layoutOffsetStyle}>
                            <Button type="primary" onClick={this.getVal}>注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

}

export default Form.create({})(Register)