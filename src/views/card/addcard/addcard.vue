<style>
</style>
<template>
    <div>
        <Card style="height:650px">
            <p slot="title">卡券记录</p>
            <Table border :columns="columns1" :data="data1"></Table>
            <p type="success" slot="extra">卡券总数：<b style="color: red">{{totalSize}}</b></p>
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
    title: '卡券名称',
    key: 'base_info.id',
    render: function(h, params) {
        return params.row.base_info.title
    }
}, {
    title: '卡券类型',
    key: 'card_type',
    render: function(h, params) {
        switch (params.row.card_type) {
            case 'GROUPON':
                // statements_1
                return '团购券;'
                break;
            case 'CASH':
                // statements_1
                return '代金券'
                break;
            case 'DISCOUNT':
                // statements_1
                return '折扣券'
                break;
            case 'GIFT':
                // statements_1
                return '兑换券'
                break;
            case 'GENERAL_COUPON':
                // statements_1
                return '优惠券'
                break;
            case 'MEMBER_CARD':
                // statements_1
                return '会员卡'
                break;
            default:
                return '其他'
                break;
        }


    }

}, {
    title: '卡券ID',
    key: 'base_info.id',
    render: function(h, params) {
        return params.row.base_info.id
    }
}, {
    title: '总发放数量',
    key: 'code',
    render: function(h, params) {
        return params.row.base_info.sku.total_quantity
    }
}, {
    title: '剩余数量',
    key: 'code',
    render: function(h, params) {
        return params.row.base_info.sku.quantity
    }
}, {
    title: '创建时间',
    key: 'create_time',
    render: function(h, params) {
        return h('div', moment.unix(params.row.base_info.create_time).format('YYYY-MM-DD HH:mm:ss'))
    }
}, {
    title: '最后更新时间',
    key: 'addtime',
    render: function(h, params) {
        return h('div', moment.unix(params.row.base_info.update_time).format('YYYY-MM-DD HH:mm:ss'))
    }
}, {
    title: '是否能分享',
    key: 'can_share',
    render: function(h, params) {
        return h('Button', {
            props: {
                type: this.row.base_info.can_share? 'success' : 'error',
                size: 'small'
            },
        }, this.row.base_info.can_share? '是' : '否',)
    }
}, {
    title: '是否能给朋友',
    key: 'can_give_friend',
    render: function(h, params) {

        return h('Button', {
            props: {
                type: this.row.base_info.can_give_friend? 'success' : 'error',
                size: 'small'
            },
        }, this.row.base_info.can_give_friend? '是' : '否',)
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
            var url = util.baseUrl + '/card/cardlist'
            api.get(url, data).then(function(res) {
                console.log(res)
                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data


                console.log(_that.data1)
            })
        }
    }
}
</script>