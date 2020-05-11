<template>
    <div class="recommend">
      <title-view :label="$t('home.recommend')" :btn="$t('home.seeAll')"></title-view>
      <div class="recommend-list">
        <div class="recommend-item" v-for="(item, index) in data" :key="index" @click="showBookDetail(item)">
          <div class="img-wrapper">
            <img :src="item.cover" alt="" class="img">
          </div>
          <div class="content-wrapper">
            <div class="title title-medium" ref="title">{{item.title}}</div>
            <div class="num sub-title" ref="num">{{$t('home.readers').replace('$1', item.readers)}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import TitleView from './Title';
  import { storeHomeMixin } from '../../utils/mixin';
  export default {
    name: 'Recommend',
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .recommend{
    .recommend-list{
      width: 100%;
      @include top;
      padding: 0 0.133rem;
      box-sizing: border-box;
      .recommend-item{
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 0.133rem;
        box-sizing: border-box;
        .img-wrapper{
          @include center;
          .img {
            width: 80%;
          }
        }
        .content-wrapper{
          width: 100%;
          margin-top: 0.267rem;
          @include columnCenter;
          .title{
            text-align: center;
          }
          .num{
            margin-top: 0.133rem;
          }
        }
      }
    }
  }
</style>
