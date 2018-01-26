/**
 * @file 基础类库集合
 * @desc 包括常用的基础类库，如统计、cookie、offset等
 */
var comm = {
    // 页面初始化
    pageInit: function() {
    },
    // 浏览器探测
    detect: function() {
        var ua = navigator.userAgent.toLowerCase();
        var res = { name: 'default' };
        var arr = ['huawei', 'QQBrowser'];

        arr.forEach(function(v) {
            if (ua.indexOf(v.toLowerCase()) !== -1) {
                res.name = v;
                return res;
            }
        })
        return res;
    },
    // cookie操作
    cookie: {
        get: function(name) {
            var cookieArr = document.cookie.split('; ');
            for (var i = 0, len = cookieArr.length; i < len; i++) {
                var arr = cookieArr[i].split('=');
                if (arr[0] === name) {
                    return decodeURIComponent(arr[1]);
                }
            }
            return '';
        },
        set: function(name, value, days) {
            var time = new Date();
            var days = days || 1;
            time.setTime(time.getTime() + days * 86400000);
            document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + time.toGMTString() + ';path=/;';
        },
        del: function(name) {
            document.cookie = name + '=;expires=' + (new Date(0)).toGMTString();
        }
    },
    /* @desc 动态添加dom资源，并且支持通过id排重
     * @para {String} tagId dom元素id
     * @para {String} con dom元素的内容
     * @para {String} type dom元素的类型，如script、style；如果type为空，则默认插入html
     * @example loadDom('search1_css', '.search tag{color: #ff6300;}', 'style');
     * @example loadDom('search1_js', 'console.log()', 'script');
     * @example loadDom('search1_html', '<div class="search"></div>');
     */
    loadDom: function(tagId, con, type) {
        if (!con) {
            return;
        }
        var tag = document.getElementById(tagId);

        if (type && !tag) {
            tag = document.createElement(type);
            tag.setAttribute('id', tagId);
            tag.innerHTML = con;
            document.body.appendChild(tag);
        } else {
            !!tag && (tag.innerHTML = con);
        }
    },
    // 获取分享链接：QQ、微博
    // @para opt= {linkUrl:'',title:'',content:'',iconUrl:''}
    // @return {qzone: '', weibo: ''}
    share: function(opt) {
        var res = {};
        var opt = opt || {};
        var qqUrl;

        opt.linkUrl = encodeURIComponent(opt.linkUrl);
        opt.iconUrl = encodeURIComponent(opt.iconUrl);
        opt.content = encodeURIComponent(opt.content);
        opt.title = encodeURIComponent(opt.title);
        opt.succUrl = encodeURIComponent(window.location.href);

        var qqUrl = `url=${opt.linkUrl}&successurl=${opt.succUrl}&summary=${opt.content}&title=${opt.title}&pics=${opt.iconUrl}`;
        res.qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + qqUrl;
        res.weibo = `http://s.share.baidu.com?url=${opt.linkUrl}&to=tsina&title=${opt.title}&pic=${opt.iconUrl}`;
        return res;
    },
    // 视口宽度、高度；一次获取并储存到全局变量，避免多次获取导致浏览器重排
    offset: function() {
        var screenChange = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        window.CONFIG = window.CONFIG || {};

        function changeOffset() {
            CONFIG.offset = {
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight
            }
        };
        if (!CONFIG.offset) {
            $(window).on(screenChange, changeOffset);
            changeOffset();
        }
    },
    /* @desc 获取截止到某天23:59:59的日期
     * @para {int} addDays 增加的天数
     * @example 如要求只在当天显示某个元素，getDate()
     */
    getDate: function(addDays = 0) {
        var nDate = new Date();
        var resDate = new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + addDays, 23, 59, 59);
        return resDate;
    },
    // 获取操作系统版本
    getOsname: function() {
        var isAndroid = new RegExp('Android|Linux', 'i');
        return isAndroid.test(navigator.userAgent) ? 'android' : 'iphone';
    },
    // HTML编码
    encodeHtml: function(s) {
        return (typeof s != "string") ? s :
            s.replace(/"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,
                function($0) {
                    var c = $0.charCodeAt(0),
                        r = ["&#"];
                    c = (c == 0x20) ? 0xA0 : c;
                    r.push(c);
                    r.push(";");
                    return r.join("");
                });
    },
    // 判断localStorage支持性
    haoIsJudge: function() {
        if (!'localStorage' in window) return false;
        try {
            var ls = localStorage,
                num = new Date().getTime();
            ls.setItem(num, '1');
            if (ls.getItem(num) === '1') {
                ls.removeItem(num);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },
    // url解析
    url: {
        search: function(url, name) {
            var result = '';
            var reg = new RegExp('(^|&|/?)' + name + '=([^&]*)(&|$)');
            var r = url.match(reg);
            if (r != null) {
                result = r[2];
            }
            return result;
        },
        remove: function(url, name) {
            var result = '';
            var reg = new RegExp('(/?|&)' + name + '=([^&]*)(&|$)');
            !!reg && (url = url.replace(reg, ''));
            return url;
        },
        replace: function(url, name, newValue) {
            var result = '';
            var reg = new RegExp('(^|&|/?)' + name + '=([^&]*)(&|$)');
            var r = url.match(reg);
            if (r != null) {
                result = r[2];
            }
            url = url.replace(name + '=' + result, name + '=' + newValue);
            return url;
        }
    },
    isArray: Array.isArray || function(object) { return object instanceof Array },
}

module.exports = comm;