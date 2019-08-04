import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,ContentState,convertToRaw } from 'draft-js';
import draftjs from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich.less'

export default class Rich extends Component {

    constructor(){
        super()
        this.state = {
            editorState: EditorState.createEmpty(),
            editorContent: ``,
        }
    }

    componentDidMount(){
        //测试回显
        let huixiandata = `<p></p>
        <img src="http://img4.imgtn.bdimg.com/it/u=508387608,2848974022&fm=26&gp=0.jpg" alt="undefined" style="float:left;height: auto;width: auto"/>+
        <p>11111111</p>`
        let contentBlock = htmlToDraft(huixiandata)
        console.log(contentBlock);
        if(contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState })
        }
    }

    //contentState：以受控方式更新编辑器状态的属性。
    //onContentStateChange：每次编辑器状态发生变化时调用函数，传递的函数参数是RawDraftContentState类型的  对象。
    onEditorChange = (editorContent) =>{
        console.log(editorContent,111);
        this.setState({
            editorContent,
        });
        
    }

    //每次编辑器状态发生变化时调用函数 
    onEditorStateChange = (editorState) =>{
        console.log(editorState,222);
        this.setState({
            editorState,
          });
    }


    handleGetText = () =>{
        const {editorContent,editorState} = this.state
        //获取html数据
        console.log(draftjs(editorContent));     
    }

    render() {
        const {editorState,editorContent} = this.state
        return (
            <div>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器" style={{ marginTop: 10 }}>
                    <div style={{ minHeight: 300, background: '#fff' }}>
                        <Editor
                            // initialEditorState = {editorState}
                            editorState={editorState}
                            localization={{ locale: 'zh' }}
                            wrapperClassName="wrapperClassName"   
                            onContentStateChange={this.onEditorChange}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                </Card>

            </div>
        )
    }
}