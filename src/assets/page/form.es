// 入口页面
import App from 'component/page/form/app';
// 二级页面
import list from 'component/page/form/list';
import addpage from 'component/page/form/addpage';
import editpage from 'component/page/form/editpage';
// 测试数据
import data from 'assets/data/form';

(function init() {
    setData(data);
})();

function setData(res) {
    Vue.config.debug = true;

    // 定义router
    Vue.use(VueRouter);
    const router = new VueRouter({
        routes: [
            {
                path: '/',
                component: list
            },
            {
                name: 'add',
                path: '/addpage',
                component: addpage
            },
            {
                name: 'edit',
                path: '/editpage',
                component: editpage
            }
        ]
    });

    // 定义全局store
    Vue.use(Vuex);
    var store = new Vuex.Store({
        state: {
            key: 0,
            list: data.list
        },
        mutations: {
            add: (state, val) => state.list.push(val),
            remove: state => state.list.splice(state.key, 1),
            edit: (state, val) => state.list.splice(state.key, 1, val),
            setKey: (state, key) => state.key = key
        }
    });

    App.data = res;
    App.router = router;
    App.store = store;
    new Vue(App).$mount('#app');
}
