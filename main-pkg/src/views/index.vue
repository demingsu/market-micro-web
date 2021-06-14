<template>
    <div v-if="isBlank" class="application-container">
        <router-view/>
    </div>
    <div v-else class="application-container">
        <aside>
            <div class="brand"></div>
            <div class="content">
                <el-menu default-active=""
                    class="el-menu-vertical-demo"
                    background-color="#001529"
                    text-color="rgba(255,255,255,.6)"
                    active-text-color="#fff"
                    @select="selectEvt"
                    :collapse="isCollapse">
                    <el-submenu v-for="it in menu" :index="it.id" :key="it.id">
                        <template slot="title">
                            <i :class="it.icon"></i>
                            <span slot="title">{{it.id}}</span>
                        </template>
                        <el-menu-item v-for="m in it.children" :index="m.id" :key="m.id">{{m.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </aside>
        <section>
            <header style="font-size: 1rem;color: #f00;">This is main application</header>
            <article v-show="!showContainer">
                <router-view/>
            </article>
            <article v-show="showContainer" id="applicationContent"></article>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                showContainer: false,
                isBlank: false,
                menu: [
                    {id: 'home', name: '看板', icon: 'el-icon-copy-document', children: [
                        {id: 'home-01', name: '数据看板', path: '/home'},
                        {id: 'home-02', name: '基础数据', path: '/base/user'}
                    ]},
                    {id: 'system', name: '系统管理', icon: 'el-icon-link', children: [
                        {id: 'system-01', name: '退出系统', path: '/login'}
                    ]}
                ]
            }
        },
        watch: {
            "$route.path": {
                immediate: true,
                handler(val) {
                    let route = this.$router.options.routes.find(oo => oo.path === val)
                    this.showContainer = !route
                    this.isBlank = !!route && !!route.meta && route.meta.isBlank
                }
            }
        },
        methods: {
            selectEvt(id) {
                let path = ''
                for (let it of this.menu) {
                    for (let item of it.children) {
                        if (item.id === id) {
                            path = item.path
                            break
                        }
                    }
                    if (!!path) break
                }

                if (!!path) this.$router.push(path)
            }
        }
    }
</script>