(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/messages/messages"],{2690:function(t,e,a){},4263:function(t,e,a){"use strict";a.r(e);var n=a("c9bc"),s=a("e438");for(var r in s)"default"!==r&&function(t){a.d(e,t,function(){return s[t]})}(r);a("86a5");var i=a("2877"),u=Object(i["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},"86a5":function(t,e,a){"use strict";var n=a("2690"),s=a.n(n);s.a},c9bc:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},d245:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("71a5"),s={data:function(){return{msgs:[]}},onShow:function(){var t=this,e=this.$api.urls.getChatList,a={};this.$api.req.get(e,a,function(e){t.msgs=e.data.map(function(t,e){return{id:e,chatUserHeadImg:t.headIimage,chatUserId:t.userId,chatUserName:"",chatUser:{},latestMsgContent:t.latedMessage,notReadMsgNum:t.newMessageNum,latestMsgTime:(0,n.friendlyDate)(new Date(t.latedTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime())}}),t.getUserData()});var s=!0,r=!1,i=void 0;try{for(var u,o=this.msgs[Symbol.iterator]();!(s=(u=o.next()).done);s=!0){var c=u.value;c.latestMsgContent=(0,n.cutString)(c.latestMsgContent,15),c.notReadMsgNum=c.notReadMsgNum>99?"99+":""+c.notReadMsgNum}}catch(l){r=!0,i=l}finally{try{s||null==o.return||o.return()}finally{if(r)throw i}}},methods:{showMsgDetail:function(e){var a=this.msgs[e.currentTarget.dataset.index];t.navigateTo({url:"message-detail/message-detail?detail="+encodeURIComponent(JSON.stringify(a))})},getUserData:function(){var t=this;this.msgs.map(function(e){var a=t.$api.urls.getOtherUserInfo+e.chatUserId,n={};t.$api.req.get(a,n,function(t){e.chatUser=t.data,e.chatUserName=t.data.name})})}}};e.default=s}).call(this,a("543d")["default"])},e438:function(t,e,a){"use strict";a.r(e);var n=a("d245"),s=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e["default"]=s.a}},[["5540","common/runtime","common/vendor"]]]);