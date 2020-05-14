<template>
    <div class="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item" :style="{height:itemHeight}"></shelf-item>
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
    },
    computed: {
      itemHeight() {
        // w / 250 = h / 350
        // h = w / 250 * 350
        return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px';
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-list{
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    top: 2.507rem;
    display: flex;
    flex-flow: row wrap;
    padding: 0 0.4rem;
    box-sizing: border-box;
    .shelf-list-item-wrapper{
      flex: 0 0 33.33%;
      width:33.33%;
      padding:0.4rem;
      box-sizing: border-box;
    }
  }
</style>
