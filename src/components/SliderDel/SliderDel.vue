<template>
    <div v-show="btns.length" class="sliderToDel" ref="slideCont" @touchstart="getItem" @touchmove="moveItem" @touchend="endMove">
        <div class="item-cont">
            <slot></slot>
        </div>
        <ul v-if="btns.length" class="item-delBtn" :style="style" ref="sliderBtns">
            <li class="btn-item" :class="{disable: !!key.disabled}" v-for="(key, index) in btns" @click="handleClick(index)" :key="index" :style="{'background-color': btns[index].color ? btns[index].color : '#f0f0f0', 'width': (btns[index].itemWidth ? btns[index].itemWidth : 60) + 'px'}">
                <span>{{ key.text || '删除' }}</span>
            </li>
        </ul>
        <!-- <div v-else class="no-item"></div> -->
    </div>
</template>

<script>
export default {
    name: 'SliderDel',
    data () {
        return {
            isOut: false,
            x: 0,
            offsetVal: 0,
            timer: null,
            style: {},
            isLeft: true,
            moveItemNode: null,
            allWidth: 0
        }
    },
    props: {
        rate: {
            type: Number,
            default: 0.5
        },
        isAll: {
            type: Boolean,
            default: 'true'
        },
        btns: {
            type: Array,
            default: []
        }
    },
    created () {
        // if (this.btns.length) {
        //     this.initParam();
        // }
        this.initParam();
    },
    mounted() {
        // if (this.btns.length && this.isAll) {
        //     this.moveItemNode = this.$refs.slideCont;
        // } else {
        //     this.moveItemNode = this.$refs.sliderBtns;
        // }
        this.initDom();
    },
    watch: {
        btns: {
            handler: 'init',
            deep: true
        }
    },
    methods: {
        init () {
            this.initParam();
            this.initDom();
        },
        initParam () {
            this.btns.forEach(element => {
                this.allWidth += element.itemWidth ? element.itemWidth : 60;
            });
            this.style = {
                'width': this.allWidth + 'px'
            }
        },
        initDom () {
            if (!this.btns.length) return;
            setTimeout(() => {
                if (this.isAll) {
                    this.moveItemNode = this.$refs.slideCont;
                } else {
                    this.moveItemNode = this.$refs.sliderBtns;
                }
            }, 20);
        },
        getItem (e) {
            if (!this.btns.length) return;
            const t = e.targer || window.event.srcElement
            const m = e.touches[0]
            this.isOut = false
            this.x = m.clientX
        },
        moveItem (e) {
            if (!this.btns.length) return;
            if (this.isOut) return;
            const t = e.target || window.event.srcElement
            const m = e.touches[0];
            if (this.isChild(t, 'sliderToDel')) {
                this.offsetVal += (this.x - 0) - (m.clientX - 0);
                if (this.offsetVal > this.allWidth) {
                    this.offsetVal = this.allWidth
                } else if (this.offsetVal < 0){
                    this.offsetVal = 0
                }
                this.x = m.clientX
                this.moveItemNode.style.WebkitTransform = 'translateX(' + -this.offsetVal + 'px)'
            } else {
                this.isOut = true
                this.animated()
            }
        },
        endMove (e) {
            if (!this.btns.length) return;
            this.animated()
            this.isOut = true
        },
        animated () {
            let rateNum = 0;
            if (this.isLeft) {
                rateNum = this.rate
            } else {
                rateNum = 1 - this.rate
            }
            if (this.offsetVal > rateNum * this.allWidth) {
                this.showBtn()
            } else {
                this.hideBtn()
            }
        },
        showBtn () {
            this.timer = setTimeout(() => {
                if (this.offsetVal >= this.allWidth) {
                    clearTimeout(this.timer)
                    return;
                } else {
                    this.offsetVal += 8
                    if (this.offsetVal > this.allWidth) {
                        this.offsetVal = this.allWidth;
                    }
                }
                this.showBtn()
                this.moveItemNode.style.WebkitTransform = 'translateX(' + -this.offsetVal + 'px)'
            }, 20)
            this.isLeft = false;
        },
        hideBtn () {
            this.timer = setTimeout(() => {
                if (this.offsetVal <= 0) {
                    clearTimeout(this.timer)
                    return
                } else {
                    this.offsetVal -= 8
                    if (this.offsetVal < 0) {
                        this.offsetVal = 0
                    }
                }
                this.hideBtn()
                this.moveItemNode.style.WebkitTransform = 'translateX(' + -this.offsetVal + 'px)'
            }, 20);
            this.isLeft = true;
        },
        isChild (t, className) {
            // let cn = t;
            let inif = () => {
                if (t.className.indexOf(className) > -1) {
                    return true
                } else {
                    t = t.parentNode
                    if (t.nodeName.toLowerCase() === 'body') {
                        return false
                    }
                    return inif()
                }
            }
            return inif()
        },
        handleClick(i) {
            // if (Object.prototype.toString.apply(this.btns[i].handleClick) === '[object Function]') {
            //     this.btns[i].handleClick(i);
            // }
            this.$emit('handleClick', this.btns[i].type || 'del');
        }
    }
}
</script>

<style lang="stylus" scoped>
    .sliderToDel
        position relative
        width 100%
        height auto
    .item-delBtn
        display flex
        display -webkit-flex
        position absolute
        top 0
        left 100%
        width 300px
        height 100%
        font-size 12px
        text-align center
        color #ffffff
        background-color red
    .btn-item
        display flex
        display -webkit-flex
        flex-grow 1
        justify-content center
        align-items center
        &.disable
            color #a0a0a0
            opacity .6
</style>
