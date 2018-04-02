<style>

</style>
<template>
    <div>
        <Card style="height:650px">
            <p slot="title">商品信息</p>
            <Table border :columns="columns1" :data="data1"></Table>
             <p type="success" slot="extra">总收入：<b style="color: red">{{daycount}}</b>（元）</p>
        </Card>
        <Page :total="totalSize" show-elevator></Page>
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
                    title: '交易时间',
                    key: 'add_time',
                    render: function(h, params) {
                        return h('div',moment.unix(params.row.add_time).format('YYYY-MM-DD HH:mm:ss') )
                    }
                },{
                    title: '收入',
                    key: 'actual_price'
                }]
export default {
    data() {
        return {
            totalSize: 10,
            daycount:'',
            columns1: columns,
            data1: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
      fetchData(size, page, name) {
            var data = {
                size: size,
                page: page,
                name: name
            }
            var _that = this
            var url = util.baseUrl + '/finance/index'
            api.get(url, data).then(function(res) {
                console.log(res)
                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data.data
                _that.daycount = res.data.data.daycount
                
                console.log(_that.data1)
            })
        }
    }
}
</script>