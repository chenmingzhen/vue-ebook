<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation':runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <div class="flap-card" v-for="(item,index) in flapCardList" :key="index" :style="{zIndex:item.zIndex}">
        <!--这里设置z-index-->
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"
               ref="right"></div>
        </div>
      </div>
      <div class="point-wrapper">
        <div class="point" :class="{'animation':runPointAnimation}" v-for="item in pointList" :key="item"></div>
      </div>
    </div>
    <div class="book-card" :class="{'animation':runBookCardAnimation}" v-show="runBookCardAnimation">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img alt="" class="img" :src="data?data.cover:''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="rend-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin';
  import { flapCardList, categoryText } from '../../utils/store';

  export default {
    name: 'FlapCard',
    mixins: [storeHomeMixin],
    props: {
      data: Object
    },
    data() {
      return {
        // 引入数据
        flapCardList,
        front: 0,
        back: 1,
        intervalTime: 25,
        runFlapCardAnimation: false,
        pointList: null,
        runPointAnimation: false,
        runBookCardAnimation: false
      };
    },
    methods: {
      close() {
        this.stopAnimation();
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
        this.rotate(this.front, 'front');
        this.rotate(this.back, 'back');
        // 当前一张正面和后一张背面跑完一圈后 到下一组进行
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next();
        }
      },
      next() {
        // 复原属性
        const frontFlapCard = this.flapCardList[this.front];
        const backFlapCard = this.flapCardList[this.back];
        frontFlapCard.rotateDegree = 0;
        backFlapCard.rotateDegree = 0;
        frontFlapCard._g = frontFlapCard.g;
        backFlapCard._g = backFlapCard.g;
        this.rotate(this.front, 'front');
        this.rotate(this.back, 'back');

        this.front++;
        this.back++;
        // 超出范围置零
        const len = this.flapCardList.length;
        if (this.front >= len) {
          this.front = 0;
        }
        if (this.back >= len) {
          this.back = 0;
        }
        // 动态设置zIndex
        // 100 -> 96
        // 99 -> 100
        // 98 -> 99
        // 97 -> 98
        // 96 -> 97
        // (0 - 1 + 5) % 5 = 4
        // (1 - 1 + 5) % 5 = 0
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len);
        });
        this.prepare();
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
        this.cardTask = setInterval(() => {
          this.flapCardRotate();
        }, this.intervalTime);
        /* setTimeout(() => {
          this.runFlapCardAnimation = false;
          if (this.cardTask) {
            clearInterval(this.cardTask);
          }
        }, 2500); */
      },
      stopAnimation() {
        // 清除动画的计时器
        if (this.cardTask) {
          clearInterval(this.cardTask);
        }
        if (this.fireTimeout) {
          clearTimeout(this.fireTimeout);
        }
        if (this.bookCardTimeout) {
          clearTimeout(this.bookCardTimeout);
        }
        this.reset();
      },
      // 关闭时 重置样式
      reset() {
        this.front = 0;
        this.back = 1;
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index;
          item._g = item.g;
          item.rotateDegree = 0;
          this.rotate(index, 'front');
          this.rotate(index, 'back');
        });
        this.runBookCardAnimation = false;
        this.runFlapCardAnimation = false;
        this.runPointAnimation = false;
      },
      runAnimation() {
        // 显示弹出动画
        this.runFlapCardAnimation = true;

        // 弹出动画300ms  完了之后执行翻页动画
        this.bounceTask = setTimeout(() => {
          this.startFlapCardAnimation();
          this.startPointAnimation();
        }, 300);
        setTimeout(() => {
          this.stopAnimation();
          this.runFlapCardAnimation = false;
          this.runBookCardAnimation = true;
        }, 2500);
      },
      startPointAnimation() {
        this.runPointAnimation = true;
        // 1s后烟火动画停止
        this.fireTimeout = setTimeout(() => {
          this.runPointAnimation = false;
        }, 1000);
        this.bookCardTimeout = setTimeout(() => {
          // this.stopAnimation();
          this.runBookCardAnimation = true;
        }, 2500);
      },
      categoryText() {
        if (this.data) {
          return categoryText(this.data.category, this);
        } else {
          return '';
        }
      }
    },
    watch: {
      flapCardVisible(v) {
        if (v) {
          this.runAnimation();
        }
      }
    },
    created() {
      this.pointList = [];
      for (let i = 0; i < 18; i++) {
        this.pointList.push(`point${i}`);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";

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
      // 作为默认值 初始状态
      transform: scale(0);
      opacity: 0;

      &.animation {
        // both的作用是 动画结束后 保持在动画结束的最后的一个状态
        // 这样就不会回到初始状态 transform scale 0 opacity 0 停在100%的状态了
        animation: flap-card-move .3s ease-in both;
      }

      @keyframes flap-card-move {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          transform: scale(.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

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

      .point-wrapper {
        z-index: 1500;
        @include absCenter;

        .point {
          border-radius: 50%;
          @include absCenter;

          &.animation {
            @for $i from 1 to length($moves) {
              &:nth-child(#{$i}) {
                @include move($i);
              }
            }
          }
        }
      }
    }

    .book-card {
      position: relative;
      width: 65%;
      max-width: 10.667rem;
      box-sizing: border-box;
      border-radius: 0.4rem;
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }

      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: 0.8rem;
        .img-wrapper {
          width: 100%;
          margin-top: 0.533rem;
          @include center;
          .img {
            width: 2.4rem;
            height: 3.467rem;
          }
        }
      }

      .content-wrapper {
        padding: 0 0.533rem;
        margin-top: 0.533rem;
        .content-title {
          color: #333;
          font-weight: bold;
          font-size: 0.48rem;
          line-height: 0.533rem;
          max-height: 1.067rem;
          text-align: center;
          @include ellipsis2(2);
        }

        .content-author {
          margin-top: 0.267rem;
          text-align: center;
        }

        .content-category {
          color: #999;
          font-size: 0.373rem;
          margin-top: 0.267rem;
          text-align: center;
        }
      }

      .rend-btn {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1100;
        width: 100%;
        border-radius: 0 0 0.4rem 0.4rem;
        padding: 0.4rem 0;
        text-align: center;
        color: white;
        font-size: 0.373rem;
        background: $color-blue;
      }
    }
  }
</style>
