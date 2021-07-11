import React, { Component } from 'react'
import LinkButton from './link-button'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api'
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import localstorageUtils from '../../utils/localstorageUtils'
import menuList from '../../config/menuConfig'
import './index.less'

export class Header extends Component {
    state = {
        sysTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }
    getsysTime = () => {

        this.systime = setInterval(() => {
            this.setState({ sysTime: formateDate(Date.now()) })

        }, 1000)
    }
    logout = () => {
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                console.log('确定')
                // 移除保存的 user
                localstorageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到 login
                this.props.history.push('/login')
            },
            onCancel() {
                console.log('取消')
            },
        })
    }
    //     getTitle = (path) => {
    //         let title
    //         memuList.forEach(menu => {
    //             if (menu.key === path) {
    //                 title = menu.tltle
    //             } else if (menu.children) {
    //                 menu.children.forEach(item => {
    //                     if (path.indexOf(item.key) === 0) {
    //                         title = item.tltle
    //                     }
    //                 })
    //             }

    //             )
    //     }
    // return title
    // }
    getTitle = (path) => {
        let title
        menuList.forEach(menu => {
            if (menu.key === path) {
                title = menu.title
            } else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title
                    }
                })
            }
        })
        return title
    }
    componentDidMount() {
        this.getsysTime()
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.systime)
    }
    render() {

        const { sysTime, dayPictureUrl, weather } = this.state
        const path = this.props.location.pathname
        const title = this.getTitle(path)

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {memoryUtils.user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{sysTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}111</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)