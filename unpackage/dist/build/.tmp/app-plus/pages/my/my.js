(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"22c5":function(n,t,o){"use strict";var e=o("5c5b"),i=o.n(e);i.a},"5c5b":function(n,t,o){},"6ac3":function(n,t,o){"use strict";o.r(t);var e=o("a8f8"),i=o.n(e);for(var s in e)"default"!==s&&function(n){o.d(t,n,function(){return e[n]})}(s);t["default"]=i.a},"6e46":function(n,t,o){"use strict";o.r(t);var e=o("dff6"),i=o("6ac3");for(var s in i)"default"!==s&&function(n){o.d(t,n,function(){return i[n]})}(s);o("22c5");var u=o("2877"),r=Object(u["a"])(i["default"],e["a"],e["b"],!1,null,null,null);t["default"]=r.exports},a8f8:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=o("2f62"),i=(s(o("f4bc")),s(o("6e09")));function s(n){return n&&n.__esModule?n:{default:n}}function u(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{},e=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(o).filter(function(n){return Object.getOwnPropertyDescriptor(o,n).enumerable}))),e.forEach(function(t){r(n,t,o[t])})}return n}function r(n,t,o){return t in n?Object.defineProperty(n,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[t]=o,n}var a={computed:u({},(0,e.mapState)(["hasLogin","userInfo","token"]),{pointText:function(){return this.userInfo.points?this.userInfo.points>1e8?(this.userInfo.points/1e7).toFixed(1)+"千万":this.userInfo.points>1e6?(this.userInfo.points/1e6).toFixed(1)+"百万":this.userInfo.points>1e4?(this.userInfo.points/1e3).toFixed(1)+"千":this.userInfo.points:0}}),data:function(){return{}},onPullDownRefresh:function(){this.hasLogin?(this.reFresh(),n.stopPullDownRefresh()):n.stopPullDownRefresh()},onShow:function(){this.hasLogin&&this.reFresh()},methods:u({bindLogin:function(){this.hasLogin?this.logout():n.navigateTo({url:"login/login"})},goLogin:function(){this.hasLogin||n.navigateTo({url:"login/login"})},goSetting:function(){n.navigateTo({url:"setting/setting"})},goMessage:function(){this.hasLogin&&n.reLaunch({url:"../../pages/messages/messages"})},goPoints:function(){this.hasLogin},reFresh:function(){i.default.req.getUserInfo()},goFollow:function(){this.hasLogin&&n.navigateTo({url:"my-follows/my-follows"})},goCollect:function(){this.hasLogin&&n.navigateTo({url:"my-collects/my-collects"})},goPost:function(){this.hasLogin&&n.navigateTo({url:"my-post/my-post"})},goComment:function(){this.hasLogin&&n.navigateTo({url:"my-comments/my-comments"})},goEditInformation:function(){this.hasLogin&&n.navigateTo({url:"../../pages/my/setting/change-userInfo/change-userInfo"})},goOther:function(){}},(0,e.mapMutations)(["login"]))};t.default=a}).call(this,o("6e42")["default"])},dff6:function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},i=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return i})}},[["9f93","common/runtime","common/vendor"]]]);