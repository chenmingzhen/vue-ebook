<template>
  <div class="shelf-item" :class="{'shelf-item-shadow':data.type===1||data.type===2}">
    <!--动态组件-->
    <component class="shelf-item-comp" :is="item" :data="data">

    </component>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin';
  import ShelfBook from './ShelfItemBook';
  import ShelfCategory from './ShelfItemCategory';
  import ShelfAdd from './ShelfItemAdd';

  export default {
    name: 'ShelfItem',
    mixins: [storeShelfMixin],
    props: {
      data: Object
    },
    computed: {
      item() {
        return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add);
      }
    },
    data() {
      return {
        book: ShelfBook,
        category: ShelfCategory,
        add: ShelfAdd
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item{
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 1);
    }
  }
</style>
