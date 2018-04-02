<template>
    <div>
        <Upload multiple type="drag" :headers='headers' :action="uploadurl" name="goods_Pic" :on-success="handleSuccess">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>
        <div v-for="item in imgdata">
            <img width="50" :src="item" alt=""> {{item}}
        </div>
    </div>
</template>
<script>
import util from '../../libs/util.js'
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            headers: {},
            imgdata: [],
            uploadurl: util.baseUrl + '/upload/goodsPic'
        }

    },
    methods: {
        handleSuccess(res, file) {
            console.log(res, file)
            this.imgdata.push(res.data.fileUrl)
        }
    },
    created() {
        this.headers['X-Nideshop-Token'] = Cookies.get('token')

    }
}
</script>