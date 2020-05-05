<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text"><!--{{getReadTimeText()}}--></span><span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back"></span>
          </div>
          <input type="range" class="progress" max="100" min="0" step="1"
                 @change="onProgressChange($event.target.value)" @input=" onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="progress-icon-wrapper" @click="nextSection()">
            <span class="icon-forward"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text"><!--{{getSectionName}}--></span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin';

  export default {
    name: 'EbookSettingProgress',
    mixins: [ebookMixin],
    methods: {
      onProgressChange(progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress();
          this.updateProgressBg();
        });
      },
      onProgressInput(progress) {
        this.setProgress(progress).then(() => {
          this.displayProgress();
          this.updateProgressBg();
        });
      },
      displayProgress() {
        const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100);
        this.currentBook.rendition.display(cfi);
      },
      updateProgressBg() {
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
      },
      prevSection() {

      },
      nextSection() {

      },
      displaySection() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: 1.28rem;
    left: 0;
    z-index: 160;
    width: 100%;
    height: 2.4rem;
    background: white;
    box-shadow: 0 -0.213rem 0.213rem rgba(0, 0, 0, .15);

    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;

      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.067rem;
        font-size: 0.32rem;
        @include center;
      }

      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 0.4rem;
        box-sizing: border-box;

        .progress-icon-wrapper {
          font-size: 0.533rem;
        }

        .progress {
          width: 100%;
          // -webkit-appearance 外观看起来像按钮
          -webkit-appearance: none;
          height: 0.053rem;
          margin: 0 0.267rem;
          //设置这个样式可以是进度条左右两边不一样 左边#5d6268 右边#b4b5b7
          // 通过background-size设置左边和右边的分别占比 background-size 50% 50%
          //上面的updateProgressBg实时改变background-size 该background属性在nginx服务器放置 通过请求加载
          // background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          &:focus {
            outline: none;
          }

          // 进度条的圆点
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
      }

      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: 0.267rem;
        width: 100%;
        color: #333;
        font-size: 0.32rem;
        padding: 0 0.4rem;
        box-sizing: border-box;
        @include center;

        .progress-section-text {
          @include ellipsis;
        }
      }
    }
  }
</style>
