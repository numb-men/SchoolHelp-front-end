(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/setting/account-security/account-security"],{"020b":function(t,n,e){"use strict";e.r(n);var o=e("3f50"),u=e("25fe");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("3d2c");var r=e("2877"),c=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},"25fe":function(t,n,e){"use strict";e.r(n);var o=e("b4c2"),u=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=u.a},"3d2c":function(t,n,e){"use strict";var o=e("fd43"),u=e.n(o);u.a},"3f50":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},b4c2:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("2f62");u(e("ebcf")),u(e("0b38"));function u(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},o=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.forEach(function(n){r(t,n,e[n])})}return t}function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var c={computed:(0,o.mapState)(["hasLogin","userInfo","token"]),data:function(){return{array:["在线","隐身"],index:0}},methods:a({},(0,o.mapMutations)(["logout","clearLastLoginData"]),{logout:function(){this.hasLogin?(t.showToast({icon:"none",title:"注销成功"}),this.logout(),this.clearLastLoginData(),t.reLaunch({url:"../../../../pages/my/my"})):t.showToast({icon:"none",title:"您尚未登录哟~"})},gotoDevelop:function(){t.navigateTo({url:"about/about"})},switch1Change:function(t){console.log("switch1 发生 change 事件，携带值为",t.target.value)},bindPickerChange:function(t){console.log("picker发送选择改变，携带值为："+t.target.value),this.index=t.target.value}})};n.default=c}).call(this,e("543d")["default"])},fd43:function(t,n,e){}},[["50d7","common/runtime","common/vendor"]]]);