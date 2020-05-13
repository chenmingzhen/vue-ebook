<template>
    <div class="shelf-search-wrapper">
      <div class="shelf-search" :class="{'search-top' : ifInputClicked}">
        <div class="search-wrapper">
          <div class="icon-search-wrapper">
            <span class="icon-search icon"></span>
          </div>
          <div class="search-input-wrapper">
            <input type="text" class="search-input" @click="onSearchClick" v-model="searchText">
          </div>
          <div class="icon-clear-wrapper">
            <span class="icon-close-circle-fill" v-show="searchText.length>0" @click="clearSearchText"></span>
          </div>
        </div>
        <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
          <span class="icon-cn icon" v-if="lang==='cn'"></span>
          <span class="icon-en icon" v-else></span>
        </div>
        <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
          <span class="cancel-text">{{$t('shelf.cancel')}}</span>
        </div>
      </div>
      <transition name="hot-search-move">
        <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
          <div class="shelf-search-tab-item" v-for="item in tabs" :key="item.id" @click="onTabClick(item.id)">
            <span class="shelf-search-tab-text" :class="{'is-selected': item.id === selectedTab}">{{item.text}}</span>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import { setLocalStorage } from '../../utils/localStorage';
  import { storeShelfMixin } from '../../utils/mixin';
  export default {
    name: 'ShelfSearch',
    mixins: [storeShelfMixin],
    data() {
      return {
        ifInputClicked: false,
        searchText: '',
        selectedTab: 1
      };
    },
    computed: {
      lang() {
        return this.$i18n.locale;
      },
      tabs() {
        return [
          {
            id: 1,
            text: this.$t('shelf.default')
          },
          {
            id: 2,
            text: this.$t('shelf.progress')
          },
          {
            id: 3,
            text: this.$t('shelf.purchase')
          }
        ];
      }
    },
    methods: {
      onSearchClick() {
        this.ifInputClicked = true;
        this.setShelfTitleVisible(false);
      },
      onCancelClick() {
        this.ifInputClicked = false;
        this.setShelfTitleVisible(true);
      },
      clearSearchText() {
        this.searchText = '';
      },
      switchLocale() {
        if (this.lang === 'en') {
          this.$i18n.locale = 'cn';
        } else {
          this.$i18n.locale = 'en';
        }
        setLocalStorage('locale', this.$i18n.locale);
      },
      onTabClick(id) {
        this.selectedTab = id;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wrapper{
    position: relative;
    z-index: 105;
    width: 100%;
    height: 2.507rem;
    font-size: 0.427rem;
    background: white;
    box-shadow: 0 0.053rem 0.053rem 0 rgba(0,0,0,.1);
    &.hide-shadow {
      box-shadow: none;
    }
    &.search-top {
      position: fixed;
      left: 0;
      top: 0;
    }
    .shelf-search{
      position: absolute;
      top: 1.12rem;
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: 1.387rem;
      transition: top $animationTime $animationType;
      &.search-top {
        top: 0;
      }
      .search-wrapper{
        flex: 1;
        display: flex;
        margin: 0.213rem 0 0.213rem 0.267rem;
        border-radius: 0.08rem;
        border: 0.027rem solid #ccc;
        .icon-search-wrapper{
          flex: 0 0 0.587rem;
          @include right;
          .icon-search {
            font-size: 0.32rem;
          }
        }
        .search-input-wrapper{
          flex: 1;
          padding: 0 0.267rem;
          box-sizing: border-box;
          @include center;
          width: 100%;
          font-size: 0.373rem;
          border: none;
          color: #333;
          .search-input{
            width: 100%;
            font-size: 0.373rem;
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: 0.373rem;
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper{
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn, .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .cancel-text {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
    .shelf-search-tab-wrapper {
      position: absolute;
      top: px2rem(52);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(42);
      .shelf-search-tab-item {
        flex: 1;
        @include center;
        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999;
          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
  }
</style>
