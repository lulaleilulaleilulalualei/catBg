<template>
  <div id="home">
    <a-Layout id="components-layout-demo-custom-trigger">
      <a-layout-sider class="layout-sider" :trigger="null" collapsible v-model="collapsed">
        <div class="layout-sider-box">
            <div class="logo" />
            <a-menu
              :selectedKeys="selectKeys"
              :openKeys="openKeys" 
              theme="dark" 
              mode="inline"
              :inlineCollapsed="collapsed"
              @openChange="onOpenChange">
              <a-sub-menu v-for="val in routerArr" :key="val.path">
                <span slot="title"><a-icon :type="val.meta.icon" /><span>{{val.meta.title}}</span></span>
                <a-menu-item @click="toSelectPath(v.path)" v-for="v in val.children" :key="v.path">{{v.meta.title}}</a-menu-item>
              </a-sub-menu>
            </a-menu>
        </div>
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="()=> collapsed = !collapsed"
          />
      </a-layout-sider>
      <a-layout class="layout-out-content">
        <a-layout-header class="layout-header">
          <div class="breadcrumb">
                <div class="fistBreadcrumb"><router-link class="fistBreadcrumbLink" :to="{ path: '/home' }">工作台</router-link></div>
                <div class="secondBreadcrumb" v-if="navCrumb.secondPath"><router-link class="secondBreadcrumbLink" :to="{ path: navCrumb.secondPath }">{{navCrumb.secondName}}</router-link></div>
                <div class="thirdBreadcrumb" v-if="navCrumb.thirdPath">{{navCrumb.thirdName}}</div>
            </div>
            <div class="user-opt-box">
              <div class="message-notice">
                <a-badge :count="99">
                  <a-icon class="user-message-icon" type="message" />
                </a-badge>
              </div>
              <a-dropdown>
                <div class="user-head-box">
                  <div class="user-head-img"><a-avatar :size="36" icon="user" /></div>
                  <div class="user-head-name">陈二狗</div>
                </div>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">操作一</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">操作二</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">操作三</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>  
        </a-layout-header>
        <a-layout-content class="layout-content">
            <router-view />
            <a-layout-footer :style="{ textAlign: 'center', padding: '20px 50px'}">
                背包猫后台开发 ©2019 Created by Ant UED
            </a-layout-footer>
        </a-layout-content>
        
      </a-layout>
    </a-Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters , mapActions } from 'vuex';

export default {
  name: "home",
  data() {
    return {
      collapsed: false,
      rootSubmenuKeys: [],//submenu数组
      openKeys: [], //展开submenu
      selectKeys: [],//展开menu
      navCrumb: {}, //面包屑
      routerArr: [], //路由对象
    }
  },
  computed: {
      ...mapGetters([
          'c_routeSave'
      ]),
  },
  watch: {
    c_routeSave() {
      this.routeNavChange()
    }
  },
  methods: {
    toSelectPath(path){ //选择路径
      if(path != this.c_routeSave.path) {
        this.$router.push({
            path: path,
        })
      }
    },
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
    },
    routerShowLoad() { //路由展示加载
        let homeRoute = this.$router.options.routes.filter(item => item.path == '/home' && item.redirect)[0]
        let routeArr = homeRoute.children, arr = []
        routeArr.map(val => {
            if(val.redirect) {
                arr.push({...val, children: []})
                this.rootSubmenuKeys.push(val.path)
            }else {
                let str = val.path.split('/')[1]
                arr.map(v => {
                    if(v.path.split('/')[1] == str) {
                        v.children.push(val)
                    }
                })
            }
        })
        this.routerArr = arr
        this.routeNavChange()
    },
    routeNavChange() {
        this.routerArr.map((v, i) => {
            v.children.map((item, idx) => {
                if(this.c_routeSave.path == item.path) {
                    this.openKeys = [v.path]
                    this.selectKeys = [item.path]
                    this.navCrumb = {
                        secondPath: v.path,
                        secondName: v.meta.title,
                        thirdPath: item.path,
                        thirdName: item.meta.title
                    }
                    // this.defIdx = item.path
                }
            })
        })
    }
  },
  created() {
    this.routerShowLoad()
  }
};
</script>

<style lang="less" scoped>
  #home {
    width: 100%;
    height: 100%;
  }
  #components-layout-demo-custom-trigger {
    height: 100%;
    width: 100%;
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
    }
  }
  .layout-sider {
    position: relative;
    .layout-sider-box {
      overflow: auto;
      height: 100vh;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 999;
    }
    .trigger {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 999;
        font-size: 18px;
        padding: 10px 20px;
        cursor: pointer;
        transition: color 0.3s;
        color: @def-color;
        background-color: #001529;
        &:hover {
          color: @color-blue;
        }
    }
  }
  .layout-content {
    margin: 10px 10px 0; 
    padding: 10px 10px; 
    min-height: 280px;
    overflow: auto;
  }
  .layout-header {
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background: #fff;
    position: relative;
  }
  .user-opt-box {
    display: flex;
    align-items: center;
    height: 100%;
    .message-notice {
      margin-right: 30px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .user-message-icon {
        font-size: 28px
      }
      &:hover {
        cursor: pointer;
      }
    }
    .user-head-box {
      display: flex;
      align-items: center;
      .user-head-img {
        margin-right: 10px;
      }
      .user-head-name {
        font-size: 14px;
        color: @color-black;
      }
      &:after {
        content: '';
        display: block;
        border: 3px solid @color-black;
        border-left-color: transparent;
        border-top-color: transparent;
        transform: rotate(45deg);
        margin-left: 10px;
        position: relative;
        top: -1px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .breadcrumb {
    display: flex;
    align-items: center;
    height: 100%;
    .fistBreadcrumb {
        font-size: 18px;
        font-weight: 700;
        margin-right: 25px;
        display: flex;
        align-items: center;
        &::after {
          content: '';
          display: block;
          width: 1px;
          height: 20px;
          background-color: #E6E7E8;
          margin-left: 25px;
        }
    }
    .fistBreadcrumbLink{
        color: @color-black;
        &:hover {
          color: @color-blue;
        }
    }
    .secondBreadcrumb {
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-right: 15px;
        &::after {
        content: '';
          display: block;
          width: 8px;
          height: 8px;
          border: 1px solid #979797;
          border-top-color: transparent;
          border-left-color: transparent;
          margin-left: 15px;
          transform: rotate(-45deg);
      }
    }
    .secondBreadcrumbLink {
        color: #909399;
        &:hover {
          color: @color-blue;
        }
    }
    .thirdBreadcrumb {
        font-size: 14px;
        color: @color-black;
    }
  }
</style>
