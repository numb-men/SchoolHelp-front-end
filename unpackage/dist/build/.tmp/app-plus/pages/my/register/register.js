(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/register/register"],{1994:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return s})},"472d":function(e,t,n){},"6bf2":function(e,t,n){"use strict";n.r(t);var o=n("1994"),s=n("feb4");for(var a in s)"default"!==a&&function(e){n.d(t,e,function(){return s[e]})}(a);n("f5ff");var r=n("2877"),c=Object(r["a"])(s["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},"9c95":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("f4bc")),s=r(n("6e09")),a=n("1885");function r(e){return e&&e.__esModule?e:{default:e}}var c=function(){return n.e("components/m-input").then(n.bind(null,"735d"))},i={components:{mInput:c},data:function(){return{account:"",password:""}},methods:{register:function(){var t=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;if(11==this.account.length)if(/^1(3|4|5|7|8)\d{9}$/.test(this.account))if(this.password.length<8)e.showToast({icon:"none",title:"密码最短为 8 个字符"});else if(t.test(this.password))if(this.password==this.checkPassword){var n=this,r=s.default.urls.register,c={phone:n.account,password:(0,a.hex_md5)(n.password)};s.default.req.post(r,c,function(t){if(0===t.code){e.showToast({icon:"none",title:"注册成功"});var r={phone:n.account,password:n.password},c=s.default.urls.login,i={phone:r.phone,password:(0,a.hex_md5)(r.password)};s.default.req.get(c,i,function(t){if(0===t.code){o.default.commit("login",t.data,i.phone,i.password),e.showToast({icon:"none",title:"登陆成功"});var n=s.default.urls.getSelfUserInfo,a={};s.default.req.get(n,a,function(t){if(0===t.code){var n=s.default.urls.getHead,a={};s.default.req.get(n,a,function(e){if(0===e.code){var n=t.data;n.headUrl=e.data,delete n.password,o.default.commit("saveUserInfo",n)}else{var s=t.data;s.headUrl="/static/icons/logo.png",delete s.password,o.default.commit("saveUserInfo",s)}})}else e.showModal({content:t.msg,showCancel:!1})}),e.navigateBack()}else e.showModal({content:t.msg,showCancel:!1})}),e.reLaunch({url:"../../../pages/my/my"})}else e.showModal({content:t.msg,showCancel:!1})})}else e.showToast({icon:"none",title:"两次密码不一致"});else e.showToast({icon:"none",title:"密码必须为字母和数字的组合"});else e.showToast({icon:"none",title:"手机号只能为11位数字"});else e.showToast({icon:"none",title:"请检查手机号是否正确"})}}};t.default=i}).call(this,n("6e42")["default"])},f5ff:function(e,t,n){"use strict";var o=n("472d"),s=n.n(o);s.a},feb4:function(e,t,n){"use strict";n.r(t);var o=n("9c95"),s=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=s.a}},[["3fc2","common/runtime","common/vendor"]]]);