<template>
    <div class="picker wheel-scroll">
        <div class="bg"></div>
        <div class="piciker-cont">
            <div class="btns">
                <div class="cancel" @click="cancelClick">{{cancelBtnText}}</div>
                <div class="sure" @click="sureClick">{{sureBtnText}}</div>
            </div>
            <div class="picker-contain">
                <div v-for="(k,i) in pickerData" :key="i" class="wheel-cont wheel-scroll" ref="picker">
                    <ul class="wheel-item items">
                        <li v-for="(key,index) in k" :key="index" class="item">{{key}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    data () {
        return {
            canClick: true,
            pickerDom: null,
            BSPicker: null,
            val: [],
            hierarchy: [],
            pickerData: [],
            i: 0
        }
    },
    props: {
        sureBtnText: {
            type: String,
            default: 'sure'
        },
        cancelBtnText: {
            type: String,
            default: 'cancel'
        },
        defaultIndex: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        },
        type: {
            type: String,
            default: 'date'
        }
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.hierarchy = this.defaultIndex;
            this.getHierarchy(this.data, this.hierarchy[this.i] || 0);
            setTimeout(() => {
                this.pickerDom = this.$refs.picker;
                const sun = this.pickerDom.length;
                for (let m = 0; m < sun; m++) {
                    this['BSPicker' + m] = new BScroll(this.pickerDom[m], {
                        wheel: {
                            selectedIndex: this.hierarchy[m],
                            rotate: 33, 
                            adjustTime: 50, 
                            wheelWrapperClass: 'wheel-scroll', 
                            wheelItemClass: 'wheel-item'
                        }
                    });
                    this['BSPicker' + m].on('scrollStart', (pos) => {
                        this.canClick = false;
                    })
                    this['BSPicker' + m].on('scrollEnd', (pos) => {
                        this.updateData(pos, m);
                    });
                }
            }, 20)
        },
        getHierarchy (params, k) {
            let items = [];
            params.forEach(e => {
                items.push(e.text);
            });
            this.pickerData.push(items);
            items = [];
            if (!params[k] || !params[k].subItem) return;
            this.i++;
            if (!this.hierarchy[this.i]) {
                this.hierarchy[this.i] = 0;
            } else {
                if (params[k].subItem.length < this.hierarchy[this.i]) {
                    this.hierarchy[this.i] = params[k].subItem.length;
                }
            }
            return this.getHierarchy(params[k].subItem, this.hierarchy[this.i]);
        },
        sureClick() {
            if (!this.canClick) return;
            let texts = [];
            for (let m = 0; m < this.hierarchy.length; m++) {
                texts.push(this.pickerData[m][this.hierarchy[m]]);
            }
            this.$emit('sureClick', this.hierarchy, texts);
        },
        cancelClick() {
            this.$emit('cancelClick');
        },
        updateData (pos, m) {
            this.hierarchy[m] = Math.abs(pos.y/30);
            if (this.pickerData[m+1]) {
                let upadteItems = [];
                for (let k = m + 1; k < this.hierarchy.length; k++) {
                    this.hierarchy[k] = 0;
                    this['BSPicker' + k].scrollTo(0, 0, 30, 'bounce');
                }
                this.i = 0;
                this.pickerData = [];
                this.getHierarchy(this.data, this.hierarchy[this.i]);
                setTimeout(() => {
                    this.canClick = true;
                }, 20)
            } else {
                this.canClick = true;
            }
        }
    },
    watch: {
        data: {
            handler: 'init',
            deep: true
        }
    },
    beforeDestroy () {
        console.log('in');
        this.BSPicker = null;
    }
}
</script>

<style lang="stylus" scoped>
    cssStyle()
        z-index 1
        position absolute
        left 50%
        width 60%
        height 40%
        transform translateX(-50%)
        -webkit-transform translateX(-50%)
        content ''
    .picker
        position fixed
        top 0
        left 0
        width 100%
        height 100%
    .bg
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        background-color rgba(0, 0, 0, .6)
    .piciker-cont
        position absolute
        bottom 0
        left 0
        width 100%
        background-color #fff
    .wheel-cont
        position relative
        width 100%
        height 150px
        overflow hidden
        padding-top 60px
        background-color #fff
        &::before
            top 0
            cssStyle()
            border-bottom 1px solid #ddd
            background -webkit-gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 1)),to(rgba(255, 255, 255, 0.3)))
            background -moz-gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 1)),to(rgba(255, 255, 255, 0.3)))
            background gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 1)),to(rgba(255, 255, 255, 0.3)))
        &::after
            bottom 0
            cssStyle()
            border-top 1px solid #ddd
            background -webkit-gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 0.3)),to(rgba(255, 255, 255, 1)))
            background -moz-gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 0.3)),to(rgba(255, 255, 255, 1)))
            background gradient(linear,0 0,0 100%,from(rgba(255, 255, 255, 0.3)),to(rgba(255, 255, 255, 1)))
    .item
        width 100%
        height 30px
        text-align center
        line-height 30px
    .btns
        position relative
        width 100%
        height 40px
        border-bottom 1px solid #ddd
        background-color #fff
        div
            position absolute
            top 0
            width 60px
            font-size 16px
            text-align center
            line-height 40px
            cursor pointer
            &.sure
                right 0
                color cornflowerblue
            &.cancel
                left 0
                color #a0a0a0
    .picker-contain
        display flex
        display -webkit-flex
        > div {
            flex-grow 1
        }
</style>

