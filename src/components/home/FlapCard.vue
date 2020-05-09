<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <!--这里设置z-index-->
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
        flapCardList,
        front: 0,
        back: 1
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
      },
      rotate(index, type) {
        const item = this.flapCardList[index];
        let dom;
        if (type === 'front') {
          dom = this.$refs.right[index];
        } else {
          dom = this.$refs.left[index];
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`;
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`;
      },
      flapCardRotate() {
        const frontFlapCard = this.flapCardList[this.front];
        const backFlapCard = this.flapCardList[this.back];
        frontFlapCard.rotateDegree += 10;
        frontFlapCard._g -= 5;
        backFlapCard.rotateDegree -= 10;
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5;
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2;
        }
        this.rotate(0, 'front');
        this.rotate(1, 'back');
      },
      prepare() {
        const backFlapCard = this.flapCardList[this.back];
        // 注意背面的旋转轴是右边 逆时针为正
        backFlapCard.rotateDegree = 180;
        // 先将背面颜色减掉 因为后面会加上9次颜色
        backFlapCard._g = backFlapCard.g - 5 * 9;
        this.rotate(this.back, 'back');
      },
      startFlapCardAnimation() {
        this.prepare();
        setInterval(() => {
          this.flapCardRotate();
        }, 200);
      }
    },
    mounted() {
      this.startFlapCardAnimation();
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
            // 旋转到背面就隐藏
            backface-visibility: hidden;
          }

          .flap-card-semi-circle-left {
            border-radius: 0.64rem 0 0 0.64rem;
            background-position: center right;
            //修改旋转轴
            transform-origin: right;
          }

          .flap-card-semi-circle-right {
            border-radius: 0 0.64rem 0.64rem 0;
            background-position: center left;
            //修改旋转轴
            transform-origin: left;
          }
        }
      }
    }
  }
</style>
