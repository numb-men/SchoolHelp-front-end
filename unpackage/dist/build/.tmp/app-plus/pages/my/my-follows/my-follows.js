(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my-follows/my-follows"],{"3efd":function(t,e,o){"use strict";o.r(e);var n=o("56ee"),a=o("a5d8");for(var s in a)"default"!==s&&function(t){o.d(e,t,function(){return a[t]})}(s);o("e63a");var r=o("2877"),i=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},"56ee":function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"a",function(){return n}),o.d(e,"b",function(){return a})},6032:function(t,e,o){},a5d8:function(t,e,o){"use strict";o.r(e);var n=o("ba0e"),a=o.n(n);for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},ba0e:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{myFollows:[]}},onLoad:function(){var t=this,e=this.$api.urls.getAttentions,o={};this.$api.req.get(e,o,function(e){console.log(e," at pages\\my\\my-follows\\my-follows.vue:35"),t.myFollows=e.data.map(function(t){return{id:t.id,userHeadImg:t.imageUrl,name:t.name,isCertified:t.isCertified}})})},methods:{follow:function(t){var e=this.$api.urls.attentionSomeone,o={beAttentionUserId:t};this.$api.req.post(e,o,function(t){console.log(t," at pages\\my\\my-follows\\my-follows.vue:57")})},cancelAttention:function(e){var o=this,n=e.currentTarget.dataset.index,a=this.$api.urls.cancelAttention,s={beAttentionUserId:this.myFollows[n].id};this.$api.req.del(a,s,function(n){console.log(n," at pages\\my\\my-follows\\my-follows.vue:67"),o.myFollows.splice(e.currentTarget.dataset.index,1),t.showToast({icon:"none",title:"取消关注成功"})})},goUserData:function(e){console.log(e.currentTarget.dataset.userid,this.$store.state.userInfo.id," at pages\\my\\my-follows\\my-follows.vue:76"),e.currentTarget.dataset.userId!=this.$store.state.userInfo.id&&t.navigateTo({url:"../../otherUsers/otherUsers?userId="+e.currentTarget.dataset.userid})}}};e.default=o}).call(this,o("6e42")["default"])},e63a:function(t,e,o){"use strict";var n=o("6032"),a=o.n(n);a.a}},[["caaa","common/runtime","common/vendor"]]]);