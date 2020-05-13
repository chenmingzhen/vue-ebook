<!-- 书架组件 -->
<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle';
  import { storeShelfMixin } from '../../utils/mixin';
  import Scroll from '../../components/common/scroll';
  export default {
    name: 'StoreShelf',
    mixins: [storeShelfMixin],
    components: {
      ShelfTitle
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
