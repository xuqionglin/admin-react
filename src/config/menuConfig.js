import { DesktopOutlined } from '@ant-design/icons'
const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的 path
        icon: <DesktopOutlined />, // 图标名称
        //icon={}
    },
    {
        title: '商品',
        key: '/products',
        icon: <DesktopOutlined />,
        children: [ // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: <DesktopOutlined />,
            },
            {
                title: '商品管理',
                key: '/product',
                icon: <DesktopOutlined />,
            },
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <DesktopOutlined />,
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <DesktopOutlined />,
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: <DesktopOutlined />,
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: <DesktopOutlined />,
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: <DesktopOutlined />,
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: <DesktopOutlined />,
            },
        ]
    },
]
export default menuList