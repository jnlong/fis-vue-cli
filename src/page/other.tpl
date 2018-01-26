<!-- 
	第二个页面，入口html
-->

{* extends './layout.tpl' *}
<!-- 初始化数据 -->
{* set title = 'other-page' *}
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
	<script src="assets/page/other"></script>
{* endblock *}
