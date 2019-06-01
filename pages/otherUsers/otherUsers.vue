<template>
    <view class="root">
        <view class="center">
            <view class="logo-backgroud">
                <view class="logo">
                    <view class="img">
                        <image class="logo-img" :src="targetUserInfo.headImageUrl"></image>
                    </view>
                    <view class="logo-title">
                        <view class="user-name">{{targetUserInfo.name}}</view>
                        <view class="certify" @click="goPoints">
                            <view v-if="targetUserInfo.isCertified" class="certify-text">已认证</view>
                            <view v-else class="certify-text">未认证</view>
                        </view>
                    </view>
                </view>
                <!-- <view>
                    <image @click="goEditInformation()" class="logo-edit" src="../../static/icons/edit_information.png"></image>
                </view> -->
            </view>
            <view class="body">
                <div class="basic-data">
                    <div class="basic-data-item"><text>关注</text><text>{{targetUserInfo.followNum}}</text></div>
                    <div class="basic-data-item"><text>粉丝</text><text>{{targetUserInfo.followerNum}}</text></div>
                    <div class="basic-data-item"><text>帖子</text><text>{{targetUserInfo.postNum}}</text></div>
                    <div class="basic-data-item-last"><text>评论</text><text>{{targetUserInfo.commentNum}}</text></div>
                </div>
            </view>
            <view class="center-list">
                <view class="center-list-item border-bottom">
                    <!-- <text class="list-icon">&#xe60f;</text> -->
                    <text class="list-text">专业</text>
                    <text class="navigat-arrow">{{targetUserInfo.major}}</text>
                </view>
                <view class="center-list-item border-bottom">
                    <!-- <text class="list-icon">&#xe60b;</text> -->
                    <text class="list-text">学院</text>
                    <text class="navigat-arrow">{{targetUserInfo.college}}</text>
                </view>
                <!-- <view class="center-list-item border-bottom">
                    <text class="list-icon">&#xe639;</text>
                    <text class="list-text">意见反馈</text>
                    <text class="navigat-arrow">{{userInfo.major}}</text>
                </view> -->
            </view>
            <!-- <view class="image-con">
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
            </view> -->
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
            <view class="bottom-nav">
                <text type="primary" class="bottom-nav-item" @click="follow">{{targetUserInfo.hasFollow?"取消关注":"关注"}}</text>
                <text type="primary" class="bottom-nav-item" @click="goChat">发消息</text>
            </view>
        </view>
		
		<view class="points">
		    <text v-if="targetUserInfo.points" class="point-text">${{pointText}}积分</text>
		    <text v-else class="point-text">$0积分</text>
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
			...mapState(['hasLogin', 'userInfo']),
			
			pointText() {
				if (this.targetUserInfo.points){
					if (this.targetUserInfo.points > 100000000){
						return (this.targetUserInfo.points/10000000).toFixed(1) + '千万';
					}
					else if (this.targetUserInfo.points > 10000000){
						return (this.targetUserInfo.points/1000000).toFixed(1) + '百万';
					}
					else if (this.targetUserInfo.points > 10000){
						return (this.targetUserInfo.points/1000).toFixed(1) + '千';
					}
					else {
						return this.targetUserInfo.points;
					}
				}
				return 0;
			}
		},
        data() {
            return {
                targetUserInfo: {
					hasFollow: false
				},
                targetUserId: ''
            }
        },
        onLoad(option) {
            this.targetUserId = option.userId
            var url = api.urls.getOtherUserInfo + option.userId
            var data = {}
            var that = this
            api.req.get(url, data, (res) => {
                if (res.code === 0) {
                    that.targetUserInfo = res.data
                } else {
                    uni.showModal({
                        content: res.msg,
                        showCancel: false
                    })
                }
            });
        },
        methods: {
            follow() {
                if (this.hasLogin) {
                    if (!this.targetUserInfo.hasFollow) {
                        var that = this
                        var url = api.urls.attentionSomeone
                        var data = {
                            beAttentionUserId: that.targetUserId
                            // beAttentionUserId: 225
                        }
                        api.req.post(url, data, (res) => {
                            if (res.code === 0) {
                                that.targetUserInfo.followerNum = that.targetUserInfo.followerNum + 1
                                uni.showToast({
                                    title: '关注成功',
                                    icon: 'success',
                                    duration: 1000
                                });
                                that.targetUserInfo.hasFollow = true
                            } else {
                                uni.showModal({
                                    content: res.msg,
                                    showCancel: false
                                })
                            }
                        });
                    } else {
                        var that = this
                        var url = api.urls.cancelAttention
                        var data = {
                            beAttentionUserId: that.targetUserId
                            // beAttentionUserId: 225
                        }
                        api.req.del(url, data, (res) => {
                            if (res.code === 0) {
                                that.targetUserInfo.followerNum = that.targetUserInfo.followerNum - 1
                                uni.showToast({
                                    title: '取关成功',
                                    icon: 'success',
                                    duration: 1000
                                });
                                that.targetUserInfo.hasFollow = false
                            } else {
                                uni.showModal({
                                    content: res.msg,
                                    showCancel: false
                                })
                            }
                        });
                    }
                } else {
                    uni.showModal({
                        content: "关注需要登录，您想马上登录吗？",
                        success: function(res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: '../../pages/my/login/login'
                                })
                            } else if (res.cancel) {
                                return;
                            }
                        }
                    });
                }
            },
            goChat(e) {
                if (this.hasLogin) {
					if (this.targetUserId != this.$store.state.userInfo.id){
						// 和非自身的用户发消息
						uni.navigateTo({
							url: "../messages/message-detail/message-detail?detail=" + encodeURIComponent(JSON.stringify(
								{chatUserId: this.targetUserId}))
						})
					}
                } else {
                    uni.showModal({
                        content: "发消息需要登录，您想马上登录吗？",
                        success: function(res) {
                            if (res.confirm) {
                                uni.navigateTo({
                                    url: '../../pages/my/login/login'
                                })
                            } else if (res.cancel) {
                                return;
                            }
                        }
                    });
                }
            }
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
        margin-top: 30upx;
        width: 100%;
        margin-bottom: 10upx;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #f8f8f8;
        justify-content: center;
    }

    .basic-data-item {
        width: 175upx;
        font-size: 34upx;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f8f8f8;
        border-right: 1px solid #888888;
    }

    .basic-data-item-last {
        width: 175upx;
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
        flex-direction: row;
        position: absolute;
        left: 50upx;
        top: 120upx;
        height: 50upx;
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
        /* width: 40upx; */
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
        position: relative;
        top: 80upx;
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

    .bottom-nav {
        position: fixed;
        bottom: 0;
        border-width: 1upx;
        border-color: #EEEEEE;
        border-style: solid;
        background-color: #EEEEEE;
        flex-direction: row;
        justify-content: center;
        height: 100upx;
        width: 750upx;
        text-align: center;
        /* z-index: 100; */
    }

    .bottom-nav-item {
        font-size: 36upx;
        color: #555;
        width: 50%;
        padding-top: 26upx;
        border-right: 1px solid #D3D3D3;
    }

    .bottom-nav-item:active {
        background-color: #c9c9c9;
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
		color: #555;
		text-align: center;
	}
</style>
