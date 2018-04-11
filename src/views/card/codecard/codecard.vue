<style>

</style>
<template>
    <div>
        <Card style="height:650px">
            <p slot="title">核销记录</p>
            <Table border :columns="columns1" :data="data1"></Table>
             <p type="success" slot="extra">核销总数：<b style="color: red">{{totalSize}}</b></p>
        </Card>
        <Page :total="totalSize" show-elevator></Page>
    </div>
</template>
<script>
import api from '../../../libs/api.js'
import util from '../../../libs/util.js'
const moment = require('moment');
const columns = [{
                    title: '序号',
                    type: 'index',
                    width: '80'
                }, {
                     title: 'openID',
                    key: 'open_id',

                },{
                    title: '卡号ID',
                    key: 'card_id'
                },{
                    title: '用户卡号',
                    key: 'code'
                }, {
                    title: '核销时间',
                    key: 'addtime',
                    render: function(h, params) {
                        return h('div',moment.unix(params.row.addtime/1000).format('YYYY-MM-DD HH:mm:ss') )
                    }
                }]
export default {
    data() {
        return {
            totalSize: 10,
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
            var url = util.baseUrl + '/card/list'
            api.get(url, data).then(function(res) {
                console.log(res)
                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data.data
               
                
                console.log(_that.data1)
            })
        }
    }
}
</script>