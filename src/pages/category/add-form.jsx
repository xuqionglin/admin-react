import React, { Component } from 'react'
import {
    Form,
    Select,
    Input,
} from 'antd'
import PropType from 'prop-types'
const Item = Form.Item//提供简写
const Option = Select.Option//提供简写


// 添加分类的form组件
export default class Addform extends Component {
    static propsTypes = {
        categorys: PropType.array.isRequired,//一级分类数组
        parentId: PropType.string.isRequired//父分类ID
    }
    componentDidUpdate() {
        console.log(this.props.parentId)
        this.props.formRef.current.setFieldsValue({
            selectName: this.props.parentId,
        })
    }
    render() {
        const { categorys, parentId } = this.props

        return (

            <Form ref={this.props.formRef}>
                <Item name='selectName' initialValue={parentId}  >
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                        }

                    </Select>
                </Item>
                <Item name='inputName' initialValue='' rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder='请输入分类名称' />
                </Item>
            </Form>
        )
    }
}
