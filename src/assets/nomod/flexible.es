/**
 * @file rem
 * @author zxl(zhangxianlong@baidu.com)
 */

// flexible_css.js
(function () {
    // flexible.css
    var cssText = '' + '@charset \"utf-8\";html{color:#000;background:#fff;overflow-y:scroll;';
    cssText += '-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}';
    cssText += 'html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}';
    cssText += 'html,body{font-family:sans-serif}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,';
    cssText += 'fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,';
    cssText += 'figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea';
    cssText += '{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}';
    cssText += 'abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,';
    cssText += 'caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}';
    cssText += 'caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,';
    cssText += 'q:after{content:""}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}';
    cssText += 'sup{top:-.5em}sub{bottom:-.25em}ins,a{text-decoration:none}';
    // cssText end
    return;
    var styleEl = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    }
    else {
        try {
            styleEl.innerHTML = cssText;
        }
        catch (e) {
            styleEl.innerText = cssText;
        }
    }
}());
// flexibel.js
(function (win, lib) {
    var CG = CONFIG || {};
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    var psdWidth = CG.psdWidth || 720;
    // 540
    var maxWidth = CG.maxWidth || 0;

    if (metaEl) {
        // console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale, 10);
        }
    }
    else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }

            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            }
            else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            }
            else {
                dpr = 1;
            }
        }
        else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        var content = 'initial-scale=' + scale + ', maximum-scale=';
        content += scale + ', minimum-scale=' + scale + ', user-scalable=no';
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', content);
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        }
        else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (maxWidth && width / dpr > maxWidth) {
            width = maxWidth * dpr;
        }

        // console.log('width', width, psdWidth);
        var rem = width * 100 / psdWidth;
        rem = Math.floor(rem * 100) / 100;
        // 四舍五入，并且保留两位小数
        docEl.style.fontSize = rem + 'px';
        flexible.rem = rem;
    }

    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }

    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    }
    else {
        doc.addEventListener('DOMContentLoaded', function (e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();

    flexible.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }

        return val;
    };
    flexible.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }

        return val;
    };

})(window, window.H || (window.H = {}));
