<template>
  <div class="ebook">
    <!-- 阅读器标题组件 -->
    <ebook-title></ebook-title>
    <!-- 阅读器渲染组件 -->
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader';
  import EbookTitle from '../../components/ebook/EbookTitle';
  import EbookMenu from '../../components/ebook/EbookMenu';
  export default {
    name: 'index',
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    }
  };
</script>

<style lang="scss" scoped>

</style>
