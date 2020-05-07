<template>
  <div class="ebook-loading">
    <div class="ebookloading-wrapper">
      <div class="ebook-loading-item" v-for="(item,index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script>
  import { px2rem } from '../../utils/utils';

  export default {
    name: 'EbookLoading',
    data() {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ],
        lineWidth: [
          { value: 32 },
          { value: 32 },
          { value: 32 },
          { value: 32 },
          { value: 32 },
          { value: 32 }
        ],
        add: true,
        end: false
      };
    },
    mounted() {
      // 第二根之后的线条需要在第一根线条移动一半后再移动
      // 因为第一根线条没有前面的线条了 所以第一根线条即index=0需要另外情况
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index];
          const line = this.$refs.line[index];
          const maskWidth = this.maskWidth[index];
          const lineWidth = this.lineWidth[index];
          if (index === 0) {
            if (this.add && maskWidth.value < 32) {
              maskWidth.value++;
              lineWidth.value--;
            } else if (!this.add && lineWidth.value < 32) {
              maskWidth.value--;
              lineWidth.value++;
            }
          } else {
            if (this.add && maskWidth.value < 32) {
              const preMaskWidth = this.maskWidth[index - 1];
              if (preMaskWidth.value >= 16) {
                maskWidth.value++;
                lineWidth.value--;
              }
            } else if (!this.add && lineWidth.value < 32) {
              const preLineWidth = this.lineWidth[index - 1];
              if (preLineWidth.value >= 16) {
                maskWidth.value--;
                lineWidth.value++;
              }
            }
          }
          mask.style.width = `${px2rem(maskWidth.value)}rem`;
          mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`;
          line.style.width = `${px2rem(lineWidth.value)}rem`;
          line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`;
          if (index === this.maskWidth.length - 1) {
            if (this.add) {
              if (maskWidth.value === 32) {
                this.end = true;
              }
            } else {
              if (maskWidth.value === 0) {
                this.end = true;
              }
            }
          }
          if (this.end) {
            this.add = !this.add;
            this.end = false;
          }
        });
      }, 8);
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-loading {
    position: relative;
    z-index: 400;
    width: 3.36rem;
    height: 2.133rem;
    background: transparent;
    border: 0.08rem solid #d7d7d7;
    border-radius: 0.16rem;

    .ebookloading-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      .ebook-loading-item{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0.187rem 0;
        box-sizing: border-box;
        .ebook-loading-line-wrapper{
          flex: 1;
          padding: 0 0.187rem;
          box-sizing: border-box;
          @include left;
          .ebook-loading-line{
            flex: 0 0 0.853rem;
            width: 0.853rem;
            height: 0.053rem;
            background: #d7d7d7;
          }
          .ebook-loading-mask{
            flex: 0 0 0;
            width: 0;
            height: 0.053rem;
          }
        }
      }
    }
    .ebook-loading-center{
      position: absolute;
      left: 50%;
      top: 0;
      width: 0.08rem;
      height: 100%;
      background: #d7d7d7;
    }
  }
</style>
