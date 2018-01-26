<style lang="less">
	.addpage {
	}
</style>

<template>
	<div class="addpage">
		<div>
			<input class="cn_input" type="text" placeholder="请输入内容"
             v-model="val">
		</div>
		<span class="cn_btn"
            @click="add">添加</span>
	</div>
</template>

<script>
	module.exports =  {
        props: {
            data: {}
        },
        created(){
        },
        computed: {
        	list () {
        		return this.$store.state.list;
        	}
        },
        watch: {
            // 监听全局路由变化
        	'$route'(to, from) {
        		// 因为首页使用了页面缓存，所以页面加载前，需要清除上次输入的内容
        		to.name === 'add' && (this.val = '');
        	}
        },
        data: function(){
        	return {
        		val: ''
        	}
        },
        methods: {
        	add: function() {
        		this.val && this.$store.commit('add', this.val);
        		this.$router.replace('/');
        	}
        },
        mounted: function(){
        }
    }
</script>