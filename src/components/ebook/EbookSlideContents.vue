<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')"
               v-model="searchText" @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisible" @click="hideSearchPage()">{{$t('book.cancel')}}
      </div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" alt="">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin';

  export default {
    name: 'EbookSlideContents',
    mixins: [ebookMixin],
    data() {
      return {
        searchVisible: false,
        searchText: ''
      };
    },
    methods: {
      showSearchPage() {
        this.searchVisible = true;
      },
      hideSearchPage() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    font-size: 0;

    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: 0.96rem;
      margin: 0.533rem 0 0.267rem 0;
      padding: 0 0.4rem;
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 0.747rem;
          font-size: 0.32rem;
          @include center;
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: 0.853rem;
          font-size: 0.373rem;
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 1.333rem;
        font-size: 0.373rem;
        @include right
      }
    }
    .slide-contents-book-wrapper{
      display: flex;
      width: 100%;
      height: 2.4rem;
      padding: 0.267rem 0.4rem 0.533rem 0.4rem;
      box-sizing: border-box;
      .slide-contents-book-img-wrapper{
        flex: 0 0 1.2rem;
        .slide-contents-book-img{
          width: 1.2rem;
          height: 1.6rem;
        }
      }
      .slide-contents-book-info-wrapper{
        flex: 1;
        padding: 0 0.267rem;
        box-sizing: border-box;
        .slide-contents-book-title{
          font-size: 0.373rem;
          line-height: 0.427rem;
          @include left;
          .slide-contents-book-title-text{
              @include ellipsis2(3);
          }
        }
        .slide-contents-book-author{
          font-size: 0.32rem;
          line-height: 0.427rem;
          margin-top: 0.133rem;
          @include left;
          .slide-contents-book-author-text{
            @include ellipsis2(1);
          }
        }
      }
      .slide-contents-book-progress-wrapper{
        flex: 0 0 3.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress{
          .progress{
            font-size: 0.213rem;
          }
          .progress-text{
            font-size: 0.213rem;
          }
        }
        .slide-contents-book-time{
          font-size: 0.213rem;
          margin-top: 0.133rem;
        }
      }
    }
  }
</style>
