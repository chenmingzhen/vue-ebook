<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
      <div class="shelf-footer-tab">
        <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 "></div>
        <div class="icon-download-remove tab-icon" v-if="false"></div>
        <div class="icon-move tab-icon" v-if="item.index === 3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
        <div class="tab-text" :class="{'remove-text': item.index === 4}">{{label(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin';
  import { saveBookShelf, removeLocalStorage } from '../../utils/localStorage';

  export default {
    name: 'ShelfFooter',
    mixins: [storeShelfMixin],
    data() {
      return {
        popupMenu: null
      };
    },
    computed: {
      tabs() {
        return [{
                  label: this.$t('shelf.private'),
                  label2: this.$t('shelf.noPrivate'),
                  index: 1
                },
                {
                  label: this.$t('shelf.download'),
                  label2: this.$t('shelf.delete'),
                  index: 2
                },
                {
                  label: this.$t('shelf.move'),
                  index: 3
                },
                {
                  label: this.$t('shelf.remove'),
                  index: 4
                }];
      },
      isSelected() {
        return this.shelfSelected && this.shelfSelected.length > 0;
      },
      isPrivate() {
        if (!this.isSelected) {
          return false;
        } else {
          return this.shelfSelected.every(item => item.private);
        }
      }
    },
    methods: {
      onTabClick(item) {
        if (!this.isSelected) {
          return;
        }
        switch (item.index) {
        case 1:
          this.showPrivate();
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
        }
      },
      label(item) {
        switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label;
        /* case 2:
            return this.isDownload ? item.label2 : item.label */
        default:
          return item.label;
        }
      },
      showPrivate() {
        // 不解 为什么可以直接在后面跟show  show方法不是没有返回值嘛？
        this.popupMenu = this.popup({
          title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
          btn: [{
            text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
            // 将事件传给组件 组件执行
            click: () => {
              this.setPrivate();
            }
          }]
        }).show();
      },
      setPrivate() {
        let isPrivate;
        if (this.isPrivate) {
          isPrivate = false;
        } else {
          isPrivate = true;
        }
        this.shelfSelected.forEach(book => {
          book.private = isPrivate;
        });
        this.onComplete();
        if (isPrivate) {
          this.simpleToast(this.$t('shelf.setPrivateSuccess'));
        } else {
          this.simpleToast(this.$t('shelf.closePrivateSuccess'));
        }
      },
      onComplete() {
        this.hidePopup();
        this.setIsEditMode(false);
        saveBookShelf(this.shelfList);
      },
      hidePopup() {
        this.popupMenu.hide();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);

    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;

      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include columnCenter;

        &.is-selected {
          opacity: 1;
        }

        .tab-icon {
          font-size: px2rem(20);
          color: #666;
        }

        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;

          &.remove-text {
            color: $color-pink;
          }
        }

        .icon-shelf {
          color: $color-pink;
        }
      }
    }
  }
</style>
