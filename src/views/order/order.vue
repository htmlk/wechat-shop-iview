<style>
.div {}
</style>
<template>
    <div>
        <Card style="height:750px">
            <Form ref="indexdata" :model="indexdata" :rules="ruleInline" inline>
                <Form-item prop="orderSn">
                    <Input type="text" v-model="indexdata.orderSn" placeholder="订单号">
                   
                    </Input>
                </Form-item>
                <Form-item prop="consignee">
                    <Input type="text" v-model="indexdata.consignee" placeholder="收货人">
                    
                    </Input>
                </Form-item>

                 <Form-item prop="orderstatus">
                 <Select v-model="indexdata.orderstatus" style="width:200px">
                    <Option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                </Form-item>

                <Form-item prop="consignee">
                    <Date-picker @on-change="handleChange" type="daterange"  format="yyyy-MM-dd HH:mm:ss" :options="options2" placement="bottom-end" placeholder="订单日期" style="width: 300px"></Date-picker>
                </Form-item>


                <Form-item>
                    <Button type="primary" @click="handleSubmit('indexdata')">搜索</Button>
                </Form-item>
            </Form>
            <p slot="title">订单信息</p>
            <p>当前单量：<b style="color: green">{{totalSize}}</b>（单）</p>
            <Table border :columns="columns1" :data="data1"></Table>
        </Card>
        <Page :total="totalSize" :current="current" @on-change="changesize" show-elevator></Page>
        <Modal v-model="modal5" :title="'订单号：'+ordersn" width="800">
            <Table border :columns="columns2" :data="data2"></Table>
            <h3>订单状态：</h3>
            <Radio-group v-model="orderstatus" @on-change="changeorderstatus">
                <Radio label="0">
                    <span>未付款</span>
                </Radio>
                <Radio label="201">
                    <span>已付款</span>
                </Radio>
                <Radio label="300">
                    <span>已经发货</span>
                </Radio>
                <Radio label="301">
                    <span>已完成</span>
                </Radio>
            </Radio-group>
            <Button @click="sendmsg">发货通知</Button>
            <div v-if="orderstatus==300&&orderInfo.express">
                <Timeline>
                    <Timeline-item v-for="item in orderInfo.express.traces">{{item.datetime}}{{item.content}}</Timeline-item>
                </Timeline>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from '../../libs/api.js'
import util from '../../libs/util.js'
const moment = require('moment');
const columns = [{
    title: '序号',
    type: 'index',
    width: '80'
}, {
    title: '订单号',
    key: 'order_sn',
}, {
    title: '下单用户id',
    key: 'user_id',
}, {
    title: '配送地址',
    key: 'address',
}, {
    title: '配送时间',
    key: 'wl_time',
}, {
    title: '手机号',
    key: 'mobile',
}, {
    title: '收货人',
    key: 'consignee',
}, {
    title: '商品价格',
    key: 'actual_price',
}, {
    title: '下单时间',
    key: '  add_time',
    render: function(h, params) {
        return h('div',
            new Date(this.row.add_time * 1000).Format('yyyy-MM-dd hh:mm:ss')); /*这里的this.row能够获取当前行的数据*/
    }
}, {
    title: '订单状态',
    key: 'order_status_text',
    render: function(h, params) {
        return h('Button', {
            props: {
                type: this.row.order_status == '201' ? 'success' : 'error',
                size: 'small'
            },
            on: {
                click: function() {

                }
            }
        }, this.row.order_status_text)
    }
}, {
    title: '查看详情',
    key: 'goods_desc',

}]
export default {
    data() {
        return {
            current:1,
             statusList: [ {
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '未付款'
                    },
                    {
                        value: 201,
                        label: '已付款'
                    },
                    {
                        value: 300,
                        label: '已经发货'
                    },
                    {
                        value: 301,
                        label: '已完成'
                    }
                ],
                model1: '',
             options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
            ruleInline: {
               
            },
            orderstatus: '0',
            totalSize: 10,
            modal5: false,
            columns1: [],
            columns2: [{
                title: '序号',

                type: 'index',
            }, {
                title: '商品id',
                key: 'goods_id',
                width: '120'
            }, {
                title: '商品名称',
                key: 'goods_name',
                width: '250'
            }, {
                title: '商品规格',
                key: 'goods_specifition_name_value',
                width: '100'
            }, {
                title: '商品图片',
                key: 'list_pic_url',
                render: function(h, params) {
                    return h('img', {
                        attrs: {
                            'src': this.row.list_pic_url,
                            'width': '40px'

                        }
                    })
                }
            }, {
                title: '商品价格',
                key: 'retail_price',
            }, {
                title: '数量',
                key: 'number',
            }],
            ordersn: '',
            data1: [],
            data2: [],
            orderInfo: [],
            indexdata: {
                orderstatus:'',
                starttime:'',
                endtime:'',
                orderSn: '',
                consignee: '',
                size: 10,
                page: 1,
                
            }
        }

    },
    created() {
        this.columns1 = columns
        this.showdetail()
        this.fetchData()
        this.initFormatter(); // 为Date 对象添加Format方法 
    },
    methods: {
        handleChange(e){
           console.log(moment(e[0]).format('X'))
           this.indexdata.starttime=moment(e[0]).format('x')/1000
           this.indexdata.endtime=moment(e[1]).format('x')/1000
        },
        handleSubmit(name) {
           this.indexdata.size=10
           this.indexdata.page=1
           this.current=1

             this.fetchData()
               
        },
        sendmsg() {

            var _that = this
            var url = util.baseUrl + '/order/sendmsg?orderId=' + _that.orderInfo.id
            api.get(url).then(function(res) {
                console.log(res)
                if (res.data.errno == 0) {

                }
            })
        },
        changeorderstatus(e) {
            var _that = this
            var url = util.baseUrl + '/order/orderstatus?orderId=' + _that.orderid + '&orderStatus=' + e
            api.get(url).then(function(res) {
                console.log(res)
                if (res.data.errno == 0) {
                    _that.fetchData()
                }
            })
        },
        showdetail() {
            var _that = this
            columns[columns.length - 1].render = function(h, params) {

                return h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                        click: function() {
                            _that.modal5 = true
                            _that.orderinfo(params.row.user_id, params.row.id)
                        }
                    }
                }, '查看')
            }

        },
        orderinfo: function(userId, orderId) {
            var _that = this
            var url = util.baseUrl + '/order/detail?userId=' + userId + '&orderId=' + orderId
            api.get(url).then(function(res) {
                _that.orderid = res.data.data.orderInfo.id
                _that.ordersn = res.data.data.orderInfo.order_sn
                _that.orderstatus = res.data.data.orderInfo.order_status
                _that.data2 = res.data.data.orderGoods
                _that.orderInfo = res.data.data.orderInfo

            })
        },
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
            this.indexdata.page = e
            this.fetchData()
        },
        fetchData() {
            var _that = this
            var url = util.baseUrl + '/order/index'
            api.get(url, _that.indexdata).then(function(res) {

                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data.data

            })
        }
    }
}
</script>