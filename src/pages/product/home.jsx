import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'
import { ArrowRightOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { PAGE_SIZE } from '../../utils/constants'
import { reqSearchProducts, reqProducts, reqUpdateCategory, reqUpdateProductStatus } from '../../api'
//需要在一行引入，两个封装的ajax请求不是默认暴露
import LinkButton from '../../components/header/link-button'

const Option = Select.Option//提供简写
export default class ProductHome extends Component {

    state = {
        total: 0,
        products: [],
        loading: false,
        searchType: 'productName', // 搜索类型 productName（默认）/ productDesc
        searchName: '',
    }
    updateProductStatus = async (productId, status) => {
        const result = await reqUpdateProductStatus(productId, status)
        if (result.status === 0) {
            console.log(result.status)
            message.success('状态更新成功！')
            this.getProducts(this.pageNum || 1)
        }
    }
    /*初始化生成 Tabe 所有列的数组
*/
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => <span>¥{price}</span>//带人民币符号，写回调函数
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status, product) => { // 1: 在售, 2: 已下架
                    let btnText = '下架'
                    let statusText = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        statusText = '已下架'
                    }
                    status = status === 1 ? 2 : 1//实现切换
                    return (
                        <span>
                            {/* <Button type='primary' onClick={() =>
                                this.updateProductStatus(product._id, status)}>{btnText}</Button> */}
                            <Button type='primary' onClick={() => this.updateProductStatus(product._id, status)}>{btnText}</Button>
                            <span>{statusText}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail',
                            product)}>详情</LinkButton>
                        &nbsp;&nbsp;&nbsp;
                        <LinkButton onClick={() => this.props.history.push('/product/addupdate',
                            product)}>修改</LinkButton>
                    </span>
                )
            },
        ]
    }
    getProducts = async (pageNum) => {
        this.pageNum = pageNum
        const { searchType, searchName } = this.state
        let result
        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list

            })
            console.log(result)
        }
    }


    componentDidMount() {
        this.initColumns()
        this.getProducts(1)
    }

    render() {

        const { searchType, products, total } = this.state

        // const dataSource = [
        //     {
        //         key: '1',
        //         name: '胡彦斌',
        //         age: 32,
        //         address: '西湖区湖底公园1号',
        //     },
        //     {
        //         key: '2',
        //         name: '胡彦祖',
        //         age: 42,
        //         address: '西湖区湖底公园1号',
        //     },
        // ];


        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({ searchType: value })} >
                    <Option key='productName' value='productName' > 按名称搜索</Option>
                    <Option key='productDesc' value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} onChange={(e) => this.setState({ searchName: e.target.value })} />
                <Button type='primary' onClick={() => this.getProducts(1)}><SearchOutlined />搜索</Button>
            </span>
        )

        const extra = (

            <Button type='primary' onClick={() => {
                this.props.history.push('/product/addupdate')
                console.log(this)
            }}> <PlusOutlined />添加商品</Button>
        )

        return (


            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: (pageNum) => this.getProducts(pageNum)
                    }}
                >

                </Table>
            </Card>
        )
    }
}
