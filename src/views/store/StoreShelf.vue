<!-- 书架组件 -->
<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" @onScroll="onScroll" ref="scroll" :top="0" :bottom="scrollBottom">
      <shelf-search></shelf-search>
      <shelf-list :data="shelfList"></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle';
  import { storeShelfMixin } from '../../utils/mixin';
  import Scroll from '../../components/common/scroll';
  import ShelfSearch from '../../components/shelf/ShelfSearch';
  import ShelfList from '../../components/shelf/ShelfList';
  import ShelfFooter from '../../components/shelf/ShelfFooter';
  export default {
    name: 'StoreShelf',
    mixins: [storeShelfMixin],
    components: {
      ShelfTitle,
      Scroll,
      ShelfSearch,
      ShelfList,
      ShelfFooter
    },
    mounted() {
      // 获取书架列表数据
      this.getShelfList();
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY);
      }
    },
    data() {
      return {
        scrollBottom: 0
      };
    },
    watch: {
      // 监听编辑模式，编辑模式下滚动条距底部需要产生48像素的距离
      isEditMode(isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0;
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;

    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
