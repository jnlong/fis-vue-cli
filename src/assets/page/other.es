// 入口页面（非单页面）
import App from 'component/page/other/index';

(function init() {
    setData({});
})();

function setData(res) {
    Vue.config.debug = true;

    App.data = res;
    new Vue(App).$mount('#app');
}
