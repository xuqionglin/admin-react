import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Button,
    Cascader,
} from 'antd'
import LinkButton from '../../components/header/link-button'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { reqCategory, reqCategorys } from '../../api'
const { Item } = Form

export default class ProductAddUpdate extends Component {
    state = {
        options: []
    }
    product = this.props.location.state
    //二级级联列表懒加载
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            const cOptions = subCategorys.map(c => ({
                value: c._id,
                babel: c.name,
                isLeaf: true,
            }))
            targetOption.children = cOptions
        } else {
            targetOption.isLeaf = true
        }


        this.setState({
            options: [...this.state.options]

        })
    }
    //级联列表初始化
    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeft: false,
        }))
        const { product, isUpdate } = this
        console.log(categorys)
        if (isUpdate && product.pCategoryId !== '0') {
            const subCategorys = await this.getCategorys(product.pCategoryId)
            console.log(subCategorys)
            if (subCategorys && subCategorys.length > 0) {
                const cOptions = subCategorys.map(c => ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true,
                }))
                //options一级列表===产品的父类ID
                const targetOption = options.find(option => option.value === product.pCategoryId)
                targetOption.children = cOptions
            }
        }
        console.log(categorys)
        this.setState({
            options
        })
    }
    //获取级联列表，一级/二级
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                return categorys
            }
        }
    }
    //自定义验证，价格>0
    validator = (rule, value, callback) => {
        value = value * 1
        if (value > 0) {
            callback()
        } else {
            callback('价格必须是大于 0 的数值')
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.getCategorys('0')
    }
    render() {
        this.isUpdate = !!this.product//强制转换为布尔类型，根据product是否为undefined
        this.product = this.product || {}//如果product未定义，初始化为{}
        const { product, isUpdate } = this//解构赋值，从this中取出~
        const { pCategoryId, categoryId } = product
        const { options } = this.state

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ fontSize: 20 }} />
                </LinkButton>
                &nbsp;&nbsp;
                {isUpdate ? '修改商品' : '添加商品'}
            </span>
        )

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        }
        //设置修改页面分类初始值
        const categoryIds = []
        if (isUpdate) {

            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)

            }
        }

        return (
            <Card title={title}>
                <Form>
                    <Item label="商品名称" {...formItemLayout} name='name' initialValue={product.name}
                        rules={[{ required: true, message: '商品名称必须输入' }]}>
                        <Input placehoder='请输入商品名称' />
                    </Item>
                    <Item label="商品描述" {...formItemLayout} name='desc' initialValue={product.desc}
                        rules={[{ required: true, message: '商品描述必须输入' }]}>
                        <Input.TextArea placehoder='请输入商品描述' autoSize />
                    </Item>
                    <Item label="商品价格" {...formItemLayout} name='price' initialValue={product.price}
                        rules={[{ required: true, message: '商品价格必须输入' }, { validator: this.validator }]}>
                        <Input type='number' placehoder='请输入商品价格' addonAfter='元' />
                    </Item>
                    <Item label="商品分类" {...formItemLayout} name='categoryIds' initialValue={categoryIds}
                        rules={[{ required: true, message: '商品分类必须输入' }]}>
                        <Cascader options={options} loadData={this.loadData} />
                    </Item>
                    <Item label="商品图片" {...formItemLayout}>
                        {/* <Input  placehoder='请输入商品价格'  /> */}
                    </Item>
                    <Item label="商品详情" {...formItemLayout}>
                        {/* <Input  placehoder='请输入商品价格' /> */}
                    </Item>
                    <Button type='primary' onClick={() => alert(1)}>提交</Button>
                </Form>
            </Card>
        )
    }
}
