import React, { Component } from 'react'

export default class Role extends Component {
    render() {
        const arr = ["a", "b", "d", "e", "f"];
        const str = [];
        const pageSize = 2;//每页条数
        const pageNum = 2;//第几页
        // const pageTotle = arr.length / pageSize
        let pageBig = (pageNum + 1) * pageSize;
        if (pageBig >= arr.length) {
            pageBig = arr.length
        }
        console.log(pageNum * pageSize)
        console.log(pageBig)
        for (var i = pageNum * pageSize; i < pageBig; i++) {
            str.push(<tr key={i} > <td>{arr[i]}{pageBig}</td> </tr>)
        }
        return (
            <div>
                <table border="1">
                    {str}
                </table>
            </div >
        )
    }
}
