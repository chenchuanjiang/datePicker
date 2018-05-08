<template>
    <div class="picker wheel-scroll">
        <div class="bg"></div>
        <div class="piciker-cont">
            <div class="btns">
                <div class="cancel" @click="cancelClick">{{cancelBtnText}}</div>
                <div class="sure" @click="sureClick">{{sureBtnText}}</div>
            </div>
            <div class="picker-contain">
                <div v-for="(k,i) in dateData" :key="i" v-show="i === 0 ? hasYear : (i === 1 ? hasMonth : (i === 2) ? hasDate : false)" class="wheel-cont wheel-scroll" ref="picker">
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
            dateData: [],
            i: 0,
            pickerDom: [],
            hierarchy: []
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
        defaultDate: {
            type: String,
            default: () => {
                const dd = new Date();
                return sd.getFullYear() + '/' + (sd.getMonth() + 1) + '/' + sd.getDate()
            }
        },
        startDate: {
            type: String,
            default: () => {
                const sd = new Date();
                return (sd.getFullYear() - 5) + '/' + (sd.getMonth() + 1) + '/' + sd.getDate()
            }
        },
        endDate: {
            type: String,
            default: () => {
                const ed = new Date();
                return (ed.getFullYear() + 5) + '/' + (ed.getMonth() + 1) + '/' + ed.getDate()
            }
        },
        hasYear: {
            type: Boolean,
            default: true
        },
        hasDate: {
            type: Boolean,
            default: true
        },
        hasMonth: {
            type: Boolean,
            default: true
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
            this.checkParam();
            setTimeout(() => {
                this.pickerDom = this.$refs.picker;
                const sum = this.pickerDom.length;
                for (let m = 0; m < sum; m++) {
                    this['datePicker' + m] = new BScroll(this.pickerDom[m], {
                        wheel: {
                            selectedIndex: this.hierarchy[m] || 0,
                            rotate: 33, 
                            adjustTime: 50, 
                            wheelWrapperClass: 'wheel-scroll', 
                            wheelItemClass: 'wheel-item'
                        }
                    });
                    this['datePicker' + m].on('scrollStart', (pos) => {
                        this.canClick = false;
                    })
                    this['datePicker' + m].on('scrollEnd', (pos) => {
                        this.updateData(pos, m);
                    });
                }
            }, 20)
        },
        checkParam () {
            const d = new Date();
            if (new Date(this.startDate) === 'Invalid Date') {
                this.startDate = (d.getFullYear() -5) + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            } 
            if (new Date(this.endDate) === 'Invalid Date') {
                this.endDate = (d.getFullYear() + 5) + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            } 
            if (new Date(this.defaultDate) === 'Invalid Date') {
                this.defaultDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            }
            if (this.defaultDate > this.endDate) this.defaultDate = this.endDate;
            if(this.defaultDate < this.startDate) this.defaultDate = this.startDate;

            const ss = this.startDate.split('/');
            const es = this.endDate.split('/');
            const ds = this.defaultDate.split('/');
            this.dateData.push(this.setData(ss[0] - 0,es[0] - 0));
            this.hierarchy.push(ds[0] - ss[0]);
            let temp = 0;
            if (ds[1]-0 < 11) {
                temp = new Date(new Date(ds[0] + '/' + (ds[1]-0+1) + '/01').getTime() - 24 * 60 * 60 * 1000).getDate();
            } else {
                temp = 31;
            }
            if (ds[0] > ss[0] && ds[0] < es[0]) {
                this.hierarchy.push(ds[1] - 1);
                this.hierarchy.push(ds[2] - 1);
                this.dateData.push([1,2,3,4,5,6,7,8,9,10,11,12]);
                this.dateData.push(this.setData(1, temp))
            } else if (ds[0] === ss[0]) {
                this.hierarchy.push(ds[1] - ss[1]);
                this.dateData.push(this.setData(ss[1] - 0, 12))
                if (ds[1] === ss[1]) {
                    this.hierarchy.push(ds[2] - ss[2]);
                    this.dateData.push(this.setData(ss[2] - 0, temp))
                } else {
                    this.hierarchy.push(ds[2] - 1);
                    this.dateData.push(this.setData(1, temp))
                }
            } else if (ds[0] === es[0]) {
                this.hierarchy.push(ds[1] - 1);
                this.dateData.push(this.setData(1, es[1]))
                if (ds[1] === es[1]) {
                    this.hierarchy.push(ds[2] - 1);
                    this.dateData.push(this.setData(1, es[2] - 0))
                } else {
                    this.hierarchy.push(ds[2] - 1);
                    this.dateData.push(this.setData(1, temp))
                }
            }
        },
        setData (start, end) {
            let d = [];
            for (let i = start; i < end + 1; i++) {
                d.push(i);
            }
            return d;
        },
        sureClick() {
            if (!this.canClick) return;
            let texts = [];
            for (let m = 0; m < this.hierarchy.length; m++) {
                texts.push(this.dateData[m][this.hierarchy[m]]);
            }
            if (!texts[texts.length - 1]) {
                texts[texts.length - 1] = this.dateData[this.dateData.length -1][this.dateData[this.dateData.length -1].length -1]
            }
            if (!texts[texts.length - 2]) {
                texts[texts.length - 2] = this.dateData[this.dateData.length -2][this.dateData[this.dateData.length -2].length -1]
            }
            this.$emit('sureClick', this.hierarchy, texts);
        },
        cancelClick() {
            this.$emit('cancelClick');
        },
        updateData (pos, m) {
            const ss = this.startDate.split('/');
            const es = this.endDate.split('/');
            let delayer = 0;
            this.hierarchy[m] = Math.abs(pos.y/30);
            if (m === 0 || m === 1) {
                if (m === 0) {
                    delayer += 20;
                    if (pos.y - 0 === 0) {
                        this.$set(this.dateData, 1, this.setData(ss[1] - 0, 12));
                    } else if (Math.abs(pos.y/30) === es[0]-ss[0]) {
                        this.$set(this.dateData, 1, this.setData(1, es[1] - 0));
                    } else {
                        this.$set(this.dateData, 1, this.setData(1, 12));
                    }
                }
                this.timer1 = setTimeout(() => {
                    let temp = 0;
                    if (this.dateData[1][this.hierarchy[1]] < 12) {
                        temp = new Date(new Date(this.dateData[0][this.hierarchy[0]] + '/' + (this.dateData[1][this.hierarchy[1]]+1) + '/01').getTime() - 24 * 60 * 60 * 1000).getDate();
                    } else {
                        temp = 31;
                    }
                    if (this.hierarchy[0] === 0 && this.dateData[1][this.hierarchy[1]] === ss[1] - 0) {
                        this.$set(this.dateData, 2, this.setData(ss[2]-0, temp));
                    } else if (this.hierarchy[0] === es[0]-ss[0] && this.dateData[1][this.hierarchy[1]] === es[1] - 0) {
                        this.$set(this.dateData, 2, this.setData(1, es[2] - 0));
                    } else {
                        this.$set(this.dateData, 2, this.setData(1, temp));
                    }
                    clearTimeout(this.timer1);
                    this.timer2 = setTimeout(() => {
                        this.canClick = true;
                        clearTimeout(this.timer2);
                    }, 20)
                }, delayer)
            } else {
                this.canClick = true;
            }
        }
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

