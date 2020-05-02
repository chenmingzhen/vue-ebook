# EBook-WebApp
> [地址](https://www.baidu.com)

## 第一次commit
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
```

## 环境配置
```
1.epubjs
    vue ui中安装
2.vue中sass编译环境
    cnpm install --save-dev node-sass sass-loader@7.3.1
3.全局安装vue-devtools
    cnpm install -g @vue/devtools
    vue-devtools运行 记得线上测试把index中script的引入去掉
```

## 填坑
```
1.修改Eslint配置要重启项目才生效
2.新版本的ESLint使用了禁止直接调用 Object.prototypes 
    getters为对象
    原本getters.hasOwnProperty(key)
    换成Object.prototype.hasOwnProperty.call(getters, key)
```
