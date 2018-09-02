<template>
    <div id="appw">
        <h1>{{msg}}</h1>
        <img src="./img/ad.png" alt="">
        <input type="text" v-model="msg">
    </div>
</template>


<script>
    import getData from './util';
    export default {
        name: 'appwsd',
        data(){
            return {
                msg: 'welcome to honglangman'
            }
        },
        created(){
            this.fetchData()
        },
        methods: {
            async fetchData(){
                const data = await getData();
                //this.msg = data
            }
        }
    }
</script>
<style lang="scss">
    #appw{
        font-family: fantasy;
        h1{
            color: red
        }
    }
</style>