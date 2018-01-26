<!--
 * @module component/page/form/editpage
 * @desc 编辑页面
 * @param 
 *
 * example <editpage></editpage>
 -->

<style lang="less">
	.editpage {
	}
</style>

<template>
	<div class="editpage">
		<div>
			<input class="cn_input" type="text" placeholder="请输入内容"
                v-model="val">
		</div>
		<span class="cn_btn"
            @click="update">更新</span>
	</div>
</template>

<script>
	module.exports =  {
        props: {
            proVal: {
                type: String
            }
        },
        created(){
        },
        computed: {
            itemkey () {
                return this.$store.state.key;
            },
            list () {
                return this.$store.state.list;
            }
        },
        // 监听路由守卫，通过回调来更新页面数据
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.val = vm.list[vm.itemkey];
            });
        },
        data: function() {
        	return {
                val: ''
        	}
        },
        methods: {
        	update: function() {
                // 更新store的key
                this.$store.commit('setKey', this.itemkey);
                // 执行更新操作
        		this.val && this.$store.commit('edit', this.val);
                // 返回首页
        		this.$router.push('/');
        	}
        },
        mounted: function(){
        }
    }
</script>