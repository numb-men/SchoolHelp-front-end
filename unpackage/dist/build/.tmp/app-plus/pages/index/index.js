(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"88ee":function(t,e,n){"use strict";n.r(e);var a=n("c78b"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=i.a},a959:function(t,e,n){},b9d5:function(t,e,n){"use strict";var a=n("a959"),i=n.n(a);i.a},bce0:function(t,e,n){"use strict";n.r(e);var a=n("db67"),i=n("88ee");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("b9d5");var r=n("2877"),c=Object(r["a"])(i["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},c78b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;s(n("f4bb"));var a=s(n("92e5")),i=n("1367");function s(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{scrollLeft:0,currentTab:0,tabClick:0,isHeight:"",isLeft:0,agents:[{title:"学术论坛",list:[],id:0,pages:0},{title:"校园动态",list:[],id:1,pages:0},{title:"二手交易",list:[],id:2,pages:0},{title:"缺个伴吗",list:[],id:3,pages:0},{title:"帮你干活",list:[],id:4,pages:0},{title:"经验交流",list:[],id:5,pages:0}],isWidth:0,imageList:[{src:"../../static/images/news-1.png"},{src:"../../static/images/news-2.png"},{src:"../../static/images/news-3.png"},{src:"../../static/images/news-4.png"}]}},mounted:function(){this.isHeight=300*this.agents[this.currentTab].list.length+160+"rpx",console.log(this.isHeight," at pages\\index\\index.vue:130")},methods:{goToSearch:function(){t.navigateTo({url:"../../pages/index/search-result/search-result"})},navClick:function(t){this.currentTab=t,this.tabClick=t;var e=this,n=a.default.urls.getPostList,s={num:0,postType:e.currentTab};a.default.req.get(n,s,function(n){if(0===n.code&&0==n.data.empty){for(var a=0;a<n.data.content.length;a++)n.data.content[a].issueTime=(0,i.friendlyDate)(new Date(n.data.content[a].issueTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime());e.agents[t].list=n.data.content,console.log(e.agents[t].list.length," at pages\\index\\index.vue:162")}})},swiperTab:function(t){console.log(t," at pages\\index\\index.vue:168");var e=t.detail.current;if(this.isHeight=300*this.agents[e].list.length+160+"rpx",this.isLeft=e*this.isWidth,this.currentTab=t.detail.current,this.tabClick=t.detail.current,4==this.currentTab?this.scrollLeft=150:5==this.currentTab&&(this.scrollLeft=150),1==this.currentTab?this.scrollLeft=0:0==this.currentTab&&(this.scrollLeft=0),0===this.agents[e].list.length){var n=this,s=a.default.urls.getPostList,r={num:0,postType:n.currentTab};a.default.req.get(s,r,function(t){if(0===t.code&&0==t.data.empty){for(var e=0;e<t.data.content.length;e++)t.data.content[e].issueTime=(0,i.friendlyDate)(new Date(t.data.content[e].issueTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime());n.agents[n.currentTab].list=t.data.content,n.isHeight=300*n.agents[n.currentTab].list.length+160+"rpx"}})}}},onPullDownRefresh:function(){console.log("刷新第".concat(this.currentTab,"项")," at pages\\index\\index.vue:207"),t.showLoading({content:"刷新中"});var e=this,n=a.default.urls.getPostList,s={num:0,postType:e.currentTab};a.default.req.get(n,s,function(n){if(0===n.code&&0==n.data.empty){for(var a=0;a<n.data.content.length;a++)n.data.content[a].issueTime=(0,i.friendlyDate)(new Date(n.data.content[a].issueTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime());e.agents[e.currentTab].list=n.data.content,e.isHeight=300*e.agents[e.currentTab].list.length+160+"rpx",t.stopPullDownRefresh()}}),setTimeout(function(){t.hideLoading(),t.stopPullDownRefresh()},1e3)},onReachBottom:function(){var e=this;console.log("加载".concat(this.currentTab)," at pages\\index\\index.vue:235"),t.showLoading({content:"加载中"});var n=this;if(0!==n.agents[n.currentTab].list.length){var s=a.default.urls.getPostList,r={num:n.agents[this.currentTab].pages,postType:n.currentTab};a.default.req.get(s,r,function(a){if(0===a.code&&0==a.data.empty){for(var s=0;s<a.data.content.length;s++)a.data.content[s].issueTime=(0,i.friendlyDate)(new Date(a.data.content[s].issueTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime());for(s=0;s<a.data.content.length;s++)n.agents[n.currentTab].list.push(a.data.content[s]);n.agents[e.currentTab].pages=n.agents[e.currentTab].pages+1,n.isHeight=300*n.agents[n.currentTab].list.length+160+"rpx",t.hideLoading()}else t.hideLoading(),t.showToast({icon:"none",title:"你已经看到我的底线啦！"})})}else t.hideLoading(),t.showToast({icon:"none",title:"你已经看到我的底线啦！"});setTimeout(function(){t.hideLoading()},1e3)},onLoad:function(){var t=this,e=a.default.urls.getPostList,n={num:0,postType:t.currentTab};a.default.req.get(e,n,function(e){if(0===e.code&&0==e.data.empty){for(var n=0;n<e.data.content.length;n++)e.data.content[n].issueTime=(0,i.friendlyDate)(new Date(e.data.content[n].issueTime.replace(/\-/g,"/").replace(/\T/g," ").substring(0,19)).getTime());t.agents[t.currentTab].list=e.data.content,t.isHeight=300*t.agents[t.currentTab].list.length+160+"rpx"}})}};e.default=r}).call(this,n("6e42")["default"])},db67:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})}},[["53d0","common/runtime","common/vendor"]]]);