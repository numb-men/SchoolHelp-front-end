(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"491b":function(t,o,n){},"581c":function(t,o,n){"use strict";n.r(o);var a=n("bd3f"),e=n("a564");for(var u in e)"default"!==u&&function(t){n.d(o,t,function(){return e[t]})}(u);n("990f");var l=n("2877"),i=Object(l["a"])(e["default"],a["a"],a["b"],!1,null,null,null);o["default"]=i.exports},"8abe":function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var a=n("2f62");function e(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(o){u(t,o,n[o])})}return t}function u(t,o,n){return o in t?Object.defineProperty(t,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[o]=n,t}var l={computed:(0,a.mapState)(["hasLogin","uerInfo","token"]),data:function(){return{userInfo:{userName:"",fallow:"",collect:"",points:"",post:"",comment:"",avatarUrl:""}}},onPullDownRefresh:function(){this.hasLogin?this.reFresh():t.stopPullDownRefresh()},methods:e({bindLogin:function(){this.hasLogin?this.logout():t.navigateTo({url:"login/login"})},goLogin:function(){this.hasLogin||t.navigateTo({url:"login/login"})},goSetting:function(){t.navigateTo({url:"setting/setting"})},reFresh:function(){var o=this,n=this.token;t.request({url:"http://134.175.16.143:8080/schoolhelp-1.0.1/user",method:"GET",header:{token:n},success:function(a){0===a.data.code&&t.request({url:"http://134.175.16.143:8080/schoolhelp-1.0.1/download/head",method:"GET",header:{token:n},success:function(e){function u(t,o,n,a,e,u,l,i){this.name=t,this.token=o,this.fallow=n,this.collect=a,this.points=e,this.post=u,this.comment=l,this.url=i}if(0===e.data.code){var l=new u(a.data.data.name,n,a.data.data.fallowNum,a.data.data.collectPostNum,a.data.data.points,a.data.data.postNum,a.data.data.commentNum,"http://"+e.data.data);o.userInfo.userName=a.data.data.name,o.userInfo.fallow=a.data.data.fallowNum,o.userInfo.collect=a.data.data.collectPostNum,o.userInfo.points=a.data.data.points,o.userInfo.post=a.data.data.postNum,o.userInfo.comment=a.data.data.commentNum,o.userInfo.avatarUrl="http://"+e.data.data,o.login(l),t.stopPullDownRefresh()}},fail:function(){t.showModal({content:"获取用户头像失败！",showCancel:!1})}})},fail:function(){t.showModal({content:"获取用户信息失败！",showCancel:!1})}})},goFollow:function(){t.navigateTo({url:"my-fallows/my-fallows"})},goCollect:function(){t.navigateTo({url:"my-collects/my-collects"})},goPost:function(){t.navigateTo({url:"my-post/my-post"})},goComment:function(){t.navigateTo({url:"my-comments/my-comments"})}},(0,a.mapMutations)(["login"]))};o.default=l}).call(this,n("6e42")["default"])},"990f":function(t,o,n){"use strict";var a=n("491b"),e=n.n(a);e.a},a564:function(t,o,n){"use strict";n.r(o);var a=n("8abe"),e=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(o,t,function(){return a[t]})}(u);o["default"]=e.a},bd3f:function(t,o,n){"use strict";var a=function(){var t=this,o=t.$createElement;t._self._c},e=[];n.d(o,"a",function(){return a}),n.d(o,"b",function(){return e})}},[["1c43","common/runtime","common/vendor"]]]);