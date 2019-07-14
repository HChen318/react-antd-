import React, { Component } from 'react';
import Child from './Child.jsx'
  
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
        return <div style={style}>
            <p>React生命周期介绍</p>
            {/* 当前this不是指向当前实例,所以得bind绑定 */}
            <button onClick={this.handleClick.bind(this)}>点击一下</button>
            <button onClick={this.handleAdd}>点击一下</button>
            <p>{this.state.count}</p>
            <br />
            <Child name={this.state.count}  />
        </div>
    }
}