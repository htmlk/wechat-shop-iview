<style>
.ivu-modal-confirm img {
    width: 100%;
}

.ivu-modal-confirm-body-icon-confirm {
    display: none;
    width: 0px;
}

.ivu-modal-confirm-body {
    padding: 0!important;
    margin: 0!important;
}
</style>
<template>
    <div>
        <Card style="height:650px">
            <p slot="title">商品信息</p>
            <Button type="success" slot="extra" @click="addgoods">添加商品</Button>
            <Table border :columns="columns1" :data="data1"></Table>
        </Card>
        <Page :total="totalSize" @on-change="changesize" show-elevator></Page>
        <Modal v-model="modal1" title="添加商品" @on-ok="ok" @on-cancel="cancel" width="1200px">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" inline>
                <Card>
                    <Form-item label="ID" prop="id">
                        <Input v-model="formValidate.id" placeholder="请输入ID"></Input>
                    </Form-item>
                    <Form-item label="分类ID" prop="category_id">
                        <Input v-model="formValidate.category_id" placeholder="请输入商品ID"></Input>
                    </Form-item>
                    <Form-item label="商品ID" prop="goods_sn">
                        <Input v-model="formValidate.goods_sn" placeholder="请输入商品ID"></Input>
                    </Form-item>
                    <Form-item label="商品名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入商品名称"></Input>
                    </Form-item>
                    <Form-item label="品牌ID" prop="brand_id">
                        <Input v-model="formValidate.brand_id" placeholder="请输入品牌ID"></Input>
                    </Form-item>
                    <Form-item label="库存" prop="goods_number">
                        <Input v-model="formValidate.goods_number" placeholder="请输入品牌ID"></Input>
                    </Form-item>
                    <Form-item label="主sku" prop="primary_product_id">
                        <Input v-model="formValidate.primary_product_id" placeholder="请输入主sku（product_id）"></Input>
                    </Form-item>
                    <Form-item label="排序" prop="sort_order">
                        <Input v-model="formValidate.sort_order" placeholder="请输入排序(选填)"></Input>
                    </Form-item>
                    <Form-item label="关键词" prop="keywords">
                        <Input v-model="formValidate.keywords" placeholder="请输入关键词"></Input>
                    </Form-item>
                    <Form-item label="属性规格" prop="attribute_category">
                        <Input v-model="formValidate.attribute_category" placeholder="请输入属性规格"></Input>
                    </Form-item>
                    <Form-item label="简介" prop="goods_brief">
                        <Input v-model="formValidate.goods_brief" placeholder="请输入简介"></Input>
                    </Form-item>
                    <Form-item label="销售量" prop="sell_volume">
                        <Input v-model="formValidate.sell_volume" placeholder="销售量"></Input>
                    </Form-item>
                    <Form-item label="推广详情" prop="promotion_desc">
                        <Input v-model="formValidate.promotion_desc" placeholder="推广详情"></Input>
                    </Form-item>
                    <Form-item label="推广标签" prop="promotion_tag">
                        <Input v-model="formValidate.promotion_tag" placeholder="推广标签"></Input>
                    </Form-item>
                      <Form-item label="详情介绍" prop="goods_desc">
                        <Input v-model="formValidate.goods_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入富文本..."></Input>
                    </Form-item>
                </Card>
                <Card>
                    <Form-item label="专柜价格" prop="counter_price">
                        <Input v-model="formValidate.counter_price" placeholder="请输入专柜价格"></Input>
                    </Form-item>
                    <Form-item label="附加价格" prop="extra_price">
                        <Input v-model="formValidate.extra_price" placeholder="请输入附加价格"></Input>
                    </Form-item>
                    <Form-item label="商品单位" prop="goods_unit">
                        <Input v-model="formValidate.goods_unit" placeholder="商品单位"></Input>
                    </Form-item>
                    <Form-item label="销售价格" prop="retail_price">
                        <Input v-model="formValidate.retail_price" placeholder="销售价格"></Input>
                    </Form-item>
                    <Form-item label="单价" prop="unit_price">
                        <Input v-model="formValidate.unit_price" placeholder="单价"></Input>
                    </Form-item>
                    <Form-item label="微信专享价" prop="app_exclusive_price">
                        <Input v-model="formValidate.app_exclusive_price" placeholder="微信专享价"></Input>
                    </Form-item>
                </Card>
                <Card>
                    <Form-item label="商品主图" prop="primary_pic_url">
                        <Upload multiple type="drag" :headers='headers' :action="goodsurl" name="goods_Pic" :on-success="primarySuccess">
                            <div style="padding: 20px">
                                <img v-if="formValidate.primary_pic_url" width="100px" :src="formValidate.primary_pic_url" alt="">
                                <Icon  v-else  type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p v-else >点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </Form-item>
                    <Form-item label="类别主图" prop="list_pic_url">
                         <Upload multiple type="drag" :headers='headers' :action="listurl" name="list_Pic" :on-success="listSuccess">
                            <div style="padding: 20px">
                                <img v-if="formValidate.list_pic_url" width="100px" :src="formValidate.primary_pic_url" alt="">
                                <Icon  v-else  type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p v-else >点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                       
                    </Form-item>
                    <Form-item label="二维码图片" prop="qrcode">
                         <Upload multiple type="drag" :headers='headers' :action="qrcodeurl" name="qrcode_Pic" :on-success="qrcodeSuccess">
                            <div style="padding: 20px ">
                                <img v-if="formValidate.qrcode" width="100px" :src="formValidate.primary_pic_url" alt="">
                                <Icon  v-else  type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p v-else >点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                        
                    </Form-item>
                  
                </Card>
                <Card>
                    <Form-item label="是否最新" prop="is_new">
                        <Radio-group v-model="formValidate.is_new">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="是否上架" prop="is_on_sale">
                        <Radio-group v-model="formValidate.is_on_sale">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="是否删除" prop="is_delete">
                        <Radio-group v-model="formValidate.is_delete">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="是否限购" prop="is_limited">
                        <Radio-group v-model="formValidate.is_limited">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="是否热门" prop="is_hot">
                        <Radio-group v-model="formValidate.is_hot">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="是否微信专属" prop="is_app_exclusive">
                        <Radio-group v-model="formValidate.is_app_exclusive">
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </Radio-group>
                    </Form-item>
                </Card>
            </Form>
        </Modal>
    </div>
