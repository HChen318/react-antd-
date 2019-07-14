import React, { Component } from 'react';

  
export default class Child extends Component {
    constructor(){
        super()
        this.state = {
            count:10
        }
    }
    componentWillMount(){
        console.log('will mount');  
    }
    componentDidMount(){
        console.log('did mount');  
    }

    componentWillReceiveProps(newProps){
        console.log('will props',newProps);
        
    }

    shouldComponentUpdate(){
        console.log('should update');
        return true
    }

    componentWillUpdate(){
        console.log('will update');
    }
    componentDidUpdate(){
        console.log('did update');
    }


    render(){
        console.log('render');
        
      return <div>
            <p>这里是是组件</p>
            <p>{this.props.name}</p>
        </div>
    }
}