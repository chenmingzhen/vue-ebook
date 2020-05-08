<template>
  <!-- 书城首页组件 -->
  <div class="store-home">
    <search-bar ></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
      <div>111111</div>
    </scroll>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar';
  import scroll from '../../components/common/scroll';
  import { storeHomeMixin } from '../../utils/mixin';

  export default {
    name: 'StoreHome',
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      scroll
    },
    data() {
      return {
        scrollTop: 94
      };
    },
    methods: {
      // 处理滚动事件
      onScroll(offsetY) {
        // 设置vuex的offsetY
        // SearchBar组件会进行监听
        this.setOffsetY(offsetY);
        if (offsetY > 0) {
          // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
          this.scrollTop = 42;
        } else {
          // 如果滚动为0，则显示标题，滚动条距顶部为94像素
          this.scrollTop = 62.75;
        }
        // 更新滚动条 重新计算top
        this.$refs.scroll.refresh();
      }
    }
  };
</script>

<style scoped>

</style>
