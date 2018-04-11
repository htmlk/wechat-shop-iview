<style>
    .div{

    }
</style>
<template>
    <div>
        <Card style="height:650px">
            <p slot="title">用户信息</p>
            <Table border :columns="columns1" :data="data1"></Table>
        </Card>
        <Page :total="totalSize" @on-change="changesize" show-elevator></Page>
    </div>
</template>
<script>
import api from '../../libs/api.js'
import util from '../../libs/util.js'
export default {
    data() {
        return {
            totalSize: 10,

            columns1: [{
                    title: '序号',
                    type: 'index',
                    width :'80'
                }, {
                    title: '用户id',
                    key: 'id',
                    width :'80'
                },
                {
                    title: '用户头像',
                    width :'120',
                    key: 'avatar',

                    render:function(h, params) {
                        return h('img',{
                            attrs:{
                                'src':this.row.avatar,
                                'width':'40px',
                                'style':' border-radius: 50%'
                            }})
                        }
                },
               
                {
                    title: '性别',
                    key: 'gender',
                     width :'80',
                    render: function(h, params) {
                        return h('div', this.row.gender == '1' ? '男' : '女')
                    }
                }, {
                    title: '微信名',
                    key: 'nickname'
                }, {
                    title: '微信openid',
                    key: 'weixin_openid'
                },{
                    title: '手机型号',
                    key: 'weixin_model',
                   
                },{
                    title: '手机系统',
                    key: 'weixin_system',
                   
                },{
                    title: '微信版本',
                    key: 'weixin_version',
                   
                },{
                    title: '小程序版本',
                    key: 'weixin_SDKVersion',
                   
                },{
                    title: '国籍语音',
                    key: 'weixin_language',
                   
                },{
                    title: '注册时间',
                    key: '  register_time',
                    render: function(h, params) {
                        return h('div',
                            new Date(this.row.register_time * 1000).Format('yyyy-MM-dd hh:mm:ss')); /*这里的this.row能够获取当前行的数据*/
                    }
                }, {
                    title: '最近登录时间',
                    key: 'last_login_time',
                    render: function(h, params) {
                        return h('div',
                            new Date(this.row.last_login_time * 1000).Format('yyyy-MM-dd hh:mm:ss')); /*这里的this.row能够获取当前行的数据*/
                    },
                      sortable: true
                }

            ],
            data1: []
        }
    },
    created() {
        this.fetchData(10, 1, '')
        this.initFormatter(); // 为Date 对象添加Format方法 
    },
    methods: {
        formatDate(timestramp) {
            return new Date(timestramp).Format('yyyy-MM-dd');
        },
        initFormatter() {
            Date.prototype.Format = function(fmt) { //  
                let o = {
                    "M+": this.getMonth() + 1, //月份    
                    "d+": this.getDate(), //日    
                    "h+": this.getHours(), //小时    
                    "m+": this.getMinutes(), //分    
                    "s+": this.getSeconds(), //秒    
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度    
                    "S": this.getMilliseconds() //毫秒    
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
        changesize(e) {
            console.log(e)
            this.fetchData(10, e, '')
        },
        fetchData(size, page, name) {
            var data = {
                size: size,
                page: page,
                name: name
            }
            var _that = this
            var url = util.baseUrl + '/user/index'
            api.get(url, data).then(function(res) {
                console.log(res)
                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data.data

            })
        }
    }
}
</script>