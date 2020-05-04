<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible===1">
      <div class="setting-theme">
        <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
          <div class="preview" :class="{'selected':item.name===defaultTheme}"
               :style="{background:item.style.body.background}"></div>
          <div class="text" :class="{'selected':item.name===defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin';
  import { saveTheme } from '../../utils/localStorage';

  export default {
    name: 'EbookSettingTheme',
    methods: {
      setTheme(index) {
        const theme = this.themeList[index];
        this.setDefaultTheme(theme.name).then(() => {
          this.currentBook.rendition.themes.select(this.defaultTheme);
          this.initGlobalStyle();
        });
        saveTheme(this.fileName, theme.name);
      }
    },
    mixins: [ebookMixin]
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: 1.28rem;
    left: 0;
    z-index: 160;
    width: 100%;
    height: 2.4rem;
    background: white;
    box-shadow: 0 -0.213rem 0.213rem rgba(0, 0, 0, .15);

    .setting-theme {
      height: 100%;
      display: flex;

      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0.133rem;
        box-sizing: border-box;

        .preview {
          flex: 1;
          border: 0.027rem solid #ccc;
          box-sizing: border-box;

          &.selected {
            box-shadow: 0 0.107rem 0.16rem 0 rgba(0, 0, 0, .1);
          }
        }

        .text {
          flex: 0 0 0.533rem;
          font-size: 0.373rem;
          color: #ccc;
          @include center;

          &.selected {
            color: #333;
          }
        }
      }
    }
  }
</style>
