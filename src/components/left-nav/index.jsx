import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import logo from '../../assets/images/logo.png'
import menuConfig from '../../config/menuConfig'
import './index.less'

export class LeftNav extends Component {

    getMenuNode2 = (menulist) => {
        const path = this.props.location.pathname//withRouter，获取当前的path
        return menulist.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}  >
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item >//菜单项，末级
                )
            } else {
                if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
                    this.openkey = item.key
                }//判断选中的路由path是否为子集，如果是，保持打开
                return (
                    <Menu.SubMenu  //下拉菜单
                        key={item.key}
                        icon={item.icon} //在menu.Config页分别引入
                        title={
                            <span>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNode2(item.children)}{/*递归遍历子集*/}

                    </Menu.SubMenu>
                )
            }
        }
        )
    }
    render() {
        this.menuNodes = this.getMenuNode2(menuConfig)
        const path = this.props.location.pathname
        const OpenKeys = this.openkey
        return (
            <div className="left-nav">
                <Link to='/home' className='logo-link'>
                    <img src={logo} alt="logo" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={[path]}//设置默认选中项与当前路由path一致
                    defaultOpenKeys={[OpenKeys]}//当前菜单项选中时，打开
                    mode="inline"
                    theme="dark"
                >{
                        this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}
export default withRouter(LeftNav)