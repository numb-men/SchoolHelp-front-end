(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"159b":function(t,o,n){"use strict";var e=n("b0b4"),i=n.n(e);i.a},"1b22":function(t,o,n){"use strict";n.r(o);var e=n("2522");for(var i in e)"default"!==i&&function(t){n.d(o,t,function(){return e[t]})}(i);n("159b");var a,u,c=n("2877"),s=Object(c["a"])(e["default"],a,u,!1,null,null,null);o["default"]=s.exports},2522:function(t,o,n){"use strict";n.r(o);var e=n("2db2"),i=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(o,t,function(){return e[t]})}(a);o["default"]=i.a},"2db2":function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={onShow:function(){this.init()},onHide:function(){this.logout()},methods:{init:function(){var o=this;this.$store.commit("getSearchHistroy"),console.log(this.$store.state.searchHistroy),t.getStorage({key:"lastLoginData",success:function(t){console.log("之前登录过，用旧账号登录"),o.$api.req.login(t.data.phone,t.data.password)},fail:function(t){console.log("未登录过"),console.log(t)}})},logout:function(){this.$api.req.logout()}}};o.default=n}).call(this,n("543d")["default"])},b0b4:function(t,o,n){}},[["e6b0","common/runtime","common/vendor"]]]);