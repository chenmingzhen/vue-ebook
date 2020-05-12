<template>
  <!-- 书城首页组件 -->
  <div class="store-home">
    <search-bar></search-bar>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
    <flap-card :data="random"></flap-card>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar';
  import scroll from '../../components/common/scroll';
  import { storeHomeMixin } from '../../utils/mixin';
  import FlapCard from '../../components/home/FlapCard';
  import { home } from '../../api/store';
  import GuessYouLike from '../../components/home/GuessYouLike';
  import Recommend from '../../components/home/Recommend';
  import Featured from '../../components/home/Featured';
  import CategoryBook from '../../components/home/CategoryBook';
  import Category from '../../components/home/Category';
  export default {
    name: 'StoreHome',
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      scroll,
      FlapCard,
      GuessYouLike,
      Recommend,
      Featured,
      CategoryBook,
      Category
    },
    data() {
      return {
        scrollTop: 94,
        random: null,
        banner: '',
        guessYouLike: null,
        recommend: null,
        featured: null,
        categoryList: null,
        categories: null
      };
    },
    methods: {
      // 处理滚动事件
      onScroll(offsetY) {
        // 设置vuex的offsetY
        // SearchBar组件会进行监听
        this.setOffsetY(offsetY);
        if (offsetY > 0) {
          // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
          this.scrollTop = 42;
        } else {
          // 如果滚动为0，则显示标题，滚动条距顶部为94像素
          this.scrollTop = 62.75;
        }
        // 更新滚动条 重新计算top
        this.$refs.scroll.refresh();
      }
    },
    mounted() {
      // 通过API获取首页数据
      home().then(response => {
        if (response && response.status === 200) {
          const data = response.data;
          const randomIndex = Math.floor(Math.random() * data.random.length);
          this.random = data.random[randomIndex];
          this.banner = data.banner;
          this.guessYouLike = data.guessYouLike;
          this.recommend = data.recommend;
          this.featured = data.featured;
          this.categoryList = data.categoryList;
          this.categories = data.categories;
        }
      });
    }
  };
</script>

<style lang="scss" scoped>
  .store-home {
    width: 100%;
    height: 100%;

    .banner-wrapper {
      width: 100%;
      padding: 0.267rem;
      box-sizing: border-box;

      .banner-img {
        width: 100%;
        height: 4rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .recommend{
      margin-top: 0.533rem;
    }
    .featured{
      margin-top: 0.533rem;
    }
    .category-list-wrapper {
      margin-top: 0.533rem;
    }
    .categories {
      margin-top: 0.533rem;
    }
  }
</style>
