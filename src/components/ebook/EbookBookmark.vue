<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark :color="color" :width="15" :height="35"></bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark';
  import { realPx } from '../../utils/utils';
  import { ebookMixin } from '../../utils/mixin';

  const WHITE = '#fff';
  const BLUE = '#346cbc';
  export default {
    name: 'EbookBookmark',
    components: {
      Bookmark
    },
    data() {
      return {
        text: '',
        color: WHITE,
        isFixed: false
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .ebook-bookmark{
    position: absolute;
    top: -0.933rem;
    left: 0;
    z-index: 200;
    width: 100%;
    height: 0.933rem;
    .ebook-bookmark-text-wrapper{
      position: absolute;
      right: 1.2rem;
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: 0.96rem;
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: 0.373rem;
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper{
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: 0.4rem;
    }
  }
</style>
