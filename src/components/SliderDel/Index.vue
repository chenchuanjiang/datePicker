<template>
<div class="sliderDelIndex">
    <slider-delete 
        :rate="rate"
        :isAll="isAll" 
        :btns="btns"
        @handleClick="handleClick">
        <div class="item">
            <p>nihaoya</p>
        </div>
    </slider-delete>
</div>
</template>

<script>
import SliderDelete from './SliderDel.vue'
export default {
    name: 'sliderDelIndex',
    data() {
        return {
            btns: [],
            isAll: false,
            rate: 0.2
        }
    },
    components: {
        'slider-delete': SliderDelete
    },
    created () {
    },
    mounted () {
        setTimeout(() => {
            this.btns = [
                {
                    text: '编辑',
                    color: 'red',
                    disabled: false,
                    itemWidth: 60,
                    type: 'edit'
                }, {
                    text: '添加',
                    color: 'blue',
                    disabled: true,
                    itemWidth: 60,
                    type: 'add'
                }, {
                    text: '删除',
                    color: 'green',
                    disabled: false,
                    itemWidth: 60,
                    type: 'del'
                }
            ]
        }, 20);
    },
    methods: {
        handleClick (t) {
            console.log(t);
            // 根据type值来判断需要执行的函数，type值可以自己定义
            // ...
        }
    }
}
</script>

<style lang="stylus" scoped>
    .item
        width 100%
        background-color #666
        p
            line-height 50px
</style>
