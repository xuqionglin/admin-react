import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { message } from 'antd'
import "./login.less"
import icon from "./images/icon.jpg"
import { reqLogin } from "../../api"
import memoryUtils from '../../utils/memoryUtils'
import localstorageUtils from '../../utils/localstorageUtils'
import { Redirect } from 'react-router'

export default class Login extends Component {
    submitHandle = async (value) => {

        const { username, password } = value
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            message.success("登录成功")
            const user = result.data
            memoryUtils.user = user
            localstorageUtils.saveUser(user)
            this.props.history.replace('/')


        } else {
            message.error("登录失败" + result.msg)
        }
        //console.log(result)

        //e.preventDefault()
        // console.log("表单验证成功")
        //function({ values, errorFields, outOfDate })
    }
    submitFailedHandle = (values, err, out) => {
        //if (err) {
        console.log("表单验证失败")
        //}
    }
    validator = (rule, value, callback) => {
        // console.log(rule, value)
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('必须输入密码')
        } else if (length < 4) {
            callback('密码必须大于 4 位')
        } else if (length > 12) {
            callback('密码必须小于 12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用 callback
        }
    }
    render() {
        const user = memoryUtils.user

        if (user._id && user) {
            return <Redirect to="/" />
        }

        return (
            <div className="login">
                <div className="login-header">
                    <img src={icon} alt="login" />
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.submitHandle}
                        onFinishFailed={this.submitFailedHandle}

                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, whitespace: false, message: '必须输入用户名' },
                                { min: 4, message: '用户名必须大于 4 位' },
                                { max: 12, message: '用户名必须小于 12 位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { validator: this.validator }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
        </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
