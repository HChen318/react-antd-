import React, { Component } from 'react';
import Child from './Child.jsx'
import {Button} from 'antd'
// import 'antd/dist/antd.css';
import './life.less'
  
export default class Life extends Component {
    constructor(){
        super()
        this.state = {
            count:10
        }
    }

    handleClick () {
        //通过bind传递进去后this才是组件的实例
        this.setState({ 
            count:this.state.count+1
        })
    }
     

    handleAdd = () =>{
        console.log(111); 
    }

    render() {
        let style = {padding:50}
        return <div className="box">
            <p>React生命周期介绍</p>
            {/* 当前this不是指向当前实例,所以得bind绑定 */}
            <Button onClick={this.handleClick.bind(this)}>点击一下</Button>
            <Button onClick={this.handleAdd}>点击一下</Button>
            <Button type="primary">1111</Button>
            <p>{this.state.count}</p>
            <br />
            <div className="aa">
                121212
                <p>30</p>
            </div>
            <Child name={this.state.count}  />
        </div>
    }
}