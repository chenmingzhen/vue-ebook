<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item,index) in flapCardList" :key="index">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"
               ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin';
  import { flapCardList } from '../../utils/store';

  export default {
    name: 'FlapCard',
    mixins: [storeHomeMixin],
    data() {
      return {
        // 引入数据
        flapCardList
      };
    },
    methods: {
      close() {
        this.setFlapCardVisible(false);
      },
      semiCircleStyle(item, dir) {
        return {
          backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .flap-card-wrapper {
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    @include absCenter;

    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: 0.8rem;
      z-index: 1100;
      width: 100%;
      @include center;

      .icon-close {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: #333;
        font-size: 0.667rem;
        @include center
      }
    }

    .flap-card-bg {
      position: relative;
      width: 1.707rem;
      height: 1.707rem;
      border-radius: 0.133rem;
      background: white;
      .flap-card {
        width: 1.28rem;
        height: 1.28rem;
        @include absCenter;

        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;

          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
          }

          .flap-card-semi-circle-left {
            border-radius: 0.64rem 0 0 0.64rem;
            background-position: center right;
          }

          .flap-card-semi-circle-right {
            border-radius: 0 0.64rem 0.64rem 0;
            background-position: center left;
          }
        }
      }
    }
  }
</style>
