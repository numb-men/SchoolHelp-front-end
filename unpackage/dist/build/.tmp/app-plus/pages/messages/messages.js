(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/messages/messages"],{"04b4":function(t,e,a){"use strict";a.r(e);var n=a("6c87"),s=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=s.a},"6c87":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("77f6"),s={data:function(){return{msgs:[{id:1,chatUserHeadImg:"/static/images/img_1.jpg",chatUserName:"小马达",latestMsgContent:"你什么时候回家？",notReadMsgNum:1,latestMsgTime:"7:00"},{id:2,chatUserHeadImg:"/static/images/img_2.jpg",chatUserName:"真有钱",latestMsgContent:"你需要钱吗？我借钱给你，5千够吗？",notReadMsgNum:1,latestMsgTime:"14:00"},{id:3,chatUserHeadImg:"/static/images/img_3.jpg",chatUserName:"好厉害",latestMsgContent:"我真的太菜了，还是你厉害。",notReadMsgNum:0,latestMsgTime:"19:00"},{id:4,chatUserHeadImg:"/static/images/img_4.jpg",chatUserName:"真滴烦",latestMsgContent:"哇哇哇——啊啊啊——好气啊——气死我了——啊啊啊——",notReadMsgNum:100,latestMsgTime:"5-3"}]}},onLoad:function(){var t=!0,e=!1,a=void 0;try{for(var s,i=this.msgs[Symbol.iterator]();!(t=(s=i.next()).done);t=!0){var r=s.value;r.latestMsgContent=(0,n.cutString)(r.latestMsgContent,15),r.notReadMsgNum=r.notReadMsgNum>99?"99+":""+r.notReadMsgNum}}catch(o){e=!0,a=o}finally{try{t||null==i.return||i.return()}finally{if(e)throw a}}},methods:{showMsgDetail:function(e){var a=e.currentTarget.id;t.navigateTo({url:"message-detail/message-detail?msgId="+a})}}};e.default=s}).call(this,a("6e42")["default"])},"7b2c":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return s})},"8dab":function(t,e,a){"use strict";a.r(e);var n=a("7b2c"),s=a("04b4");for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);a("988f");var r=a("2877"),o=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=o.exports},"988d":function(t,e,a){},"988f":function(t,e,a){"use strict";var n=a("988d"),s=a.n(n);s.a}},[["972f","common/runtime","common/vendor"]]]);