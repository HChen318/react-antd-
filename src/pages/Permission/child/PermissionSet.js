import React, { Component } from 'react';
import { Modal, Form, Input, Tree } from 'antd';
import menuConfig from '../../../config/menuConfig'
const { TreeNode } = Tree;


class PermissionSet extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            checkedKeys:  []
        }
    }

    componentWillReceiveProps(newProps) {
        const {permissionParams} = newProps
        console.log(newProps);
        if(permissionParams.visible && this.props.permissionParams.visible != permissionParams.visible ){
                this.setState({
                    checkedKeys:permissionParams.checkedKeys
                })
        }
    }

    handleCancel = () => {
        this.props.onCancel()
    }

    
    onCheck = (checkedKeys) =>{
        console.log(checkedKeys);
        this.setState({
            checkedKeys
        })
        
    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });



    render() {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 14
            },
        }

        const {checkedKeys } = this.state
        const { permissionParams } = this.props
        console.log(checkedKeys);
        
        return (
            <Modal
                title="用户授权"
                visible={permissionParams.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={800}
            >
                <Form >
                    <Form.Item label="角色名称" {...formItemLayout}>
                        <Input value={permissionParams.name} disabled style={{ width: 300 }} />
                    </Form.Item>
                    <Form.Item tem label="选择用户" {...formItemLayout}>
                        <Tree 
                        checkable
                        defaultExpandAll
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}
                        >
                            {this.renderTreeNodes(menuConfig)}
                        </Tree>
                    </Form.Item>

                </Form>
            </ Modal>
        )
    }

}

export default Form.create({})(PermissionSet)