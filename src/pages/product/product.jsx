import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './product.less'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import { Select } from 'antd'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to={'/product'} />
            </Switch>
        )
    }
}
