import ajax from './ajax'
import jsonp from 'jsonp'

export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')
export const reqAdduser = user => ajax('/manage/user/add', user, 'POST')
export function reqWeather(city) {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4
9MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {
            param: 'callback'
        }, (error, response) => {
            console.log(response)
            if (!error && response.status === 'success') {
                const { dayPictureUrl, weather } = response.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                //alert('获取天气信息失败')
                console.log('获取天气信息失败')
            }
        }
        )
    })
}

// API文档信息如下
// ## 20. 获取天气信息(支持jsonp)
// ### 请求URL：
// http://api.map.baidu.com/telematics/v3/weather

// ### 请求方式：
// GET

// ### 参数类型:
//     | 参数 | 是否必选 | 类型 | 说明
//     | location | Y | string | 城市名称
//     | output | Y | string | 返回数据格式: json
//         | ak | Y | string | 唯一的应用key(3p49MVra6urFRGOT9s8UBWr2)
//http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2

//获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', { parentId })

export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add',
    {
        parentId,
        categoryName
    }, 'POST')

// 更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
    ajax('/manage/category/update', {
        categoryId,
        categoryName
    }, 'POST')

// 根据分类 ID 获取分类，给级联列表用的
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId })
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {
    pageNum,
    pageSize
})
// 根据 ID/Name 搜索产品分页列表
export const reqSearchProducts = ({ pageNum, pageSize, searchType, searchName }) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
})
//更改商品的状态，上架/下架
export const reqUpdateProductStatus = (productId, status) => ajax('./manage/product/updateStatus', {
    productId,
    status
}, 'POST')

