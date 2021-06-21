import React, { Component } from 'react'
import { message } from 'antd'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component {
    handleClick = () => (
        message.success('成功啦。。。')
    )
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </BrowserRouter>

            //<Button type='primary' onClick={this.handleClick}>学习</Button>
        )
    }
}