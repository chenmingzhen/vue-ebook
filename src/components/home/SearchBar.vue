<template>
  <div class="search-bar">
    <div class="search-bar-title-wrapper">
      <div class="title-text-wrapper">
        <span class="title-text title">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper">
        <span class="icon-shake icon"></span>
      </div>
    </div>
    <div class="title-icon-back-wrapper">
      <span class="icon-back icon"></span>
    </div>
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text" class="input" :placeholder="$t('home.hint')">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar'
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
      height: 1.12rem;
      @include center;
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
      .search-bar-input{
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
        .input{
          width: 100%;
          height: 1.173rem;
          border: none;
          background: transparent;
          margin-left: 0.267rem;
          font-size: 0.64rem;
          color: #666;
          &:focus{
            outline: none;
          }
          &::-webkit-input-placeholder{
            color: #ccc;
          }
        }
      }
    }
  }
</style>
