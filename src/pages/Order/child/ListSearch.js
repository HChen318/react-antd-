import React, { Component } from 'react';
import { Form, Select, Button, DatePicker } from 'antd';
import moment from 'moment';
const {  RangePicker } = DatePicker;
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
        const dateFormat = 'YYYY/MM/DD';
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
                <Form.Item label="订单时间">
                    {getFieldDecorator("order_time", {
                       initialValue: [moment(new Date(), dateFormat), moment(new Date(), dateFormat)]
                    })(
                        <RangePicker
                            format={dateFormat}
                        />
                    )
                    }
                </Form.Item>

                <Form.Item label="订单状态">
                    {getFieldDecorator("status", {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 150 }} >
                            <Option value="1">全部</Option>
                            <Option value="2">进行中</Option>
                            <Option value="3">结束行程</Option>
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