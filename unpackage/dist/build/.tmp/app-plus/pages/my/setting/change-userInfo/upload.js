(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/setting/change-userInfo/upload"],{"05bf":function(e,o,n){"use strict";var t=n("e0a9"),a=n.n(t);a.a},2256:function(e,o,n){"use strict";n.r(o);var t=n("ae29"),a=n.n(t);for(var u in t)"default"!==u&&function(e){n.d(o,e,function(){return t[e]})}(u);o["default"]=a.a},ae29:function(e,o,n){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t=n("2f62"),a=s(n("1b74")),u=(s(n("f4bc")),s(n("6e09")));function s(e){return e&&e.__esModule?e:{default:e}}var r=e.getSystemInfoSync(),c=r.windowWidth,i=r.windowHeight-50;console.log(r," at pages\\my\\setting\\change-userInfo\\upload.vue:28");var l={computed:(0,t.mapState)(["hasLogin","userInfo","token"]),data:function(){return{cropperOpt:{id:"cropper",width:c,height:i,scale:2.5,zoom:8,cut:{x:(c-295)/2,y:(i-295)/2,width:295,height:295}},weCropper:""}},methods:{back:function(){e.redirectTo({url:"change-userInfo"})},touchStart:function(e){this.weCropper.touchStart(e)},touchMove:function(e){this.weCropper.touchMove(e)},touchEnd:function(e){this.weCropper.touchEnd(e)},convertBase64UrlToBlob:function(e,o){for(var n=atob(e.split(",")[1]),t=[],a=0;a<n.length;a++)t.push(n.charCodeAt(a));return new Blob([new Uint8Array(t)],{type:o},{filename:"1111.jpg"})},blobToDataURL:function(e){var o=new FileReader;o.readAsDataURL(e),o.onload=function(e){var o=e.target.result;console.log(o," at pages\\my\\setting\\change-userInfo\\upload.vue:81")}},getCropperImage:function(){var o=this,n=u.default.urls.postHead;this.weCropper.getCropperImage(function(t){if(t){console.log(t," at pages\\my\\setting\\change-userInfo\\upload.vue:92"),wx.redirectTo({url:"change-userInfo?avatar="+t});var a=o;e.uploadFile({url:n,filePath:t,name:"image",header:{token:a.token},success:function(o){console.log("uploadImage success, res is:",o," at pages\\my\\setting\\change-userInfo\\upload.vue:107"),e.showToast({title:"上传成功",icon:"success",duration:1e3})},fail:function(o){console.log("uploadImage fail",o," at pages\\my\\setting\\change-userInfo\\upload.vue:115"),e.showModal({content:o.errMsg,showCancel:!1}),e.hideLoading()},complete:function(){console.log("complate"," at pages\\my\\setting\\change-userInfo\\upload.vue:123")}})}else console.log("获取图片失败，请稍后重试"," at pages\\my\\setting\\change-userInfo\\upload.vue:127")})},uploadTap:function(){var o=this;e.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){var n=e.tempFilePaths[0];o.weCropper.pushOrign(n)}})}},onLoad:function(o){console.log(c,i,r," at pages\\my\\setting\\change-userInfo\\upload.vue:148");var n=this.cropperOpt,t=o.src;t&&(Object.assign(n,{src:t}),console.log(t," at pages\\my\\setting\\change-userInfo\\upload.vue:156"),this.weCropper=new a.default(n).on("ready",function(e){console.log("reday"," at pages\\my\\setting\\change-userInfo\\upload.vue:159")}).on("beforeImageLoad",function(o){e.showToast({title:"上传中",icon:"loading",duration:3e3}),console.log("beforeImageLoad"," at pages\\my\\setting\\change-userInfo\\upload.vue:167")}).on("imageLoad",function(o){e.hideToast(),console.log("imageLoad"," at pages\\my\\setting\\change-userInfo\\upload.vue:171")}))}};o.default=l}).call(this,n("6e42")["default"])},bb9c:function(e,o,n){"use strict";n.r(o);var t=n("ecd4"),a=n("2256");for(var u in a)"default"!==u&&function(e){n.d(o,e,function(){return a[e]})}(u);n("05bf");var s=n("2877"),r=Object(s["a"])(a["default"],t["a"],t["b"],!1,null,null,null);o["default"]=r.exports},e0a9:function(e,o,n){},ecd4:function(e,o,n){"use strict";var t=function(){var e=this,o=e.$createElement;e._self._c},a=[];n.d(o,"a",function(){return t}),n.d(o,"b",function(){return a})}},[["1260","common/runtime","common/vendor"]]]);