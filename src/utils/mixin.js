import { mapGetters, mapActions } from 'vuex';
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './book';
import { saveLocation, getBookmark } from './localStorage';
import { gotoBookDetail } from './store';

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    // 全局返回themeList
    themeList() {
      return themeList(this);
    },
    getSectionName() {
      return this.section ? this.navigation[this.section].label : '';
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle() {
      removeAllCss();
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`);
          break;
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`);
          break;
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`);
          break;
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`);
          break;
      }
    },
    display(target, cb) {
      console.log(this.currentBook);
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation();
          if (cb) cb();
        });
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation();
          if (cb) cb();
        });
      }
      // 等电子书可以解析出来就去掉
      if (cb) cb();
    },
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation();
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi;
        const progress = this.currentBook.locations.percentageFromCfi(startCfi);
        this.setProgress(Math.floor(progress * 100));
        this.setSection(currentLocation.start.index);
        saveLocation(this.fileName, startCfi);
        const bookmark = getBookmark(this.fileName);
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true);
          } else {
            this.setIsBookmark(false);
          }
        } else {
          this.setIsBookmark(false);
        }
      }
    },
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName));
    },
    hideTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuVisible(false);
    }
  }
};

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail(book) {
      gotoBookDetail(this, book);
    }
  }
};
