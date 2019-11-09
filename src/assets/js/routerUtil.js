import Vue from 'vue'
import config from '../../config'
import { message } from 'ant-design-vue';
const axios = require('axios');

const redirectRoute  = {
    path: '*',
    name: '重定向',
    redirect:'/home'
}

const getUserInfo = (resolve, reject)=> {
    axios.get('/menus.json')
        .then((res) => {
            if(res.data.code == 0) {
                resolve(res.data.data)
            }else {
                reject(res.data.message)
            }
        })
        .catch((err) => {
            reject(err)
        })
}

const getRouterArr = {
    isRepeatLoad: false,
    getRouter(cb) {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        const $this = this
        let homeRouter = {
            path: '/home', 
            name: '首页', 
            component: () => import('@/views/Home'),
            hidden: false,
        }
        if(userInfo) {
            let data = userInfo.resList
            homeRouter.redirect = `/${data[0].key}/${data[0].children[0].key}`
            homeRouter.children = generator(data)
            typeof cb == 'function' && cb([homeRouter, redirectRoute])
        }else {
            new Promise(getUserInfo)
                .then((data) => {
                    homeRouter.redirect = `/${data[0].key}/${data[0].children[0].key}`
                    homeRouter.children = generator(data)
                    typeof cb == 'function' && cb([homeRouter, redirectRoute])
                })
                .catch((err) => {
                    message.error(err)
                })
        }
    }
}

const generator = (routerMap) => {
    let allRouter = []
    routerMap.map(item => {
        let itemRoute = (val, parent) => {
            const currentRouter = {
                // 路由地址 动态拼接生成如 /dashboard/workplace
                path: val.children? `/${val.key}`: `/${parent}/${val.name? val.name: val.key}`,
                // 路由名称，建议唯一
                name: (val.name? val.name: val.key) || '',
                hidden: val.hidden ? true : false,
                // 该路由对应页面的 组件
                // component: item.parent ? (() => import(`@/views/${item.parent}/${item.key}`)) : () => import(`@/layouts/${item.component}`),//constantRouterComponents[item.component],
                [val.children? 'redirect': 'component']: val.children? `/${val.key}/${val.children[0].key}`: () => import(`@/components/${parent}/${val.key}.vue`),
    
                // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
                meta: {title: val.title, icon: val.icon || undefined}
            }
            // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
            currentRouter.path = currentRouter.path.replace('//', '/')
            return currentRouter
        }

        allRouter.push(itemRoute(item))
        if (item.children && item.children.length > 0) {
            item.children.map(val => {
                allRouter.push(itemRoute(val, item.key))
            })
        }
    })
    return allRouter
}

export default { getRouterArr }