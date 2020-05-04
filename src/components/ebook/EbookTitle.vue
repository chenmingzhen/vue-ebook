<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-if="menuVisible">
      <div class="left">
        <span class="icon-back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'EbookTitle',
    computed: {
      ...mapGetters(['menuVisible'])
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 210;
    display: flex;
    width: 100%;
    height: 1.28rem;
    background-color: white;
    box-shadow: 0 0.213rem 0.213rem rgba(0, 0, 0, .15);
    font-size: 0.533rem;

    .left {
      flex: 0 0 1.6rem;
      @include left;
      margin-left: 0.4rem;
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 1.067rem;
        @include center;

        .icon-shelf {
          font-size: 0.587rem;
        }

        .icon-cart {
          font-size: 0.587rem;
        }
      }
    }
  }
</style>
