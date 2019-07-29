import React, { Component } from 'react';
import { Form, Select, Button, DatePicker, Input } from 'antd';
import Utils from '../../utils/utils'
import moment from 'moment';
const { RangePicker } = DatePicker;
const { Option } = Select

class BaseForm extends Component {
    constructor() {
        super()
    }

    initFormList = () => {
        let formList = this.props.formList || []
        let { getFieldDecorator } = this.props.form;
        let listArr = []
        if (formList && formList.length > 0) {
            formList.forEach(ele => {
                let type = ele.type
                let label = ele.label
                let field = ele.field
                let width = ele.width || 100
                let initialValue = ele.initialValue || ''
                if (type == 'Select_type') {
                    // let 声明的变量不能与antd的选择一样
                    let SelectVal = <Form.Item label={label} key={ele.field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Select style={{ width: ele.width }}  >
                                    {/* <Option value="1">全部</Option>
                                    <Option value="2">北京市</Option>
                                    <Option value="3">天津市</Option>
                                    <Option value="4">深圳市</Option> */}
                                    {Utils.getOptionList(ele.value)}
                                </Select>
                            )
                        }
                    </Form.Item>
                    listArr.push(SelectVal)
                } else if (type == 'Input_type') {
                    let InputVal = <Form.Item label={label} key={ele.field}  >
                        {
                            getFieldDecorator(field, {
                                initialValue: ''
                            })(
                                <Input style={{ width: width }} />
                            )
                        }
                    </Form.Item>
                    listArr.push(InputVal)
                } else if (type == 'RangePicker_type') {
                    const dateFormat = ele.dateFormat || 'YYYY/MM/DD';
                    const initialValue = [ele.startTime,ele.endTime]
                    let RangePickerVal = <Form.Item label={label} key={ele.field} >
                        {getFieldDecorator(field, {
                            initialValue:  ele.startTime && ele.endTime ? [moment(ele.startTime,dateFormat),moment(ele.endTime)] :null
                        })(
                            <RangePicker
                                format={dateFormat}
                            />
                        )
                        }
                    </Form.Item>
                    listArr.push(RangePickerVal)
                } else if (type == "DatePicker_type"){
                    const dateFormat = ele.dateFormat || 'YYYY/MM/DD';
                    let DatePickerVal = <Form.Item label={label} key={ele.field} >
                        {getFieldDecorator(field, {
                            initialValue:  null
                        })(
                            <DatePicker format={dateFormat} />
                        )
                        }
                    </Form.Item>
                    listArr.push(DatePickerVal)
                }
            })
        }
        return listArr
    }
    searchFormVal = () =>{
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log(values);
                if(values && values.order_time.length >0){
                    moment(values.order_time[0])
                    values.startTime = moment(values.order_time[0]).format("YYYY年MM月DD日")
                    values.endTime = moment(values.order_time[1]).format("YYYY年MM月DD日")
                }
                this.props.searchVal(values)
            }
        })
    }

    render() {
        return (
            <div>
                <Form layout="inline">
                    {this.initFormList()}
                    <Form.Item >
                        <Button type="primary"  onClick={this.searchFormVal}>查询</Button>
                        <Button type="primary" style={{ marginLeft: 30 }}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


export default Form.create({})(BaseForm)