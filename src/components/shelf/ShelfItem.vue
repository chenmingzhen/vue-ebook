<template>
  <div class="shelf-item">
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
    background: #42b983;
  }
</style>
