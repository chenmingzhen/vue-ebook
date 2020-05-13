<template>
  <transition name="slide-down">
    <div class="shelf-title" :class="{'hide-shadow':ifHideShadow}" v-show="shelfTitleVisible">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" ><!--v-if="showClear"-->
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right" ><!--v-if="showEdit"-->
        <span class="shelf-title-btn-text"
              @click="onEditClick">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin';
  import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage';
  import { clearLocalForage } from '../../utils/localForage';

  export default {
    name: 'ShelfTitle',
    mixins: [storeShelfMixin],
    props: {
      title: String
    },
    data() {
      return {
        ifHideShadow: true
      };
    },
    computed: {
      selectedText() {
        const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0;
        return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber));
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
        this.setIsEditMode(false);
      },
      clearCache() {

      },
      onEditClick() {
        this.setIsEditMode(!this.isEditMode);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-title{
    position: relative;
    z-index: 130;
    width: 100%;
    height: 1.12rem;
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow{
      box-shadow: none;
    }
    .shelf-title-text-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.12rem;
      @include columnCenter;
      .shelf-title-text {
        font-size: 0.4rem;
        line-height: 0.533rem;
        font-weight: bold;
        color: #333;
      }
      .shelf-title-sub-text {
        font-size: 0.267rem;
        color: #333;
      }
    }
    .shelf-title-btn-wrapper{
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text{
        font-size: 0.373rem;
        color: #666;
      }
      .icon-back {
        font-size: px2rem(20);
        color: #666;
      }
      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }

    }
  }
</style>
