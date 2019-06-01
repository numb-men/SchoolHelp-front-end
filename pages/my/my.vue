<template>
    <view class="root">
        <view class="head-nav">
            <text class="head-text">我的</text>
            <image class="head-notification" src="../../static/icons/notification.png" @click="goMessage"></image>
            <image class="head-setting" src="../../static/icons/setting1.png" @click="goSetting"></image>
        </view>
        <view class="center">
            <view class="logo-backgroud">
                <view class="logo">
                    <view class="img" @click="goOther">
                        <image v-if="!hasLogin" class="logo-img" @click="goLogin" hover-class="logo-hover" src="/static/icons/logo.png"></image>
                        <image v-else class="logo-img" :src="userInfo.headImageUrl"></image>
                    </view>
                    <view class="logo-title">
                        <view v-if="!hasLogin" @click="goLogin" class="user-name">登录</view>
                        <view v-else class="user-name">{{userInfo.name}}</view>
                        <view class="certify" v-if="hasLogin" @click="goPoints">
                            <view v-if="userInfo.isCertified" class="certify-text">已认证</view>
                            <view v-else class="certify-text">未认证</view>
                        </view>
                    </view>
                </view>
                <view>
                    <image @click="goEditInformation()" class="logo-edit" src="../../static/icons/edit_information.png"></image>
                </view>
                <view class="points" @click="goPoints">
                    <text v-if="userInfo.points" class="point-text">${{pointText}}积分</text><!-- &#xe65e; -->
                    <text v-else class="point-text">$0积分</text><!-- &#xe65e; -->
                </view>
            </view>
            <view class="body">
                <div class="basic-data">
                    <div class="basic-data-item" @click="goFollow"><text>关注</text><text>{{userInfo.followNum}}</text></div>
                    <div class="basic-data-item" @click="goCollect"><text>收藏</text><text>{{userInfo.collectPostNum}}</text></div>
                    <div class="basic-data-item" @click="goPost"><text>帖子</text><text>{{userInfo.postNum}}</text></div>
                    <div class="basic-data-item-last" @click="goComment"><text>评论</text><text>{{userInfo.commentNum}}</text></div>
                </div>
            </view>
            <!-- <view class="center-list">
				<view class="center-list-item border-bottom" @click="goSetting">
					<text class="list-icon">&#xe60f;</text>
					<text class="list-text">设置</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<view class="center-list-item border-bottom">
					<text class="list-icon">&#xe60b;</text>
					<text class="list-text">修改资料</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
				<navigator url="feedback/feedback">
					<view class="center-list-item border-bottom">
						<text class="list-icon">&#xe639;</text>
						<text class="list-text">意见反馈</text>
						<text class="navigat-arrow">&#xe65e;</text>
					</view>
				</navigator>
			</view> -->
            <view class="image-con">
                <view class="left-up">
                    <image class="left-up-img" src="../../static/images/FZU-scenery-1.jpg"></image>
                </view>
                <view class="right-up">
                    <image class="right-up-img" src="../../static/images/FZU-scenery-2.jpg"></image>
                </view>
            </view>
            <view class="image-con">
                <view class="left-bottom">
                    <image class="left-bottom-img" src="../../static/images/FZU-scenery-3.jpg"></image>
                </view>
                <view class="right-bottom">
                    <image class="right-bottom-img" src="../../static/images/FZU-scenery-4.jpg"></image>
                </view>
            </view>
            <!-- <view id="container">
				<div id="box">
					<div class="front"><img src="../../static/images/my_2.jpg" /></div>
					<div class="back"><img src="../../static/images/add2.png" /></div>
					<div class="left"><img src="../../static/images/img_4.jpg" /></div>
					<div class="right"><img src="../../static/images/img_1.jpg" /></div>
					<div class="top"><img src="../../static/images/img_3.jpg" /></div>
					<div class="bottom"><img src="../../static/images/my_background.jpg" /></div>
				</div>
			</view> -->
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import store from "../../store/index.js";
    import api from "../../api/api.js";
    export default {
        computed: {
			...mapState(['hasLogin', 'userInfo', 'token']),
			pointText() {
				if (this.userInfo.points){
					if (this.userInfo.points > 100000000){
						return (this.userInfo.points/10000000).toFixed(1) + '千万';
					}
					else if (this.userInfo.points > 1000000){
						return (this.userInfo.points/1000000).toFixed(1) + '百万';
					}
					else if (this.userInfo.points > 10000){
						return (this.userInfo.points/1000).toFixed(1) + '千';
					}
					else {
						return this.userInfo.points;
					}
				}
				return 0;
			}
		},
        data() {
            return {}
        },
        onPullDownRefresh: function() {
            if (this.hasLogin) {
                this.reFresh();
                uni.stopPullDownRefresh();
            } else {
                uni.stopPullDownRefresh();
                return;
            }
        },
        onShow() {
            if (this.hasLogin) {
                this.reFresh();
            } else {
                return;
            }
        },
        methods: {
            bindLogin() {
                if (this.hasLogin) {
                    this.logout()
                } else {
                    uni.navigateTo({
                        url: 'login/login'
                    })
                }
            },
            goLogin() {
                if (!this.hasLogin) {
                    uni.navigateTo({
                        url: 'login/login'
                    })
                }
            },
            goSetting() {
                uni.navigateTo({
                    url: 'setting/setting'
                })
            },
            goMessage() {
                if (this.hasLogin) {
                    uni.reLaunch({
                        url: '../../pages/messages/messages'
                    })
                }
            },
            goPoints() {
                if (this.hasLogin) {
                    // console.log("in2")
                    // uni.reLaunch({
                    //     url: '../../pages/my/point'
                    // })
                }
            },
            reFresh() {
                api.req.getUserInfo()
            },
            goFollow() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: 'my-follows/my-follows' //关注界面路径
                    });
                }
            },
            goCollect() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: 'my-collects/my-collects' //收藏界面路径
                    });
                }
            },
            goPost() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: 'my-post/my-post' //我的帖子界面路径
                    });
                }
            },
            goComment() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: 'my-comments/my-comments' //我的评论界面路径
                    });
                }
            },
            goEditInformation() {
                if (this.hasLogin) {
                    uni.navigateTo({
                        url: '../../pages/my/setting/change-userInfo/change-userInfo' //我的评论界面路径
                    });
                }
            },
            goOther() {
                // uni.navigateTo({
                //     url: '../../pages/otherUsers/otherUsers'
                // })
            },
            ...mapMutations(['login'])
        }
    }
