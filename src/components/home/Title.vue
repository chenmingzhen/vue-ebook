<template>
  <div class="home-title-wrapper">
    <div class="label">{{label}}</div>
    <div class="btn" @click="click">{{btn}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Title',
    props: {
      label: String,
      btn: String
    },
    methods: {
      click() {
        this.$emit('onClick');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .home-title-wrapper{
    width: 100%;
    padding: 0.4rem 0.267rem;
    box-sizing: border-box;
    @include top;
    .label{
      flex: 1;
      font-size: 0.48rem;
      color: #333;
      font-weight: bold;
    }
    .btn{
      font-size: 0.373rem;
      color: rgba(64,158,255,1);
      &:active{
        color: rgba(64, 158, 255, .5);
      }
    }
  }
</style>
