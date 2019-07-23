import React, { Component } from 'react';
import { Tabs, Icon, Card } from 'antd'
import './ui.less'
const { TabPane } = Tabs;




export default class TabsUse extends Component {
   
    constructor() {
        super()
        this.index = 0 ;
        this.state = {
            TabsArr: [],
            activeKey:"1"
        }
    }


    componentWillMount() {
        const TabsArr = [
            { key: 1, title: "tab1" },
            { key: 2, title: "tab2" },
            { key: 3, title: "tab3" },
        ]
        this.setState({
            TabsArr
        })
    }


    onEdit = (targetKey, action) => {
        // console.log(targetKey,action);
        this[action](targetKey);
    };

    TabChange =(activeKey) =>{
        this.setState({
            activeKey
        })
    }

    add =() =>{
       const {TabsArr} = this.state
        const activeKey = `tabs${this.index++}`
        TabsArr.push({key:activeKey,title:activeKey})
        this.setState({
            TabsArr
        })
    }

    remove =(target) =>{
        let {TabsArr,activeKey} = this.state
        let index;
        TabsArr.forEach((ele,i) =>{
            if(ele.key == target){
                index = i - 1
            }
        })

        let NewArr = TabsArr.filter(ele => ele.key != target)

        if(target == activeKey) {
            if(index >= 0){
                activeKey = NewArr[index].key
            }else {
                activeKey = NewArr[0].key
            }
            
        }

        this.setState({
            TabsArr:NewArr,
            activeKey:activeKey+''
        })
        
    }
    



    render() {
        const { TabsArr } = this.state
        return (
            <div>
                <Card title="tabs" className="card-wrap">
                    <Tabs defaultActiveKey="1">
                        <TabPane key="1" tab={<span><Icon type="plus" />Tab1</span>}>
                            1
                        </TabPane>
                        <TabPane key="2" tab={<span><Icon type="edit" />Tab2</span>}>
                            2
                        </TabPane>
                        <TabPane key="3" tab={<span><Icon type="delete" />Tab3</span>}>
                            3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="tabs" className="card-wrap" >
                    <Tabs defaultActiveKey="1" 
                    type="editable-card" 
                    onChange={this.TabChange}
                    activeKey={this.state.activeKey}
                    onEdit={this.onEdit}>
                        {TabsArr.map(ele => {
                            return <TabPane key={ele.key} tab={ele.title} >
                                {ele.title}
                            </TabPane>
                        })}
                    </Tabs>
                </Card>
            </div>
        )
    }



}