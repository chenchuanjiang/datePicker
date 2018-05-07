<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
    *
        padding 0
        margin 0
        box-sizing border-box
        -webkit-box-sizing border-box
    #app
        width 100%
        height 100%
        overflow-x hidden
    ul, ol, li
        list-style none
</style>
