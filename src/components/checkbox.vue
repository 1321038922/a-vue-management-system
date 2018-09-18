<template>
    <label class="checkbox-com">
        <input type="checkbox" value="998" class="checkbox-com-input" v-model="currentValue">
        <span class="box-wrap"></span>
    </label>
</template>

<script>
    export default {
        name:'checkbox-com',
        props: {
            value: {
                type:[String ,Number,Boolean ]
            }
        },
        data(){
            return{
                currentValue:this.value
            }
        },
        watch:{
            currentValue(newValue) {
                this.$emit('input', newValue)
                this.$emit('change', newValue)
            },
            value(){
                this.currentValue = this.value
            }
        }
    }
</script>

<style scoped>
.checkbox-com-input {
    display: none;
}
 .box-wrap {
     transform: scale(0);
     position: relative;
     display: inline-block;
     width: 100%;
     height: 100%;
 }
.checkbox-com, .box-wrap {
    position: relative;
    width: 50px;
    height: 50px;
    display: inline-block;
    border: 1px solid #a1a1a1;
    border-radius: 4px;
}
.checkbox-com-input:checked + .box-wrap{
        transition: transform .05s ease;
    transform: scale(1);

    background: #409eff;
}
.checkbox-com-input:checked+.box-wrap::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 40%;
    width: 30px;
    height:14px;
    /* border-top: 20px solid transparent;
    border-right: 40px solid transparent; */
    border-left: 4px solid #fff;
    border-bottom: 4px solid #fff;
    transform: translate(-50%, -50%) rotate(-45deg)
}
</style>