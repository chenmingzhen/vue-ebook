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
10. v-html进行搜索内容高亮
11. @keyup.enter手机按下回车执行的函数
12. 自定义滚动封装
13. @mousedown.left等鼠标事件
14. 利用占位div 利用flex实现搜索框变窄动画
15. this.$nextTick 将回调函数延迟在下一次dom更新数据后调用
16. mock数据模拟
17. vue标签中 直接使用vuex属性 不加this <shelf-list :data="shelfList"></shelf-list>
18. 增强数组方法
19. vuex中数组不使用setter也可以设置值 但是其他类型就不可以
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
6.模拟数据
    cnpm i mockjs --D
7.请求
    cnpm install --save axios
8.web离线存储
    cnpm install --save localforage
9. 让 Vue 组件通过 API 方式调用的插件
    cnpm i -S vue-create-api
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
4.没在main.js中引入mock/index.vue 无法取到数据
5.忽然电子书就解析不出来了
6.Popub注意动画的显示先后顺序 因为父容器有显示的条件 动画不在父容器上
```

TODO
```
1. 目录增加向左滑关闭目录功能 原理跟reader的滑动基本一致
2. 限制书签的下滑距离 
```
