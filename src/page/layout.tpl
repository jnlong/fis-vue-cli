<!--
 * @module page/layout.tpl
 * @desc 统一layout（通过fis插件fis-parser-swig2实现）
    支持设置title、keywords、description
    支持dp监控设置
    支持vue开关
    支持rem开关
    支持dubug开关
 -->

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>
        {* if isCustomeTitle *}
            {%$ROOT.TITLE%}
        {* else*}
            {{ title||'wise-test-demo' }}
        {* endif *}
    </title>
    <link rel="dns-prefetch" href="https://m.xx.com">
	<meta content="telephone=no" name="format-detection">
	<meta name="keywords" content="{{ keywords||'keywords' }}">
	<meta name="description" content="{{ description||'description' }}">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
	<meta name="referrer" content="always">
	<link rel="apple-touch-icon-precomposed" href="xx.png">
    {* if debug *}
        <script>
            var CONFIG = {
                islogged: false,
                debug: true
            };
        </script><!--ignore-->
    {* else *}
        <script>{%$ROOT.CONFIG%}</script><!--ignore-->
        <script>CONFIG.debug = false;</script><!--ignore-->
    {* endif *}
	{* block head_res *}{* endblock *}
    {* if hasRem *}
        <script src="assets/nomod/flexible"></script><!--ignore-->
    {* endif *}    
    {* if baiduTj *}
        <link rel="import" type="text/css" href="component/tpl/baiduTj.tpl?__inline">
    {* endif *}
</head>
<body>
    {* block body_content *}{* endblock *}
    <div id="app"></div>
	<script src="/assets/lib/mod"></script><!--ignore-->
    <script src="assets/lib/vue"></script><!--ignore-->
    <script>
        if (!CONFIG.debug){
            // 取消vue日志与警告
            Vue.config.silent = true;
            Vue.config.devtools = false;
        }
    </script><!--ignore-->
    <script src="assets/lib/zepto"></script><!--ignore-->
    {* block body_res *}{* endblock *}
</body>
</html>