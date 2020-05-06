# EBook-WebApp
> [坐标](http://localhost:8080/#/ebook/History|2017_Book_InterdisciplinaryPerspectivesO)

## 第二次commit
```
1.导入字体图标 main.js全局引入
2.viewport设置和rem设置
```

## 要点
```
1. vue.config.js配置打包项目路径问题
2. 两种方式导入@font-face 
   Ⅰ public/index.html下 
        <link rel="stylesheet" href="<%= BASE_URL %>fonts/daysOne.css">
   Ⅱ main.js中以import的方式引入
3. 模块化使用vuex
4. Vue环境变量与模式 .env.development
    https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F
5. 语言切换
6. 主题切换 往head标签动态添加link css样式
7. 理解mixin 即可利用computed混合getters methods混合action 
   还可在methods中混合公共方法
8. 动画叠加 目录展开
9. vue component :is实现多个组件之间的切换
```

## 环境配置
```
1.epubjs
    vue ui中安装
2.vue中sass编译环境
    cnpm install --save-dev node-sass sass-loader@7.3.1
    cnpm install node-sass@latest
3.全局安装vue-devtools
    cnpm install -g @vue/devtools
    vue-devtools运行 记得线上测试把index中script的引入去掉
4.localstorage工具
    cnpm i --save web-storage-cache
5.语言切换
    cnpm i --save vue-i18n
```

## 填坑
```
1.修改Eslint配置要重启项目才生效
2.新版本的ESLint使用了禁止直接调用 Object.prototypes 
    getters为对象
    原本getters.hasOwnProperty(key)
    换成Object.prototype.hasOwnProperty.call(getters, key)
3.epubjs版本过高 无法执行on方法 卸载 重装
    cnpm install epubjs@0.3.71
```

TODO
```
1. 目录增加向左滑关闭目录功能 原理跟reader的滑动基本一致
```
