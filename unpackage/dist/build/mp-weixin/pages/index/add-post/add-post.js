(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/add-post/add-post"],{"19b5":function(t,n,o){"use strict";var e=o("a64e"),s=o.n(e);s.a},2957:function(t,n,o){"use strict";o.r(n);var e=o("f411"),s=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,function(){return e[t]})}(i);n["default"]=s.a},a64e:function(t,n,o){},c729:function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},s=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return s})},f271:function(t,n,o){"use strict";o.r(n);var e=o("c729"),s=o("2957");for(var i in s)"default"!==i&&function(t){o.d(n,t,function(){return s[t]})}(i);o("19b5");var a=o("2877"),u=Object(a["a"])(s["default"],e["a"],e["b"],!1,null,"9657872a",null);n["default"]=u.exports},f411:function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{post:{title:"",content:"",tags:[],titleWordCount:0,contentWordCount:0,points:-1,postType:-1},showTagInput:!1,tagInputContent:"",pointsRange:[0,5,10,20,50,100,200],postTypeRange:["学术论坛","校园动态","二手交易","缺个伴吗","帮你干活","经验交流"],pointsSelected:0,postTypeSelected:0}},computed:{postTypeComputed:function(){return this.postTypeRange[this.post.postType]}},methods:{bindTitleInput:function(t){this.post.title=t.target.value,this.post.titleWordCount=t.target.value.length},bindContentInput:function(t){this.post.content=t.target.value,this.post.contentWordCount=t.target.value.length},goBack:function(){t.navigateBack({delta:1})},showTagInputBox:function(){this.post.tags.length<5?this.showTagInput=!0:t.showToast({icon:"none",title:"最多添加5个标签哦"})},hideTagInputBox:function(){this.showTagInput=!1},addTag:function(){this.post.tags.length<5?(this.post.tags.push(this.tagInputContent),this.tagInputContent=""):(t.showToast({icon:"none",title:"最多添加5个标签哦"}),this.tagInputContent="",this.hideTagInputBox())},selectPoints:function(t){this.post.points=this.pointsRange[t.detail.value]},selectPostType:function(t){this.post.postType=t.detail.value},sendPost:function(){var n=this;if(-1!=this.post.points)if(-1!=this.post.postType)if(this.post.title.length<5||this.post.title.length>15)t.showToast({icon:"none",title:"帖子标题长度应在5-15之间"});else if(this.post.content.length<15||this.post.content.length>400)t.showToast({icon:"none",title:"帖子内容长度应在15-400之间"});else{var o=this.$api.urls.sendPost,e=this.post;this.$api.req.post(o,e,function(o){console.log(o),o.code<0?t.showToast({icon:"none",title:o.msg}):(t.showToast({icon:"none",title:"发帖成功"}),setTimeout(function(){n.goBack()},500))})}else t.showToast({icon:"none",title:"请设置帖子分类"});else t.showToast({icon:"none",title:"请设置帖子积分"})}}};n.default=o}).call(this,o("543d")["default"])}},[["07b3","common/runtime","common/vendor"]]]);