</script>

<style>
    @font-face {
        font-family: texticons;
        font-weight: normal;
        font-style: normal;
        src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
    }

    page,
    view {
        display: flex;
    }

    page {
        background-color: #f8f8f8;
    }

    .root {
        width: 750upx;
    }

    .center {
        position: relative;
        top: 140upx;
        flex-direction: column;
    }

    .head-nav {
        position: fixed;
        width: 750upx;
        background-color: #FFFFFF;
        height: 70upx;
        padding-top: 70upx;
        z-index: 9999;
    }

    .head-text {
        height: 60upx;
        font-size: 36upx;
        text-align: center;
        /* font-weight: bold; */
        flex: 1;
    }

    .head-setting {
        position: absolute;
        top: 65upx;
        left: 680upx;
        width: 60upx;
        height: 55upx;
        margin-right: 20upx;
    }

    .head-notification {
        position: absolute;
        top: 65upx;
        left: 610upx;
        width: 60upx;
        height: 55upx;
        z-index: 10000;
    }

    .basic-data {
        /* height: 120upx; */
        margin-top: 20upx;
        width: 100%;
        margin: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #f8f8f8;
        justify-content: center;
    }

    .basic-data-item {
        width: 80px;
        font-size: 34upx;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f8f8f8;
        border-right: 1px solid #888888;
    }

    .basic-data-item-last {
        width: 80px;
        font-size: 34upx;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f8f8f8;
    }

    .logo-backgroud {
        width: 750upx;
        height: 280upx;
        background-image: url(../../static/images/my_background.jpg);
    }

    .logo {
        position: relative;
        left: 50upx;
        top: 160upx;
        background-color: #FFFFFF;
        width: 650upx;
        height: 200upx;
        flex-direction: column;
        align-items: center;
        border-width: 1upx;
        border-color: #FFFFFF;
        border-style: solid;
        box-shadow: 3px 3px 8px #888888;
        border-radius: 15upx;
    }

    .logo-hover {
        opacity: 0.8;
    }

    .img {
        position: relative;
        left: -210upx;
        top: -85upx;
        width: 160upx;
        height: 160upx;
        border-radius: 50%;
        box-shadow: 3px 3px 8px #888888;
        background-color: #FFFFFF;
        z-index: 100;
    }

    .logo-img {
        weight: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .logo-title {
        position: absolute;
        left: 40upx;
        top: 120upx;
        height: 40upx;
        text-align: left;
    }

    .user-name {
        text-align: left;
        height: 40upx;
        font-size: 38upx;
        color: #3C3E49;
    }

    .go-login.navigat-arrow {
        font-size: 38upx;
        color: #FFFFFF;
    }

    .login-title {
        height: 150upx;
        align-items: self-start;
        justify-content: center;
        flex-direction: column;
        margin-left: 20upx;
    }

    .body {
        position: relative;
        top: 80upx;
    }

    .logo-edit {
        position: relative;
        top: 285upx;
        left: -30upx;
        width: 70upx;
        height: 70upx;
    }

    .certify {
        margin-left: 10upx;
        width: 90upx;
        border-width: 1upx;
        border-color: #007AFF;
        border-style: solid;
        background-color: #007AFF;
        border-radius: 10upx;
        height: 40upx;
        text-align: center;
    }

    .certify-text {
        width: 100%;
        font-size: 28upx;
        color: #FFFFFF;
        text-align: center;
        margin-left: 5upx;
    }

    .points {
        position: absolute;
        top: 90upx;
        right: 55upx;
        /* width: 50upx; */
        max-width: 300upx;
        border-width: 1upx;
        border-color: #FFFFFF;
        border-style: solid;
        box-shadow: 1px 1px 5px #888888;
        background-color: #FFFFFF;
        border-radius: 10upx;
        height: 50upx;
    }

    .point-text {
        width: 100%;
        font-family: texticons;
        font-size: 34upx;
        color: #FFCC00;
        text-align: center;
    }

    .center-list {
        position: relative;
        top: 80upx;
        background-color: #FFFFFF;
        width: 750upx;
        flex-direction: column;
    }

    .center-list-item {
        height: 90upx;
        width: 750upx;
        box-sizing: border-box;
        flex-direction: row;
        padding: 0upx 20upx;
    }

    .center-list-item:active {
        background-color: #eeeeee;
    }

    .border-bottom {
        border-bottom-width: 1upx;
        border-color: #c8c7cc;
        border-bottom-style: solid;
    }

    .list-icon {
        width: 40upx;
        height: 90upx;
        line-height: 90upx;
        font-size: 34upx;
        color: #2F85FC;
        text-align: center;
        font-family: texticons;
        margin-right: 20upx;
    }

    .list-text {
        height: 90upx;
        line-height: 90upx;
        font-size: 34upx;
        color: #555;
        flex: 1;
        text-align: left;
    }

    .navigat-arrow {
        height: 90upx;
        width: 40upx;
        line-height: 90upx;
        font-size: 34upx;
        color: #555;
        text-align: right;
        font-family: texticons;
    }

    .image-con {
        margin-top: 20upx;
        position: relative;
        top: 80upx;
        width: 750upx;
    }

    .left-up {
        /* border-style: solid;
		border-radius: 20upx; */
        /* border-width: 1upx; */
        /* border-color: #f8f8f8; */
        width: 315upx;
        height: 400upx;
        padding-left: 40upx;
    }

    .left-bottom {
        width: 315upx;
        height: 250upx;
        padding-top: 20upx;
        padding-left: 40upx;
    }

    .right-up {
        width: 335upx;
        height: 250upx;
        padding-left: 20upx;
    }

    .right-bottom {
        position: relative;
        top: -130upx;
        left: 0upx;
        width: 335upx;
        height: 400upx;
        padding-left: 20upx;
    }

    .left-up-img {
        border-radius: 20upx;
        width: 100%;
        height: 100%;
    }

    .left-bottom-img {
        border-radius: 20upx;
        width: 100%;
        height: 100%;
    }

    .right-up-img {
        border-radius: 20upx;
        width: 100%;
        height: 100%;
    }

    .right-bottom-img {
        border-radius: 20upx;
        width: 100%;
        height: 100%;
    }

    #container {
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 500px;
    }

    #box {
        width: 200px;
        height: 200px;
        transform-style: preserve-3d;
        transform: translateZ(-100px);
        transition: transform 1s;
        animation: spin 30s linear infinite;
    }

    #box div {
        width: 200px;
        height: 200px;
        position: absolute;
    }

    img {
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }

    /*立方体的六个面*/
    .front {
        background-color: rgba(0, 255, 255, 0.2);
        transform: translateZ(100px);
        /*往外移动100像素*/
    }

    .back {
        background-color: rgba(0, 255, 0, 0.3);
        transform: translateZ(-100px) rotateY(180deg);
        /*往里移动100像素，绕Y轴旋转180度*/
    }

    .left {
        background-color: rgba(0, 0, 255, 0.3);
        transform: translateX(-100px) rotateY(-90deg);
        /*往左移动100像素，绕Y轴旋转90度*/
    }

    .right {
        background-color: rgba(255, 255, 0, .3);
        transform: translateX(100px) rotateY(90deg);
        /*往右移动100像素，绕Y轴旋转90度*/
    }

    .top {
        background-color: rgba(255, 0, 255, .3);
        transform: translateY(-100px) rotateX(90deg);
        /*向上移动100像素，绕X轴旋转90度*/
    }

    .bottom {
        background-color: rgba(255, 0, 0, 0.3);
        transform: translateY(100px) rotateX(-90deg);
        /*向下移动100像素，绕X轴旋转90度*/
    }

    /*动画*/
    @keyframes spin {
        0% {
            transform: rotateX(0deg) rotateY(0deg);
        }

        20% {
            transform: rotateX(0deg) rotateY(360deg);
        }

        40% {
            transform: rotateX(360deg) rotateY(360deg);
        }

        60% {
            transform: translateZ(-100px) rotateX(-90deg) rotateY(90deg);
        }

        80% {
            transform: rotateX(180deg) rotateY(-180deg);
        }

        100% {
            transform: rotateX(0deg) rotateY(0deg);
        }
    }
</style>
