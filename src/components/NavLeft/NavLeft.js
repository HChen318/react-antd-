import React, { Component } from 'react';
import menuConfig from '../../config/menuConfig'
import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {menuAction} from '../../react-redux/action/action'
import './navleft.less'
const { SubMenu } = Menu;


 class NavLeft extends Component {
    constructor() {
        super()
        this.state = {
            menuTree: [],
            selectedKeys:[] //当前选中的菜单
        }
    }
    componentWillMount() {
        const menuTree = this.rederMenu(menuConfig)
        this.setState({
            menuTree
        })
    }
    //递归渲染菜单
    rederMenu = (data) => {
        return data.map(ele => {
            if (ele.children) {
                return <SubMenu key={ele.key} title={<span>{ele.title}</span>}>
                    {this.rederMenu(ele.children)}
                </SubMenu>
            }
            return <Menu.Item key={ele.key} title={ele.title} >
                <Link to={ele.key}>{ele.title}</Link>
            </Menu.Item>
        })
    }
    //菜单切换
    menuClick = (item) =>{
        console.log(item);
        let title = item.item.props.title
        let selectedKeys =[item.key]
        //使用react-redux的action方法
        this.props.menuChange(title)
        this.setState({
            selectedKeys
        })
    }
    


    render() {
        const { menuTree,selectedKeys } = this.state
        return (
            <div className="menu-left">
                <Link to="/home">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="" />
                        <h1>CH Learn</h1>
                    </div>
                </Link>
                <Menu theme="dark" selectedKeys={selectedKeys} onClick={this.menuClick}>
                    {menuTree}
                </ Menu >
            </div>
        )
    }
}
//把仓库中的数据映射到props
const mapStateToPros = (state) =>{
    return {

    }
}

//把触发的action动作映射到props
const mapDispatchProps = (dispatch) =>{
    return {
        menuChange(value){
            dispatch(menuAction(value))
        }
    } 
}


export default connect(mapStateToPros,mapDispatchProps)(NavLeft)