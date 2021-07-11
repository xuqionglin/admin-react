import React, { Component } from 'react'
import {
    Form,
    Input,
} from 'antd'
import PropType from 'prop-types'
import Category from './category'

const Item = Form.Item//提供简写
export default class Updateform extends Component {
    static propTypes = {
        categoryName: PropType.string.isRequired
    }
    componentDidUpdate() {
        console.log(this.props.categoryName)
        this.props.formRef.current.setFieldsValue({
            inputName: this.props.categoryName,
        })
    }

    // getItemsValue = () => {    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    //     const valus = this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    //     return valus;
    // }
    render() {

        const { categoryName } = this.props


        return (
            <Form ref={this.props.formRef}>
                <Item name='inputName' initialValue={categoryName} rules={[{ required: true, message: '分类名称必须输入' }]}>
                    <Input placeholder='请输入分类名称' />
                </Item>
            </Form>
        )
    }
}
