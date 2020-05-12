<template>
  <div class="category">
    <title-view :label="$t('home.category')" :btn="$t('home.seeAll')" @onClick="showBookList"></title-view>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item, index) in data" :key="index" @click="showBookCategory(item)">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">{{categoryText(item.category)}}</div>
            <div class="num sub-title-tiny">{{item.num + ' ' + $t('home.books')}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img1">
              <img class="img2" :src="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title';
  import { categoryText, getCategoryName } from '../../utils/store';

  export default {
    name: 'Category',
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    methods: {
      showBookCategory(item) {
        this.$router.push({
          path: '/store/list',
          query: {
            category: getCategoryName(item.category),
            categoryText: this.categoryText(item.category)
          }
        });
      },
      categoryText(category) {
        return categoryText(category, this);
      },
      showBookList() {
        this.$router.push('/store/list');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .category {
    .category-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;

      .category-item-wrapper {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 0.133rem 0.267rem 0.133rem;
        box-sizing: border-box;

        &:nth-child(odd) {
          padding-left: 0.267rem;
        }

        &:nth-child(even) {
          padding-right: 0.267rem;
        }

        .category-item {
          display: flex;
          width: 100%;
          background: #eee;
          .img-wrapper {
            flex: 0 0 50%;
            width: 50%;
            padding: 0.533rem 0.267rem;
            box-sizing: border-box;
            .img-group {
              position: relative;
              width: 100%;
              height: 1.6rem;
              @include left;
              .img {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                width: 1.2rem;
                height: 1.6rem;
              }

              .img2 {
                position: absolute;
                left: 0.8rem;
                top: 0.2rem;
                z-index: 99;
                width: 0.8rem;
                height: 1.2rem;
              }
            }
          }
        }
      }
    }
  }
</style>
