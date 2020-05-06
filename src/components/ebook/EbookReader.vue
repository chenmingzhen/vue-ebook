<template>
  <div class="ebook-reader">
    <div id="book">
    </div>
  </div>
</template>
<script>
  import { ebookMixin } from '../../utils/mixin';
  import Epub from 'epubjs';
  import {
    getFontFamily,
    saveFontFamily,
    getFontSize,
    saveFontSize,
    getTheme,
    saveTheme,
    getLocation
  } from '../../utils/localStorage';
  import { flatten } from '../../utils/book';

  global.ePub = Epub;
  export default {
    name: 'ebookReader',
    mixins: [ebookMixin],
    methods: {
      initEpub() {
        // const url = 'http://192.168.1.104:8081/epub/' + this.fileName + '.epub';
        const url = `${process.env.VUE_APP_RES_URL}/epub/${this.fileName}.epub`;
        this.book = new Epub(url);
        this.setCurrentBook(this.book);
        this.initRendition();
        this.parseBook();
        this.rendition.on('touchstart', e => {
          this.touchStartX = e.changedTouches[0].clientX;
          this.touchStartTime = e.timeStamp;
        });
        this.rendition.on('touchend', e => {
          const offsetX = e.changedTouches[0].clientX - this.touchStartX;
          const time = e.timeStamp - this.touchStartTime;
          if (time < 500 && offsetX > 40) {
            this.prevPage();
          } else if (time < 500 && offsetX < -40) {
            this.nextPage();
          } else {
            this.toggleTitleAndMenu();
          }
          e.preventDefault();
          e.stopPropagation();
        });
        this.book.ready.then(() => {
          return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16));
        }).then(locations => {
          // 做好分页再调用一次
          this.refreshLocation();
          this.setBookAvailable(true);
        });
      },
      prevPage() {
        if (this.rendition) {
          this.rendition.prev();
          this.hideTitleAndMenu();
        }
      },
      nextPage() {
        if (this.rendition) {
          this.rendition.next();
          this.hideTitleAndMenu();
        }
      },
      toggleTitleAndMenu() {
        // this.$store.dispatch('setMenuVisible', !this.menuVisible);
        if (this.menuVisible) {
          this.setSettingVisible(-1);
          this.setFontFamilyVisible(false);
        }
        this.setMenuVisible(!this.menuVisible);
      },
      initRendition() {
        this.rendition = this.book.renderTo('book', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        });
        const location = getLocation(this.fileName);
        this.display(location, () => {
          this.initFontFamily();
          this.initFontSize();
          this.initTheme();
          this.initGlobalStyle();
        });
        // 更换字体渲染
        this.rendition.hooks.content.register(contents => {
          // 返回的全部是Promise对象 可用Promise.all管理 做后续的事情
          Promise.all(
            [contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)],
            [contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`)],
            [contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`)],
            [contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)]
          ).then(() => {
            console.log('字体全部加载完毕');
          });
        });
      },
      initFontSize() {
        const fontSize = getFontSize(this.fileName);
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize);
        } else {
          this.rendition.themes.fontSize(fontSize);
          this.setDefaultFontSize(fontSize);
        }
      },
      initFontFamily() {
        const font = getFontFamily(this.fileName);
        if (!font) {
          saveFontFamily(this.fileName, this.defaultFontFamily);
        } else {
          this.rendition.themes.font(font);
          this.setDefaultFontFamily(font);
        }
      },
      initTheme() {
        let defaultTheme = getTheme(this.fileName);
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name;
          saveTheme(this.fileName, defaultTheme);
        }
        this.setDefaultTheme(defaultTheme);
        // 注册主题
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style);
        });
        this.rendition.themes.select(defaultTheme);
      },
      // 解析出书籍的图片 标题作者
      parseBook() {
        this.book.loaded.cover.then(cover => {
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url);
          });
        });
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata);
        });
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc);
          // console.log(navItem);
          function find(item, level = 0) {
            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level);
          }
          // 找到每个nav所属的目录级别
          navItem.forEach(item => {
            item.level = find(item);
          });
          this.setNavigation(navItem);
        });
      }
    },
    mounted() {
      /* this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/')).then(() => {
        this.initEpub();
      }); */
      this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
        this.initEpub();
      });
    }
  };
</script>

<style scoped>

</style>
