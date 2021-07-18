import React, { Component } from 'react'
import LinkButton from '../../components/header/link-button'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMAGE_PATH } from '../../utils/constants'
import { reqCategory } from '../../api'
export default class ProductDetail extends Component {
    state = {
        cName1: '',//一级分类名称
        cName2: ''//二级分类名称
    }
    getCategoryName = async () => {
        console.log(this.props)

        const { categoryId, pCategoryId } = this.props.location.state
        if (pCategoryId === '0') {
            const result = await reqCategory(categoryId)
            const cName1 = result.data.name
            this.setState({ cName1 })
            console.log('1111' + result)
        } else {
            const results = await Promise.all([reqCategory(pCategoryId),
            reqCategory(categoryId)])

            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({ cName1, cName2 })
        }
    }
    componentDidMount() {
        this.getCategoryName()
    }

    render() {
        const { name, desc, price, imgs, detail } = this.props.location.state
        const { cName1, cName2 } = this.state
        const imgstyle = { width: 150, height: 150, marginRight: 10, border: '1px solid black' }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ fontSize: 20 }} />
                </LinkButton>
                &nbsp;&nbsp;商品详情
            </span>
        )

        return (
            <Card className='product-detail' title={title}>
                <List >
                    <List.Item className="flex-left">
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item className="flex-left">
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </List.Item>

                    <List.Item className="flex-left">
                        <span className="left">商品价格:</span>
                        <span>{price + "元"}</span>
                    </List.Item>

                    <List.Item className="flex-left">
                        <span className="left">所属分类:</span>
                        <span>{cName1 + (cName2 ? '-->' + cName2 : '')}</span>
                    </List.Item>

                    <List.Item className="flex-left">
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img src={BASE_IMAGE_PATH + img} alt="" key={img} style={imgstyle} />
                                ))
                            }
                        </span>
                    </List.Item>

                    <List.Item className="flex-left">
                        <span className="left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{ __html: detail }}></div>
                    </List.Item>

                </List>
            </Card>
        )
    }
}
