<template>
    <div class="index">
        <router-link to="/sliderDel">右滑显示按钮</router-link>
        <router-link to="/picker">picker</router-link>
        <router-link :to="{name: 'DatePicker', params: {name: 'chencj'}}">datePicker</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
