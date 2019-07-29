import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';

const { Option } = Select


class ListSearch extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentWillMount() {

    }

    search = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.search(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline" >
                <Form.Item label="城市">
                    {getFieldDecorator("city", {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 150 }} >
                            <Option value="1">全部</Option>
                            <Option value="2">北京市</Option>
                            <Option value="3">天津市</Option>
                            <Option value="4">深圳市</Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item label="用车模式">
                    {getFieldDecorator("useCar_mode", {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 150 }} >
                            <Option value="1">全部</Option>
                            <Option value="2">指定停车点模式</Option>
                            <Option value="3">禁停区模式</Option>
                            <Option value="4">深圳市</Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item label="营运模式">
                    {getFieldDecorator("use_mode", {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 150 }} >
                            <Option value="1">全部</Option>
                            <Option value="2">自营</Option>
                            <Option value="3">加盟</Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item label="加盟商授权状态">
                    {getFieldDecorator("status", {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 150 }} >
                            <Option value="1">全部</Option>
                            <Option value="2">已授权</Option>
                            <Option value="3">未授权</Option>
                        </Select>
                    )
                    }
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={this.search}>查询</Button>
                </Form.Item>
                <Form.Item >
                    <Button type="primary">重置</Button>
                </Form.Item>
            </Form>
        )
    }

}

export default Form.create({})(ListSearch)