</template>
<script>
import api from '../../libs/api.js'
import util from '../../libs/util.js'
import Cookies from 'js-cookie';
const columns = [{
        title: '序号',
        type: 'index',
        width: '80'
    }, {
        title: '商品名字',
        key: 'name'
    }, {
        title: '介绍',
        key: 'goods_brief'
    }, {
        title: '品牌id',
        key: 'brand_id'
    }, {
        title: '分类id',
        key: 'category_id'
    }, {
        title: '商品id',
        key: 'goods_sn'
    }, {
        title: '价格',
        key: 'retail_price'
    }, {
        title: '库存',
        key: 'goods_number'
    }, {
        title: '主图',
        key: 'primary_pic_url',
        render: function(h, params) {
            return h('img', {
                attrs: {
                    'src': this.row.primary_pic_url,
                    'width': '40px'

                }
            })
        }
    }, {
        title: '列表图',
        key: 'list_pic_url',
        render: function(h, params) {
            return h('img', {
                attrs: {
                    'src': this.row.list_pic_url,
                    'width': '40px',
                    'style': ' border-radius: 50%'
                }
            })
        }
    }, {
        title: '商品二维码',
        key: 'qrcode',

    },

    {
        title: '主页显示',
        key: 'is_hot',

    }, {
        title: '是否上架',
        key: 'is_on_sale',

    }, {
        title: '查看详情',
        key: 'goods_desc',

    }
]
export default {
    data() {
        return {
            headers: {},
            goodsurl: util.baseUrl + '/upload/goodsPic',
            listurl: util.baseUrl + '/upload/listPic',
            qrcodeurl: util.baseUrl + '/upload/qrcodePic',
            formValidate: {
                id: "",
                category_id: "",
                goods_sn: "",
                name: "",
                brand_id: "",
                goods_number: "",
                keywords: "",
                goods_brief: "",
                goods_desc: "",
                is_on_sale: "1",
                add_time: "",
                sort_order: "",
                is_delete: "0",
                attribute_category: "",
                counter_price: "",
                extra_price: "",
                is_new: "1",
                goods_unit: "",
                primary_pic_url: "",
                list_pic_url: "",
                retail_price: "",
                sell_volume: "",
                retail_price: "",
                primary_product_id: "",
                unit_price: "",
                promotion_desc: "",
                promotion_tag: "",
                app_exclusive_price: "",
                unit_price: "",
                is_app_exclusive: "1",
                is_limited: "0",
                is_hot: "1",
                qrcode: "",
            },
            ruleValidate: {

            },
            modal1: false,
            totalSize: 10,
            columns1: [],
            _that: this,
            data1: []
        }
    },
    created() {
         this.headers['X-Nideshop-Token'] = Cookies.get('token')
        this.columns1 = columns
        this.showdetail()
        this.onsale()
        this.ishot()
        this.showimg()
        this.fetchData(10, 1, '')

    },
    methods: {
         primarySuccess(res, file) {
            console.log(res, file)
            this.formValidate.primary_pic_url=res.data.fileUrl
        },
        listSuccess(res, file) {
            console.log(res, file)
            this.formValidate.list_pic_url=res.data.fileUrl
        },
         qrcodeSuccess(res, file) {
            console.log(res, file)
            this.formValidate.qrcode=res.data.fileUrl
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        ok() {
            console.log(this.formValidate)
            var url = util.baseUrl + '/goods/add'
            api.post(url, this.formValidate).then(function(res) {
                console.log(res)
            })
            this.$Message.info('确认添加');
        },
        cancel() {
            this.$Message.info('取消添加');
        },
        addgoods() {
            this.modal1 = true
        },
        showimg() {
            var _that = this
            columns[columns.length - 4].render = function(h, params) {
                return h('Button', {
                    props: {
                        type: 'warning',
                        size: 'small'
                    },
                    on: {
                        "click": () => {

                            _that.$Modal.confirm({
                                title: params.row.name,
                                content: '<img src="' + params.row.qrcode + '" width="40px" style=" border-radius: 50%">',
                                okText: '确认',
                                cancelText: '取消'
                            })
                        }
                    }
                }, "查看二维码")

            }
        },
        ishot() {
            var _that = this
            columns[columns.length - 3].render = function(h, params) {

                return h('Button', {
                    props: {
                        type: this.row.is_hot == '1' ? 'success' : 'error',
                        size: 'small'
                    },
                    on: {
                        click: function() {

                            var ishot = params.row.is_hot ? '0' : '1'
                            var url = util.baseUrl + '/goods/updateishot?goodid=' + params.row.id + '&ishot=' + ishot
                            api.get(url).then(function(res) {

                                if (res.data.errno == 0) {
                                    _that.fetchData(10, 1, '')
                                }
                            })


                        }
                    }
                }, this.row.is_hot == '1' ? '显示' : '不显示')

            }
        },
        onsale() {
            var _that = this
            columns[columns.length - 2].render = function(h, params) {

                return h('Button', {
                    props: {
                        type: this.row.is_on_sale == '1' ? 'success' : 'error',
                        size: 'small'
                    },
                    on: {
                        click: function() {

                            var isonsale = params.row.is_on_sale ? '0' : '1'
                            var url = util.baseUrl + '/goods/updateGoods?goodid=' + params.row.id + '&isonsale=' + isonsale
                            api.get(url).then(function(res) {

                                if (res.data.errno == 0) {
                                    _that.fetchData(10, 1, '')
                                }
                            })


                        }
                    }
                }, this.row.is_on_sale == '1' ? '已上架' : '已下架')

            }
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

                            _that.$Modal.confirm({
                                title: '商品详情',
                                content: params.row.goods_desc,
                                width: '400',
                                okText: '确认',
                                cancelText: '取消'
                            });
                        }
                    }
                }, '查看')
            }

        },


        changesize(e) {

            this.fetchData(10, e, '')
        },
        fetchData(size, page, name) {
            var data = {
                size: size,
                page: page,
                name: name
            }
            var _that = this
            var url = util.baseUrl + '/goods/index'
            api.get(url, data).then(function(res) {

                _that.totalSize = res.data.data.count
                _that.data1 = res.data.data.data

            })
        }
    }
}
</script>