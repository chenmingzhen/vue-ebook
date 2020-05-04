<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
