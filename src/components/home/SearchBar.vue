<template>
  <div>
    <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow':!shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title':!titleVisible}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <!--占位div-->
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input" :placeholder="$t('home.hint')" v-model="searchText" @click="showHotSearch">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin';
  import HotSearchList from './HotSearchList';

  export default {
    name: 'SearchBar',
    components: {
      HotSearchList
    },
    mixins: [storeHomeMixin],
    data() {
      return {
        titleVisible: true,
        shadowVisible: false,
        searchText: '',
        hotSearchVisible: false
      };
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle();
          this.showShadow();
        } else {
          this.showTitle();
          this.hideShadow();
        }
      }
    },
    methods: {
      hideTitle() {
        this.titleVisible = false;
      },
      showTitle() {
        this.titleVisible = true;
      },
      hideShadow() {
        this.shadowVisible = false;
      },
      showShadow() {
        this.shadowVisible = true;
      },
      showHotSearch() {
        this.hideTitle();
        this.hideShadow();
        this.hotSearchVisible = true;
        this.$nextTick(() => {
          /*
          * Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。
          * $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，
          *  */
          // 因为上面的操作dom没有立即更新 而这里的操作是要等dom更新的 需要等dom更新再执行
          this.$refs.hotSearch.reset();
        });
      },
      hideHotSearch() {
        this.hotSearchVisible = false;
        if (this.offsetY > 0) {
          this.hideTitle();
          this.showShadow();
        } else {
          this.showTitle();
          this.hideShadow();
        }
      },
      back() {
        if (this.offsetY > 0) {
          this.showShadow();
        } else {
          this.hideShadow();
        }
        if (this.hotSearchVisible) {
          this.hideHotSearch();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    height: 2.507rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .1);

    &.hide-title {
      height: 1.387rem;
    }

    &.hide-shadow {
      box-shadow: none;
    }

    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1.12rem;

      .title-text-wrapper {
        width: 100%;
        height: 1.12rem;
        @include center
      }

      .title-icon-shake-wrapper {
        position: absolute;
        right: 0.4rem;
        top: 0;
        height: 1.12rem;
        @include center
      }
    }

    .title-icon-back-wrapper {
      position: absolute;
      left: 0.4rem;
      top: 0;
      z-index: 200;
      transition: height $animationTime $animationType;
      height: 1.12rem;
      @include center;

      &.hide-title {
        height: 1.387rem;
      }
    }

    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: 1.12rem;
      display: flex;
      width: 100%;
      height: 1.387rem;
      padding: 0.267rem;
      box-sizing: border-box;
      transition: top $animationTime $animationType;

      &.hide-title {
        top: 0;
      }

      .search-bar-blank {
        // 利用flex实现搜索框变窄
        flex: 0 0 0;
        width: 0;
        transition: all $animationTime $animationType;

        &.hide-title {
          flex: 0 0 0.827rem;
          width: 0.827rem;
        }
      }

      .search-bar-input {
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: 0.533rem;
        padding: 0.133rem 0.4rem;
        box-sizing: border-box;
        border: 1px solid #eee;
        @include left;

        .icon-search {
          color: #999;
        }

        .input {
          width: 100%;
          height: 1.173rem;
          border: none;
          background: transparent;
          margin-left: 0.267rem;
          font-size: 0.64rem;
          color: #666;

          &:focus {
            outline: none;
          }

          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
