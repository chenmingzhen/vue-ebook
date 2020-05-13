<template>
    <div class="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item"></shelf-item>
      </div>
    </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin';
  import ShelfItem from './ShelfItem';
  import { realPx, px2rem } from '../../utils/utils';
  export default {
    name: 'ShelfList',
    mixins: [storeShelfMixin],
    components: {
      ShelfItem
    },
    props: {
      data: Array
    }
  };
</script>

<style lang="scss" scoped>
  .shelf-list{
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    top: 2.507rem;
  }
</style>
