<template>
  <div id="app">
    <i class="icon-bookmark"></i>
    <span class="test">AAA</span>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  const getters = {
    a: () => 1,
    b: () => 2
  };

  function fn(keys) {
    const data = {};
    keys.forEach(key => {
      /* if (getters.hasOwnProperty(key)) {
        data[key] = getters[key];
      } */
      if (Object.prototype.hasOwnProperty.call(getters, key)) { // 判断是否存在属性
        data[key] = getters[key];
      }
    });
    return data;
  }

  export default {
    mounted() {
      this.$store.dispatch('setTest', 10).then(() => {
        console.log(this.$store.state.book.test);
        /* console.log(this.test);
        console.log(this.a, this.b); */
      });
      console.log(this.a, this.b);
    },
    computed: {
      ...mapGetters(['test']),
      ...fn(['a', 'b'])
    }
  };
  /* document.addEventListener('DOMContentLoaded', () => {
    // 获取HTML元素
    const html = document.querySelector('html');
    // 根据屏幕宽度动态计算fontSize
    let fontSize = window.innerWidth / 10;
    // 当fontSize大于50时，设置最大值为50
    fontSize = fontSize > 50 ? 50 : fontSize;
    // 设置html的fontSize属性，使rem生效，1rem = fontSize + 'px'
    html.style.fontSize = fontSize + 'px';
  }); */
  (function () {
    function a() {
      let b = document.documentElement.clientWidth;
      b = b > 750 ? 750 : b;
      const c = b / 750 * 50;
      document.getElementsByTagName('html')[0].style.fontSize = c + 'px';
    }

    a();
    window.onresize = a;
  })();
</script>
<style>
  .test {
    font-size: 1rem;
  }
</style>
