
<template>
    <div class="dsvg">
        <h2 class="cn_title">svg</h2>
        <svg width="100%" height="400" version="1.1" xmlns="http://www.w3.org/200/svg">
            <!-- 矩形 -->
            <rect x="10" y="20" width="100" height="50"
            style="fill: steelblue;stroke:blue;stroke-width:4;opacity:0.5;"/>
            <rect x="160" y="20" width="100" height="50" rx="20" ry="50"
            style="fill: steelblue;stroke:blue;stroke-width:4;opacity:0.5;"/>
            <!-- 圆形、椭圆形 -->
            <circle cx="60" cy="140" r="50" 
            style="fill:yellow;stroke:black;stroke-width:4;"/>
            <ellipse cx="230" cy="140" rx="80" ry="50"
            style="fill:#33ff33; stroke:blue; stroke-width:4;"/>
            <!-- 线段 -->
            <line x1="20" y1="210" x2="300" y2="260" 
            style="stroke:black;stroke-width:4;"/>
        </svg>
        <svg width="100%" height="200" version="1.1" xmlns="http://www.w3.org/200/svg">
            <!-- 多边形、折线 -->
            <polygon points="100,20 20,90 60,160 140,160 180,90"
            style="fill:lawngreen;stroke:black;stroke-width:3;"/>
            <polyline points="280,20 200,90 240,160 320,160 360,90"
            style="fill:white;stroke:black;stroke-width:3;"/>
        </svg>
        <svg width="100%" height="800" version="1.1" xmlns="http://www.w3.org/200/svg">
            <defs>
                <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#F00"/>
                    <stop offset="50%" stop-color="#0F0"/>
                    <stop offset="100%" stop-color="#ff6300"/>
                </linearGradient>
            </defs>
            <rect fill="url(#myGradient)" x="10" y="10" width="300" height="100"/>
        </svg>
    </div>
</template>

<script>
	import comm from 'assets/comm/comm';

	module.exports =  {
        props: {
            data: {
                type: Array,
                function() {
                    return {};
                }
            },
        },
        created(){
        },
        data: function(){
        	return {
        	}
        },
        methods: {
        },
        mounted: function(){
        }
    }
</script>

<style lang="less">
    @import "assets/css/base/comm.less";
</style>
