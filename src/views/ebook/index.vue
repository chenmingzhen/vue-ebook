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
  import { getReadTime, saveReadTime } from '../../utils/localStorage';
  import { ebookMixin } from '../../utils/mixin';

  export default {
    name: 'index',
    mixins: [ebookMixin],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    methods: {
      startLoopReadTime() {
        let readTime = getReadTime(this.fileName);
        if (!readTime) {
          // 如果阅读时间不存在，则进行重置
          readTime = 0;
        }
        // 开启定时任务，每秒更新一次阅读时间，每30秒记录一次阅读时间
        this.task = setInterval(() => {
          readTime++;
          if (readTime % 30 === 0) {
            saveReadTime(this.fileName, readTime);
          }
        }, 1000);
      }
    },
    mounted() {
      // 开启记录阅读时间的定时任务
      this.startLoopReadTime();
    },
    beforeDestroy() {
      if (this.task) {
        // 关闭定时任务
        clearInterval(this.task);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
