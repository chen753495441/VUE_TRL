<template>
    <div>
        <!--整体布局-->
        <van-row>
            <van-col span="6">
                <!--左侧分类菜单-->
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item :title="item.name" v-for="item in menulist" :key="item.id"
                                      @click="setParentId(item.id)"/>
                </van-sidebar>
            </van-col>
            <van-col>
                <van-row :class="['bdbottom',i1===0?'bdtop':'']"  v-for="(items,i1) in productlist" :key="items.id">
                    <!--二级分类-->
                    <van-col>
                        <van-tag type="primary" size="large">
                            {{items.name}}
                        </van-tag>
                        <van-icon name="play" />
                    </van-col>
                    <!--三级分类-->
                    <van-col>
                        <van-row :class="['bdbottom',i2===0?'bdtop':'']" v-for="(itemss,i2) in items.children" :key="itemss.id">
                            <van-col>
                                <van-tag type="warning">
                                    {{itemss.name}}
                                </van-tag>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //左侧分类菜单
                menulist: [],
                activeKey: 0,
                parentId: 1,
                productlist: []
            }
        },
        created() {
            this.getMenuList()
            this.getProductList()
        },
        methods: {
            //获取左侧侧边栏分类
            async getMenuList() {
                const {data: res} = await this.$http.post('product/topcategory.do')
                if (res.status != 200) return this.$message.error('获取左侧分类菜单失败')
                this.menulist = res.data
            },
            //获取右侧二级分类和三级分类
            async getProductList() {
                var params = new FormData();
                params.append('categoryId', this.parentId);
                const {data: res} = await this.$http.post('manage/category/get_deep_category.do', params)
                if (res.status != 200) return this.$message.error('获取右侧分类菜单失败')
                console.log(res)
                this.productlist = res.data[0].children
            },
            //设置当前选中的左侧侧边栏
            async setParentId(parentId) {
                this.parentId = parentId
                var params = new FormData();
                params.append('pid', this.parentId);
                const {data: res} = await this.$http.post('product/topcategory.do', params)
                if (res.status != 200) return this.$message.error('获取右侧分类菜单失败')
                this.productlist = res.data
                this.getProductList()
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    .sidebar{
        height:100%
    }
    .van-tag {
        margin: 15px;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

</style>
