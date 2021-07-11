import { message } from 'antd'
import axios from 'axios'


export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error("请求错误：" + error.message)
        })


    })

}