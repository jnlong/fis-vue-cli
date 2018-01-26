#fis-vue-demo
使用vue全家桶，结合fis实现spa（单页面）开发。

# 安装
## 下载
```git clone```

## 安装fis3
```npm install fis3 -g```

## 安装npm依赖包
```
	cd fis-vue-demo/src
	npm install
```
## 开启fis server服务
fis3 server start

## 执行fis编译
npm run dev

## 访问
http://127.0.0.1:8080/page/fis-vue-cli/form.html

# 功能
根据不同需求，可以同时支持单页面和多页面开发。
## 模块化
使用commonjs思想，支持js和css的模块化

## 多页面
根据page目录的tpl自动打包依赖，支持多入口页面；
使用的插件：fis3-postpackager-loader，以page目录下的tpl作为入口页面，实现多页面、按需打包；

## SPA
使用了vue-router，通过demo介绍单页面应用的开发;
支持页面切换动画；
使用了```<keep-alive>```实现缓存页面功能，避免重复渲染页面；

## store
使用了vuex，通过demo介绍了vuex的常用功能

## vue单文件
使用的插件：fis3-parser-vue-component，支持vue单文件解析和按需打包；

## es6
支持es6语法

## less
支持less语法

## css自动转换
使用插件：fis3-postprocessor-autoprefixer，自动为css添加前缀。
如css中使用```transform: translate(-100%, 0);```，fis编译后```-webkit-transform: translate(-100%, 0);transform: translate(-100%, 0);```

## rem
支持rem开发，并且优化了类库flexible；
步骤如下：

* 在tpl页面设置psd文档宽度：```CONFIG.psdWidth = 750;```
* 在tpl页面设置，开启rem```{* set hasRem = true *}```
* css布局时，直接使用rem作为单位；单位换算rem=psd测量的元素尺寸/100；
如设计稿测量一个元素宽度为60，高度为30，则css为```div{width: 0.6rem; height: 0.3rem;}```;

## 图片延迟加载
封装了图片延迟类库lazyImg.js。
并且优化了性能，缓存图片列表，避免每次window.scroll事件中查找所有img(如 $('img[data-lazy],iframe[data-lazy]'))；如果存在异步加载的图片资源，只需调用一次。调用方法如下：
```
import lazyImg from assets/comm/lazyImg;
// 首屏和同步图片
window.LazyImg = new lazyImg();
// 异步图片资源
$.ajax({
	url: 'xxx',
	success: function(){
		// 数据处理
		LazyImg.setImages(); // 重新获取需要延迟加载的图片列表
	}
})

```

## 代码结构
├── assets 静态资源
│   ├── comm 公共js库
│   │   ├── comm.es
│   │   └── lazyImg.es
│   ├── css
│   │   └── base 公共css库
│   │       ├── comm.less
│   │       ├── flexible.less
│   │       ├── reset.less
│   │       └── swiper.less
│   ├── data 测试数据
│   │   └── form.es
│   ├── img
│   ├── lib 第三方类库
│   │   ├── d3.3.5.js
│   │   ├── d3.4.12.js
│   │   ├── fastClick.js
│   │   ├── iscroll-lite5.js
│   │   ├── mod.js
│   │   ├── swiper.js
│   │   ├── vue-router.js
│   │   ├── vue.js
│   │   ├── vuex.js
│   │   └── zepto.js
│   ├── nomod 不需要模块化的资源
│   │   └── flexible.es
│   └── page 页面入口js
│       └── form.es
│       └── other.es
├── component vue组件
│   ├── comm  公共组件
│   ├── page  业务相关组件
│   │   ├── form 第一个页面（spa）
│   │   │   ├── addpage.vue
│   │   │   ├── app.vue
│   │   │   ├── editpage.vue
│   │   │   └── list.vue
│   │   └── other 第二个页面（非spa）
│   │       └── index.vue
│   └── tpl 可以服用的静态模板
│       └── baiduTj.tpl
├── fis-conf.js fis配置文件
├── package.json npm配置文件
└── page   html文件
    ├── form.tpl   页面对应的html
    ├── other.tpl   页面对应的html
    └── layout.tpl 公共的layout模板

