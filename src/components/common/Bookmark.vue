<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
  import { px2rem } from '../../utils/utils';

  export default {
    name: 'Bookmark',
    props: {
      width: Number,
      height: Number,
      color: String
    },
    computed: {
      style() {
        if (this.color) {
          return {
            borderColor: `${this.color} ${this.color} transparent ${this.color}`
          };
        } else {
          return {};
        }
      }
    },
    methods: {
      // 根据传进来的参数设置书签的高度和宽度
      refresh() {
        if (this.height && this.width) {
          this.$refs.bookmark.style.borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem`;
        }
      }
    },
    mounted() {
      this.refresh();
    }
  };
</script>

<style lang="scss" scoped>
  /*  三角形
      width: 0;
      height: 0;
      border-width: 0 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent orange transparent;
      */
  @import "../../assets/styles/global";

  .bookmark {
    width: 0;
    height: 0;
    border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
    border-style: solid;
    border-color: white white transparent white;
  }

</style>
