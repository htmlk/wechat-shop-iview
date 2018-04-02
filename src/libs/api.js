import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie';
// import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
    // NProgress.start()
    
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    return response
    // NProgress.done()
    // console.log(response)
    // if (response.status === 200 || response.status === 304) {
    //     return response
    // }
    // return {
    //     data: {
    //         code: -404,
    //         message: '请求错误',
    //         data: response.statusText,
    //     }
    // }
}

function checkCode(res) {
    // if (res.data.code !== 200) {
    //     console.log(res.data.message)
    //    // alert(res.data.message)
    // }
    return res
}

export default {

    otherPost(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            } 

        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Nideshop-Token':Cookies.get('token')
            } 

        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Nideshop-Token':Cookies.get('token'),
                
            }
        }).then(checkStatus).then(checkCode)
    }
}