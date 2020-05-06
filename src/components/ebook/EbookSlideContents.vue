<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text" class="slide-contents-search-input" :placeholder="$t('book.searchHint')"
               v-model="searchText" @click="showSearchPage" @keyup.enter.exact="search()">
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
    <scroll class="slide-contents-list" :top="104" :bottom="32" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
        <span class="slide-contents-item-label" :class="{'selected':section===index}" :style="contentItemStyle(item)"
              @click="displayContent(item.href)">
          {{item.label}}
        </span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll :top="46.927" :bottom="32"
            v-show="searchVisible"
            class="slide-search-list"
        >
      <div class="slide-search-item"
           v-for="(item,index) in searchList"
           :key="index" v-html="item.excerpt"
           @click="displayContent(item.cfi, true)">
      </div>
    </scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin';
  import Scroll from '../../components/common/scroll';
  import { px2rem } from '../../utils/utils';

  export default {
    name: 'EbookSlideContents',
    mixins: [ebookMixin],
    components: {
      Scroll
    },
    data() {
      return {
        searchVisible: false,
        searchText: '',
        searchList: null
      };
    },
    methods: {
      showSearchPage() {
        this.searchVisible = true;
      },
      hideSearchPage() {
        this.searchVisible = false;
        this.searchText = '';
        this.searchList = null;
      },
      contentItemStyle(item) {
        return {
          marginLeft: `${px2rem(item.level * 15)}rem`
        };
      },
      displayContent(target, highlight = false) {
        this.display(target, () => {
          this.hideTitleAndMenu();
          if (highlight) {
            this.currentBook.rendition.annotations.highlight(target);
          }
        });
      },
      search() {
        if (this.searchText && this.searchText.length > 0) {
          this.doSearch(this.searchText).then(list => {
            this.searchList = list;
            this.searchList.map(item => {
              // 搜索出的内容 做高亮
              item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`);
              return item;
            });
          });
        }
      },
      // 官方提供查找方法
      doSearch(q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            section => section.load(this.currentBook.load.bind(this.currentBook))
              .then(section.find.bind(section, q))
              .finally(section.unload.bind(section)))
        ).then(results => Promise.resolve([].concat.apply([], results)));
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

    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: 2.4rem;
      padding: 0.267rem 0.4rem 0.533rem 0.4rem;
      box-sizing: border-box;

      .slide-contents-book-img-wrapper {
        flex: 0 0 1.2rem;

        .slide-contents-book-img {
          width: 1.2rem;
          height: 1.6rem;
        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 0.267rem;
        box-sizing: border-box;

        .slide-contents-book-title {
          font-size: 0.373rem;
          line-height: 0.427rem;
          @include left;

          .slide-contents-book-title-text {
            @include ellipsis2(3);
          }
        }

        .slide-contents-book-author {
          font-size: 0.32rem;
          line-height: 0.427rem;
          margin-top: 0.133rem;
          @include left;

          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }

      .slide-contents-book-progress-wrapper {
        flex: 0 0 3.2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .slide-contents-book-progress {
          .progress {
            font-size: 0.213rem;
          }

          .progress-text {
            font-size: 0.213rem;
          }
        }

        .slide-contents-book-time {
          font-size: 0.213rem;
          margin-top: 0.133rem;
        }
      }
    }

    .slide-contents-list {
      padding: 0 0.4rem;
      box-sizing: border-box;

      .slide-contents-item {
        display: flex;
        padding: 0.533rem 0;
        box-sizing: border-box;

        .slide-contents-item-label {
          flex: 1;
          font-size: 0.373rem;
          line-height: 0.427rem;
          @include ellipsis;
        }

        .slide-contents-item-page {
          flex: 0 0 0.8rem;
          font-size: 0.267rem;
          @include right;
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 0.4rem;
      box-sizing: border-box;
      .slide-search-item {
        font-size: 0.373rem;
        line-height: 0.427rem;
        padding: 0.533rem 0;
        box-sizing: border-box;
      }
    }
  }
</style>
