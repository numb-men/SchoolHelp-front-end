(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/extensions/extensions"],{"0981":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},"19e1":function(t,n,e){"use strict";e.r(n);var a=e("b04a"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},4512:function(t,n,e){"use strict";e.r(n);var a=e("0981"),o=e("19e1");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("7a97");var i=e("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=r.exports},"7a97":function(t,n,e){"use strict";var a=e("8db1"),o=e.n(a);o.a},"8db1":function(t,n,e){},b04a:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;o(e("f4bc"));var a=o(e("6e09"));function o(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,imageList:[]}},methods:{gotoQuestionaire:function(){t.navigateTo({url:"/pages/extensions/questionaire/questionaire"})}},onShow:function(){var t=this,n=a.default.urls.getRollImage,e={imagePosition:"false"};a.default.req.get(n,e,function(n){console.log(n),0==n.code&&(t.imageList=n.data)})}};n.default=u}).call(this,e("543d")["default"])}},[["3426","common/runtime","common/vendor"]]]);