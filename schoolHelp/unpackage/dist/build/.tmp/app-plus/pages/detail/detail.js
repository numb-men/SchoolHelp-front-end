(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/detail"],{"2f88":function(t,n,e){"use strict";e.r(n);var a=e("7521"),i=e("613c");for(var r in i)"default"!==r&&function(t){e.d(n,t,function(){return i[t]})}(r);e("3ea0");var u=e("2877"),o=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,null,null);n["default"]=o.exports},"3ea0":function(t,n,e){"use strict";var a=e("ded9"),i=e.n(a);i.a},4348:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="<p>获取信息失败</p>",a={data:function(){return{banner:{},content:""}},onShareAppMessage:function(){return{title:this.banner.title,path:"/pages/detail/detail?query="+JSON.stringify(this.banner)}},onLoad:function(n){try{this.banner=JSON.parse(decodeURIComponent(n.query))}catch(e){this.banner=JSON.parse(n.query)}this.getDetail(),t.setNavigationBarTitle({title:this.banner.title})},methods:{getDetail:function(){var n=this;t.request({url:"https://unidemo.dcloud.net.cn/api/news/36kr/"+this.banner.post_id,success:function(t){200==t.statusCode?n.content=t.data.content:n.content=e}})}}};n.default=a}).call(this,e("6e42")["default"])},"613c":function(t,n,e){"use strict";e.r(n);var a=e("4348"),i=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,function(){return a[t]})}(r);n["default"]=i.a},7521:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return i})},ded9:function(t,n,e){}},[["b5ec","common/runtime","common/vendor"]]]);