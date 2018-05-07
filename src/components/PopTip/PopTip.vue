<template>
    <div class="popCont">
        <div class="popContain">
            <h3>{{ title }}</h3>
            <div class="popDetail">
                <p>{{ text }}</p>
            </div>
            <ul class="btns">
                <li v-for="(btn, index) in btns" :key="index" @click="">
                    <span>{{btn.text}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    .popCont
        position absolute
        width 100%
        height 100%
        background-color rgba(0, 0, 0, .3)
    .popContain
        position absolute
        top 50%
        left 10%
        width 80%
        height auto
        transform translate(0, -50%)
        -webkit-transform translate(0, -50%)
</style>
