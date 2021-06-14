// 通用配置选项
var configData = [
    {name: 'single-spa', url: 'http://localhost:26000/assets/js/source/single-spa.min.js'},
    {name: 'vue', url: 'http://localhost:26000/assets/js/source/vue.js'},
    {name: 'vue-router', url: 'http://localhost:26000/assets/js/source/vue-router.min.js'},
    {name: 'vuex', url: 'http://localhost:26000/assets/js/source/vuex.min.js'},
    {name: 'crypto', url: 'http://localhost:26000/assets/js/source/crypto-js.js'}
]

getConfig()

// 获取微前端配置信息并进行系统处理
function getConfig() {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://www.shuiyue.info/store/micro/config?free-token=' + Math.random())
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                // mock data
                var data = [
                    {urlPrefix: '/main', name: 'main', url: 'http://localhost:26001/js/app.js', isDefault: true},
                    {urlPrefix: '/base', name: 'base', url: 'http://localhost:26002/js/app.js'},
                    {urlPrefix: '/user', name: 'user', url: 'http://localhost:26003/js/app.js'},
                    {urlPrefix: '/product', name: 'product', url: 'http://localhost:26004/js/app.js'},
                    {urlPrefix: '/purchase', name: 'purchase', url: 'http://localhost:26005/js/app.js'},
                    {urlPrefix: '/receiving', name: 'receiving', url: 'http://localhost:26006/js/app.js'},
                    {urlPrefix: '/marketing', name: 'marketing', url: 'http://localhost:26007/js/app.js'}
                ]
                addSystemInfo([...data, ...configData])
            } else {
                alert('服务器错误，请重新进入系统')
            }
        }
    }
    xhr.send()
}

// 实现动态系统配置数据
function addSystemInfo(data) {
    var script = document.createElement('script'),
        sourceObj = data.reduce(function(nb, it) {
            nb[it.name] = it.url
            return nb
        }, {});

    script.type = 'systemjs-importmap';
    script.innerHTML = JSON.stringify({"imports": sourceObj});
    document.head.appendChild(script);

    setTimeout(function() {
        startFunc(data);
    })
}

// 启动单应用服务
function startFunc(config) {
    Promise.all([
        System.import('single-spa'),
        System.import('vue'),
        System.import('vue-router'),
        System.import('vuex'),
        System.import('crypto')
    ]).then(function (modules) {
        var singleSpa = modules[0],
            Vue = modules[1],
            VueRouter = modules[2],
            Vuex = modules[3],
            crypto = modules[4],
            storeCache = sessionStorage.getItem('secret-key') || ''

        // 注册使用路由和状态管理器插件
        Vue.use(VueRouter);
        Vue.use(Vuex);

        // 初始化应用的基本vuex缓存
        if (!!storeCache) {
            storeCache = crypto.AES.decrypt(storeCache, 'THIS-IS-MY-SECRET-KEY').toString(crypto.enc.Utf8)
        };

        var store = new Vuex.Store({
            state: {
                token: storeCache
            },
            getters: {
                getToken: state => state.token
            },
            mutations: {
                mutationToken: (state, t) => {
                    sessionStorage.setItem('secret-key', crypto.AES.encrypt(t, 'THIS-IS-MY-SECRET-KEY').toString())
                    state.token = t;
                }
            }
        });

        // 遍历注册应用
        for (let i = 0;i < config.length;i ++) {
            if (!!config[i].urlPrefix) singleSpa.registerApplication(
                config[i].name,
                () => System.import(config[i].name),
                location => {
                    return config[i].isDefault ? true : location.pathname.startsWith(config[i].urlPrefix)
                },
                {
                    rootStore: store,
                    getValue: function(getter) {
                        return store.getters[getter]
                    },
                    setValue: function(mutation, data) {
                        return store.commit(mutation, data)
                    }
                }
            )
        }

        // 启动服务
        singleSpa.start();

        // 添加事件监听
        addListener();
    })
}

function addListener() {
    window.addEventListener('single-spa:routing-event', evt => {
        console.log('=================================== routing-event start ===================================')
        console.log(evt.detail)
        console.log('=================================== routing-event end ===================================')
    })
}