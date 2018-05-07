<template>
    <div class="content">
        <input placeholder="请选择城市" @click="showPicker" readonly />
        <bs-picker
            v-if="data.length"
            :sureBtnText="sureBtnText"
            :cancelBtnText="cancelBtnText"
            :defaultIndex="defaultIndex"
            @sureClick="sureClick"
            @cancelClick="cancelClick"
            :data="data"></bs-picker>
    </div>
</template>

<script>
import BSPicker from './BSPicker.vue';
export default {
    data () {
        return {
            sureBtnText: '确定',
            cancelBtnText: '取消',
            defaultIndex: [0],
            data: [],
            isShowDate: false
        }
    },
    components: {
        'bs-picker': BSPicker
    },
    methods: {
        showPicker () {
            this.data = [
                {
                    text: '湖北',
                    subItem: [
                        {
                            text: '武汉'
                        },
                        {
                            text: '潜江'
                        }
                    ]
                },
                {
                    text: '湖南',
                    subItem: [
                        {
                            text: '长沙'
                        },
                        {
                            text: '常德'
                        }
                    ]
                }
            ];
        },
        sureClick (indexs, texts) {
            console.log(indexs, texts)
            this.data = [];
        },
        cancelClick () {
            this.data = [];
        }
    }
}
</script>

<style>

</style>
