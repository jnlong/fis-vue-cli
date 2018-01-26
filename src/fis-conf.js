/*
 * @file fis配置文件
 * @desc 支持生产环境、测试服务器环境、本地环境的发布
 */

var path = require('path');
var media = fis.project.currentMedia();
var isDebug = (['pro','pro-https'].indexOf(media) == -1);

// 当前工程的命名空间
var namespace = 'fis-vue-cli';

// 需要构建的文件
fis.set('project.fileType.text', 'vue');
fis.set('project.ignore', fis.get('project.ignore').concat([
    'output/**', 'DS_store','package*.json', 'debug.log', '*.md'
]));

fis.match('page/**.tpl',{
    rExt: '.html',
    parser: fis.plugin('swig2', {tagControls: ['{*', '*}']}),
    optimizer: fis.plugin('minifier')
});

// 模块化支持插件
fis.hook('commonjs', {
    extList: ['.js', '.coffee', '.es', '.jsx', '.vue'],
    umd2commonjs: true,
    ignoreDependencies: []
});

// 编译vue组件
fis.match('*.vue', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('vue-component', {
            styleNameJoin: '',
            extractCSS: true,
            ccssScopedFlag: '__vuec__', //__vuec__
        }),
        fis.plugin('babel-6.x', {
            presets: ['es2015-loose', 'react', 'stage-3']
        }),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});

// 编译es6
fis.match('*.{js,es}', {
    isMod: true,
    rExt: 'js',
    useSameNameRequire: true,
    parser: [
        fis.plugin('babel-6.x', {
            presets: ['es2015-loose', 'react', 'stage-3']
        }),
        fis.plugin('translate-es3ify', null, 'append')
    ]
});

// 编译less
fis.match('{*.vue:less,*.less}', {
    rExt: 'css',
    parser: fis.plugin('less-2.x'),
    postprocessor: fis.plugin("autoprefixer", {
        "browsers": ['Safari >= 6', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
        "flexboxfixer": true,
        "gradientfixer": true
    })
});

// 非模块文件
fis.match('/assets/lib/**.{js,es}', {
    parser: null,
    isMod: false
});
fis.match('/assets/{page,nomod}/**.{js,es}', {
    isMod: false
});

// 打包
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: {
            ignore: ['/assets/lib/**.{js,es}', 'node_modules/**', '/assets/css/base/**'],
        }
    })
});

// 使用命名空间，解决多工程之间的目录冲突
fis.match("({page,component})/(**)", {
    release: '$1/' + namespace + '/$2'
});
fis.match("assets/(**)", {
    release: 'assets/' + namespace + '/$1'
});
fis.match("pkg/**.{js,css,png,jpg,gif}", {
    release: '/assets/' + namespace + '/$0'
});

fis.match('{debug.log,package*.json,fis-conf*.js}', {
    release: false
});

// 生产环境
if (!isDebug) {
    fis.match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
    // 图片压缩
    .match('*.{png,jpg}', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant'
        })
    })
    // js压缩
    .match('*.{js,es,vue}', {
        optimizer: fis.plugin('uglify-js', {
            compress: {
                drop_console: true
            }
        })
    })
    // cdn转换
    .match('*.{js,es,css,less,sass,jpg,jpeg,png,gif}', {
        useHash: true,
        domain: 'https://xx.xxstatic.com/'
    });
}

