import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    message,
    Modal
} from 'antd'
import { DesktopOutlined, ArrowRightOutlined } from '@ant-design/icons'
import UpdateForm from './update-form'
import AddForm from './add-form'
import LinkButton from '../../components/header/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from "../../api";
/*分类管理路由组件parentId
*/
export default class Category extends Component {
    state = {
        categorys: [],//一级分类列表  
        subCategorys: [],//二级分类列表 
        loading: false,//是否正在加载数据
        parentId: "0",//当前需要显示的分类列表的父分类ID
        parentName: '',//当前需要显示的分类列表的父分类名称
        showStatus: 0,//标识添加、更新的确认框是否显示，0都不，1添加，2更新
    }
    categoryNameRef = React.createRef();
    //初始化table的所有数组,为第一次render准备数据
    initcolumns = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                width: 300,
                title: '操作',
                //这里的render是antd库 里的
                //生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行 / 列合并
                render: (category) => (
                    <span><LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {/* 如何向事件回调函数中传递参数：先定义一个匿名函数，在该函数中调用处理的函数，并传入数据 */}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                        {/* 此处    */}
                    </span>
                )
            },
        ];
    }
    //异步获取一级/二级分类列表显示
    getCategorys = async (parentId) => {
        //在发请求前，显示loading
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId//这里传了参数，如果传入parentId，用传入的值，若无，从状态中读取
        //发异步ajax请求，获取数据
        const result = await reqCategorys(parentId)
        //在请求结束后，隐藏loading
        this.setState({ loading: false })
        if (result.status === 0) {
            //获取到的数据可能为一级，可能为二级，根据parentId判断
            const categorys = result.data
            if (parentId === '0') {
                this.setState({
                    categorys
                })
            } else {
                this.setState({
                    subCategorys: categorys
                })

            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    //显示一级分类对象的二级分类列表
    showSubCategorys = (category) => {
        //先更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {//setstate中的回调，在状态更新且重新render（）后执行
            //获取二级分类列表并显示
            this.getCategorys()
            //setState不能立即获取最新的状态，因setState是异步更新的
        })
    }
    //更改为显示一级分类列表的状态
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }
    //点击取消，隐藏确认框
    handleCancel = () => {
        //console.log(this.categoryNameRef.current.getFieldsValue())
        this.categoryNameRef.current.resetFields()

        this.setState({
            showStatus: 0
        })


        console.log(this.categoryNameRef)


    }
    //显示添加的确认框
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }
    // 添加分类
    addCategory = () => {

        this.categoryNameRef.current.validateFields(['inputName']).then(async values => {
            //1、隐藏确认框
            this.setState({
                showStatus: 0
            })
            //2、收集数据，并提交请求

            const parentId = this.categoryNameRef.current.getFieldValue("selectName")
            const categoryName = this.categoryNameRef.current.getFieldValue("inputName")

            //console.log(this.categoryNameRef.current.getFieldsValue())
            //console.log(parentId, categoryName)
            //清除输入数据
            this.categoryNameRef.current.resetFields()
            const result = await reqAddCategory(parentId, categoryName)
            console.log(result)
            if (result.status === 0) {
                //判断添加的分类是否是当前所显示的
                if (parentId === this.state.parentId) {
                    this.getCategorys()//重新获取当前分类列表显示
                } else if (parentId === '0') {//解决的是在二级分类列表里，添加一级分类加不上的问题
                    this.getCategorys('0')
                }

            }
        }).catch(errorInfo => {
            console.log(errorInfo)
        })
    }
    //显示更新的确认框
    showUpdate = (category) => {
        //保存分类对象
        this.category = category

        this.setState({
            showStatus: 2
        })
    }
    // 更新分类
    updateCaregory = () => {
        this.categoryNameRef.current.validateFields(['inputName']).then(async values => {
            //1、隐藏确认框
            this.setState({
                showStatus: 0
            })
            //准备数据
            const categoryId = this.category._id
            //console.log(this.categoryNameRef.current.getFieldValue("inputName"))
            const categoryName = this.categoryNameRef.current.getFieldValue("inputName")
            this.categoryNameRef.current.resetFields()

            //2、发送请求更新分类
            const result = await reqUpdateCategory({ categoryId, categoryName })

            if (result.status === 0) {
                //3、重新显示列表
                this.getCategorys()

            }
        })

    }
    componentDidMount() {
        this.initcolumns()
        //执行异步任务，发异步ajax请求
        this.getCategorys()
    }
    render() {
        const { categorys, loading, parentId, parentName, subCategorys, showStatus } = this.state
        const category = this.category || {}//读取，如果无，指定一个空对象
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ margin: '0px 10px' }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (<Button type='primary' onClick={this.showAdd} icon={<DesktopOutlined />}  >添加</Button>)
        return (
            <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    columns={this.columns}
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true, showSizeChanger: true, pageSizeOptions: [1, 5, 10, 20, 50, 100] }}
                />
                <Modal
                    title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm formRef={this.categoryNameRef} categorys={categorys} parentId={parentId} categoryName={category.name} />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updateCaregory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm formRef={this.categoryNameRef} categoryName={category.name} />
                </Modal>
            </Card>
        )
    }
}