<template>
    <div class="body">
        <p>{{$route.params.name}}</p>
        <input type="text" readonly placeholder="请选择日期" name="" id="" @click="showDate">
        <date-picker
            v-if="isShow"
            :startDate="startDate"
            :endDate="endDate"
            :defaultDate="defaultDate"
            :sureBtnText="sureBtnText"
            :cancelBtnText="cancelBtnText"
            :hasDate="hasDate"
            :hasMonth="hasMonth"
            :hasYear="hasYear"
            @sureClick="sureClick"
            @cancelClick="cancelClick"
            ></date-picker>
    </div>
</template>

<script>
import DatePicker from './DatePicker';
export default {
    data () {
        return {
            startDate: '2017/05/28',
            endDate: '2020/05/28',
            defaultDate: '2018/05/28',
            sureBtnText: '确定',
            cancelBtnText: '取消',
            hasYear: true,
            hasDate: false,
            hasMonth: true,
            isShow: false
        }
    },
    mounted () {
        setTimeout(() => {
            console.log(this.$route);
        })
    },
    components: {
        DatePicker
    },
    methods: {
        sureClick(i, t) {
            this.isShow = false;
            console.log(i, t);
        },
        showDate() {
            this.isShow = true; 
        },
        cancelClick() {
            this.isShow = false;
        }
    }
}
</script>

<style>

</style>
