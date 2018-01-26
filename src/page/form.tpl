<!-- 
	表单-demo，入口html
@desc 
	使用vue全家桶，实现spa应用
	实现了页面之间的动画切换
	支持页面缓存
	
-->

{* extends './layout.tpl' *}
<!-- 初始化数据 -->
{* set title = 'form-test' *}
{* set debug = true *}
<!-- head -->
{* block head_res *}
	<script>
		var CONFIG = CONFIG || {};
		CONFIG.psdWidth = 750;
		CONFIG.debug = {{debug}};
	</script><!--ignore-->
{* endblock *}
{* block body_content *}
{* endblock *}
<!-- body -->
{* block body_res *}
	<script src="assets/lib/vue-router"></script>
	<script src="assets/lib/vuex"></script>
	<script src="assets/page/form"></script>
{* endblock *}
