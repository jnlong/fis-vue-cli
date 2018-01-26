<!--
 * @module component/page/form/app.vue
 * @desc 表单-demo，入口页面
 -->

<style lang="less">
    @import "assets/css/base/comm.less";
    body {
        font-size: 16px;
    }
    .left-enter-active {
      animation: left-in .5s;
    }
    .left-leave-active {
      // animation: left-in .5s reverse;
    }
    @keyframes left-in {
      0% {
        transform: translate(-100%,0);
      }
      100% {
        transform: translate(0);
      }
    }
    .main {
        nav {
            display: flex;
            justify-content:  space-around;
            line-height: 30px;
            margin: 20px 15px;
            overflow: hidden;
            a {
                flex: 1; text-align: center;
                & + a{border-left: 1px solid #eee;}
            }
        }
    }
</style>

<template>
    <div class="main">
        <!-- 页面导航 -->
        <nav>
            <router-link :to="'/'">首页</router-link>
            <router-link :to="'/addpage'">增加</router-link>
        </nav>
        <!-- 页面切换动画 -->
        <transition name="left">
            <!-- 缓存页面 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
	module.exports =  {
        props: {
        },
        created(){
        },
        methods: {
        },
        mounted: function(){
        }
    }
</script>

