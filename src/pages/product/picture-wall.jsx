import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { Upload, Icon, Modal, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BASE_IMAGE_PATH } from '../../utils/constants'
//import ImgCrop from 'antd-img-crop';
import { reqDeleteImg } from '../../api'

/* export default class PictureWall extends Component {

    render() {
        const fileList = ''

        state = {
            previewVisible: false,
            previewImage: '',
            fileList:fileList
        }
        
        return (

            <Upload
                action="./manege/img/upload"
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onChange={this.onChange}//上传文件时改变的状态
                onPreview={this.onPreview}//点击预览时的回调
            >{fileList.length < 5 && '+ Upload'}
                <div> <ArrowLeftOutlined /> 上传图片</div>
            </Upload>


        )
    }
}
 */
import { Upload, Icon, Modal, message } from 'antd';

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     });
// }

export default class PicturesWall extends Component {
    static propTypes = {
        imgs: PropTypes.array
    }
    constructor(props) {
        super(props)
        let fileList = []
        const imgs = this.props.imgs
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMAGE_PATH + img,
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: fileList
        };
    }



    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {


        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    getImgs = () => this.state.fileList.map(file => file.name)

    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            const result = file.response
            if (result.status === 0) {
                message.success('上传成功了')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error('上传失败了')
            }
        } else if (file.status === 'removed') {
            const result = await reqDeleteImg(file.name)
            console.log(file.name)
            if (result.status === 0) {
                message.success('删除照片成功')
            } else {
                message.error('删除照片失败')
            }
        }

        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div> <ArrowLeftOutlined /> <div>上传图片</div></div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}

                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" src={previewImage} style={{ width: '100%' }} />
                </Modal>
            </div>
        )
    }
}