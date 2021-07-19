import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'





export default class RichTextEditor extends Component {

    static propTypes = {
        detail: PropTypes.string
    }
    constructor(props) {
        super(props)
        const detail = this.props.detail
        let editorState
        if (detail) {
            const contentBlock = htmlToDraft(detail);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            }
        } else {
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState,
        }
    }

    //实时监听输入状态
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ height: 250, border: '1px solid #000' }}
                onEditorStateChange={this.onEditorStateChange}
            />
        );
    }
}



