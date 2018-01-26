<style lang="less">
	.list{
		position: relative;
		margin: 20px 15px;
		.item {
			height: 40px;
			line-height: 40px;
			border-top: 1px solid #eee;

			.content {
				float: left;
			}
			.btn {
				float: right;
				position: relative;
				top: 5px;
				width: 60px;
				line-height: 30px;
				margin-left: 10px;
				text-align: center;
				border: 1px solid #eee;
			}
		}
	}
</style>

<template>
	<div class="list">
		<ul>
			<li
				class="item"
				v-for="(item, key) in list"
				:data-id="key">
				<span class="content">{{item}}</span>
				<span class="btn" @click="edit(key)">修改</span>
				<span class="btn" @click="remove(key)">删除</span></li>
		</ul>
		<router-link :to="'/addpage'" class="cn_btn" :data="data">添加</router-link>
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
        		console.log('list',this.$store.state.list);
        		return this.$store.state.list;
        	}
        },
        data: function(){
        	return {
        	}
        },
        methods: {
        	remove(key) {
        		// 更新store的key
        		this.store.commit('setKey', key);
        		// 执行删除操作
        		this.store.commit('remove');
        	},
        	edit(key) {
        		// 更新store的key
        		this.store.commit('setKey', key);
        		// 跳转到更新界面
        		this.$router.push({path: '/editpage', query: {proKey: key}});
        	}
        },
        mounted: function(){
        	this.store = this.$store;
        }
    }
</script>