<template>
    <view class="container">
        <view class="head"></view>
        <view class="head-nav">
            <text class="head-title">校园帮</text>
            <image src="/static/icons/search-white.png" class="head-search" @click="goSearch()"></image>
        </view>

        <view class="index-body">
            <view class='nav'>
                <!-- 导航栏 -->
                <scroll-view id="tab-bar" class="swiper-tab" scroll-x :scrollLeft="scrollLeft">
                    <view v-for="(item,index) in agents" :key="index" :class="index==tabClick?'clickClass':''" class="swiper-tab-list"
                        @click='navClick(index)'>{{item.title}}</view>
                </scroll-view>
                <!-- <view class="underlineBox" :style='"transform:translateX("+isLeft+"px)"'>
					<view class="underline"></view>
				</view> -->
            </view>
            <view class="news" v-show="currentTab==0">
                <swiper class="slider" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
                    :duration="duration">
                    <swiper-item v-for="(img,index) in imageList" :key="index" class="frame">
                        <image class="image" :src="img.imageUrl"></image>
                    </swiper-item>
                </swiper>
            </view>
            <swiper :current="currentTab" @change="swiperTab" :style="{height: isHeight}">
                <swiper-item v-for="(item,index) in agents" :key="index">
                    <view class='content'>
                        <view class='card' v-for="(listItem,listIndex) in item.list" v-show="item.list.length > 0" :key="listIndex"
                            :data-index="listIndex" @click="goDetail">
                            <view class="media-title">
                                <text class="media-title-text">{{listItem.title}}</text>
                            </view>
                            <view class="media-preview">
                                <text class="media-preview-text">{{listItem.content}}</text>
                            </view>
                            <view class="media-head-image">
                                <image v-show="listItem.headImageUrl" :src="listItem.headImageUrl" class="media-head-image-detail"></image>
                                <!-- <image v-else class="media-head-image-detail" src="../../static/icons/logo.png"></image> -->
                            </view>
                            <view class="media-name">
                                <text class="media-name-text">{{listItem.userName}}</text>
                            </view>
                            <view class="media-points-view-comment">
                                <text class="media-points-text">${{listItem.points}}</text>
                                <text class="media-points-view-comment-text">浏览{{listItem.viewNum}} 评论{{listItem.commentNum}}</text>
                            </view>
                            <view class="media-time">
                                <text class="media-time-text">{{listItem.issueTime}}</text>
                            </view>
                        </view>
                    </view>
                    <view class='noCard' v-if="item.list.length===0">
                        暂无信息
                    </view>
                </swiper-item>
            </swiper>
        </view>

        <!-- 新建帖子 -->
        <image src="../../static/icons/add.png" mode="" class="add-post" @click="goAddPost"></image>
    </view>
</template>

<script>
    import store from "../../store/index.js";
    import api from "../../api/api.js";
    import {
        friendlyDate
    } from '../../common/util.js';

    export default {
        data() {
            return {
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
                scrollLeft: 0,
                currentTab: 0,
                tabClick: 0,
                isHeight: '',
                isLeft: 0,
                agents: [{
                    title: '学术论坛',
                    list: [],
                    id: 0,
                    pages: 0
                }, {
                    title: '校园动态',
                    list: [],
                    id: 1,
                    pages: 0
                }, {
                    title: '二手交易',
                    list: [],
                    id: 2,
                    pages: 0
                }, {
                    title: '缺个伴吗',
                    list: [],
                    id: 3,
                    pages: 0
                }, {
                    title: '帮你干活',
                    list: [],
                    id: 4,
                    pages: 0
                }, {
                    title: '经验交流',
                    list: [],
                    id: 5,
                    pages: 0
                }],
                isWidth: 0,
                imageList: []
            }
        },
        mounted() {
            // 设置swiper高度
            this.isHeight = this.agents[this.currentTab].list.length * 300 + 160 + 'rpx'
            // console.log(this.isHeight)
            var that = this
            // 获取设备宽度
            // uni.getSystemInfo({
            // 	success(e) {
            // 		that.isWidth = e.windowWidth / that.agents.length
            // 	}
            // })
        },
        methods: {
            goAddPost() {
                uni.navigateTo({
                    url: 'add-post/add-post'
                });
            },
            goDetail(e) {
                var index = e.currentTarget.dataset.index;
                var postId = this.agents[this.currentTab].list[index].postId;
                console.log(postId);
                var detail = {
                    postId
                };
                uni.navigateTo({
                    url: 'post-detail/post-detail?query=' + encodeURIComponent(JSON.stringify(detail))
                });
            },
            goSearch() {
                uni.navigateTo({
                    url: 'search-post/search-post'
                });
            },
            // 导航栏点击
            navClick(index) {
                this.currentTab = index
                this.tabClick = index
                var that = this
                var url = api.urls.getPostList;
                var data = {
                    num: 0,
                    postType: that.currentTab
                };
                api.req.get(url, data, (res) => {
                    if (res.code === 0) {
                        for (var i = 0; i < res.data.content.length; i++)
                            res.data.content[i].issueTime = friendlyDate(new Date(res.data.content[i].issueTime
                                .replace(/\-/g, '/').replace(/\T/g,
                                    ' ').substring(0, 19)).getTime())
                        that.agents[index].list = res.data.content
                        console.log(that.agents[index].list.length)
                    }
                }, (fail) => {
                    setTimeout(() => {
                        uni.hideLoading()
                        uni.stopPullDownRefresh()
                        uni.showToast({
                            icon: 'none',
                            title: '刷新失败，请稍后再试'
                        });
                    }, 4000)
                });
            },
            // swiper 滑动
            swiperTab: function(e) {
                // console.log(e)
                var index = e.detail.current //获取索引
                this.isHeight = this.agents[index].list.length * 300 + 160 + 'rpx' //设置swiper高度
                this.isLeft = index * this.isWidth //设置下划线位置
                this.currentTab = e.detail.current //设置swiper的第几页
                this.tabClick = e.detail.current //设置导航点击了哪一个var url = api.urls.getPostList;

                if (this.currentTab == 4) {
                    this.scrollLeft = 150
                } else if (this.currentTab == 5) {
                    this.scrollLeft = 150
                }
                if (this.currentTab == 1 || this.currentTab == 0) {
                    this.scrollLeft = 0
                }
                var that = this
                var url = api.urls.getPostList;
                var data = {
                    num: 0,
                    postType: that.currentTab
                };
                api.req.get(url, data, (res) => {
                    if (res.code === 0) {
                        for (var i = 0; i < res.data.content.length; i++)
                            res.data.content[i].issueTime = friendlyDate(new Date(res.data.content[i].issueTime
                                .replace(/\-/g, '/').replace(
                                    /\T/g,
                                    ' ').substring(0, 19)).getTime())
                        that.agents[that.currentTab].list = res.data.content
                        that.isHeight = that.agents[that.currentTab].list.length * 300 + 160 + 'rpx'
                    }
                }, (fail) => {
                    setTimeout(() => {
                        uni.hideLoading()
                        uni.stopPullDownRefresh()
                        uni.showToast({
                            icon: 'none',
                            title: '刷新失败，请稍后再试'
                        });
                    }, 4000)
                });
            }
        },
        onPullDownRefresh() {
            console.log(`刷新第${this.currentTab}项`)
            var that = this
            var urlImg = api.urls.getRollImage
            var dataImg = {
                imagePosition: 'true'
            }
            api.req.get(urlImg, dataImg, (resImg) => {
                console.log(resImg)
                if (resImg.code == 0) {
                    that.imageList = resImg.data
                }
            });
            var url = api.urls.getPostList;
            var data = {
                num: 0,
                postType: that.currentTab
            };
            api.req.get(url, data, (res) => {
                if (res.code === 0) {
                    for (var i = 0; i < res.data.content.length; i++)
                        res.data.content[i].issueTime = friendlyDate(new Date(res.data.content[i].issueTime.replace(
                            /\-/g, '/').replace(
                            /\T/g,
                            ' ').substring(0, 19)).getTime())
                    that.agents[that.currentTab].list = res.data.content
                    that.isHeight = that.agents[that.currentTab].list.length * 300 + 160 + 'rpx'
                }
                uni.stopPullDownRefresh()
            }, (fail) => {
                setTimeout(() => {
                    uni.hideLoading()
                    uni.stopPullDownRefresh()
                    uni.showToast({
                        icon: 'none',
                        title: '刷新失败，请稍后再试'
                    });
                }, 4000)
            });
        },
        onReachBottom() {
            console.log(`加载${this.currentTab}`)
            uni.showLoading({
                content: '加载中'
            })
            var that = this
            if (that.agents[that.currentTab].list.length !== 0) {
                var url = api.urls.getPostList;
                var data = {
                    num: that.agents[this.currentTab].pages,
                    postType: that.currentTab
                };
                api.req.get(url, data, (res) => {
                    if (res.code === 0 && res.data.empty == false) {
                        for (var i = 0; i < res.data.content.length; i++)
                            res.data.content[i].issueTime = friendlyDate(new Date(res.data.content[i].issueTime
                                .replace(/\-/g, '/').replace(
                                    /\T/g,
                                    ' ').substring(0, 19)).getTime())
                        for (var i = 0; i < res.data.content.length; i++)
                            that.agents[that.currentTab].list.push(res.data.content[i])

                        that.agents[this.currentTab].pages = that.agents[this.currentTab].pages + 1
                        that.isHeight = that.agents[that.currentTab].list.length * 300 + 160 + 'rpx'
                        uni.hideLoading()
                    } else {
                        uni.hideLoading()
                        uni.showToast({
                            icon: 'none',
                            title: '你已经看到我的底线啦！',
                        });
                    }
                }, (fail) => {
                    setTimeout(() => {
                        uni.hideLoading()
                        uni.stopPullDownRefresh()
                        uni.showToast({
                            icon: 'none',
                            title: '刷新失败，请稍后再试'
                        });
                    }, 4000)
                });
            } else {
                uni.hideLoading()
                uni.showToast({
                    icon: 'none',
                    title: '你已经看到我的底线啦！',
                });
            }
        },
        onShow() {
            var that = this
            var urlImg = api.urls.getRollImage
            var dataImg = {
                imagePosition: 'true'
            }
            api.req.get(urlImg, dataImg, (resImg) => {
                console.log(resImg)
                if (resImg.code == 0) {
                    that.imageList = resImg.data
                }
            });
            var url = api.urls.getPostList;
            var data = {
                num: 0,
                postType: that.currentTab
            };
            api.req.get(url, data, (res) => {
                if (res.code === 0) {
                    for (var i = 0; i < res.data.content.length; i++)
                        res.data.content[i].issueTime = friendlyDate(new Date(res.data.content[i].issueTime.replace(
                            /\-/g, '/').replace(
                            /\T/g,
                            ' ').substring(0, 19)).getTime())
                    that.agents[this.currentTab].pages = that.agents[this.currentTab].pages + 1
                    that.agents[that.currentTab].list = res.data.content
                    that.isHeight = that.agents[that.currentTab].list.length * 300 + 160 + 'rpx'
                }
            }, (fail) => {
                setTimeout(() => {
                    uni.hideLoading()
                    uni.stopPullDownRefresh()
                    uni.showToast({
                        icon: 'none',
                        title: '刷新失败，请稍后再试'
                    });
                }, 4000)
            });
        }
    }
</script>



<style scoped>
    .container {
        /* position: absolute; */
        width: 750upx;
        background-color: #FFFFFF;
    }

    .head {
        position: fixed;
        width: 750upx;
        background-color: #FFFFFF;
        height: 60upx;
        z-index: 9999;
    }

    .head-nav {
        position: fixed;
        top: 60upx;
        width: 750upx;
        background-color: #2F85FC;
        height: 140upx;
        /* padding-top: 60upx; */
        z-index: 9990;
        flex-direction: row;
    }

    .head-title {
        position: relative;
        top: 32upx;
        font-size: 58upx;
        text-align: left;
        font-weight: bold;
        height: 160upx;
        color: #fefefe;
        margin-left: 40upx;
    }

    .head-search {
        position: relative;
        top: -37upx;
        height: 70upx;
        width: 70upx;
        margin-left: 630upx;
    }

    .index-body {
        position: relative;
        top: 200upx;
    }

    .slider {
        position: relative;
        height: 400upx;
    }

    .frame {
        height: 400upx;
    }

    .image {
        height: 400upx;
        width: 100%;
    }



    .news {
        height: 400upx;
    }

    .noCard {
        width: 90%;
        height: 200upx;
        margin: auto;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
        border-radius: 10upx;
    }

    swiper {
        min-height: 90vh;
    }

    .clickClass {
        color: #0079FF;
    }

    .underline {
        width: 84upx;
        height: 3px;
        background-color: white;
    }

    .underlineBox {
        width: 25%;
        height: 3px;
        display: flex;
        align-content: center;
        justify-content: center;
        transition: .5s;
    }

    .navTabItem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 28upx;
    }

    .nav {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
    }

    .swiper-tab {
        width: 100%;
        white-space: nowrap;
        line-height: 100upx;
        height: 100upx;
    }

    .swiper-tab-list {
        font-size: 32upx;
        width: 150upx;
        display: inline-block;
        text-align: center;
    }

    /* 帖子格子css */
    .content {
        width: 750upx;
        padding: 0;
    }

    .card {
        position: relative;
        width: 750upx;
        height: 300upx;
        background-color: white;
        background: #FFFFFF;
        border-bottom-width: 1upx;
        border-bottom-style: solid;
        border-bottom-color: #c8c7cc;
        flex-direction: column;
    }

    .card-container {
        flex-direction: column;
    }

    .card:active {
        background-color: #eeeeee;
    }

    .media-title {
        position: relative;
        top: 25upx;
        left: 30upx;
        width: 100px;
    }

    .media-title-text {
        font-size: 38upx;
        line-height: 45upx;
        font-weight: bold;
        color: #343131;
        width: 450upx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .media-preview {
        position: relative;
        top: 40upx;
        left: 30upx;
        margin-top: 15upx;
    }

    .media-preview-text {
        font-size: 32upx;
        color: #666666;

        width: 700upx;
        height: 100upx;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .media-head-image {
        position: relative;
        top: 60upx;
        left: 30upx;
    }

    .media-head-image-detail {
        width: 70upx;
        height: 70upx;
        border-radius: 50%;
    }

    .media-name {
        position: relative;
        top: -10upx;
        left: 115upx;
        line-height: 50upx;
    }

    .media-name-text {
        text-align: left;
        color: #2F85FC;
        font-size: 32upx;
    }


    .media-points {
        position: relative;
        top: -30upx;
        left: 420upx;
        line-height: 50upx;
    }


    .media-points-view-comment {
        position: relative;
        top: -60upx;
        left: 510upx;
        line-height: 50upx;
    }

    .media-points-view-comment-text {
        font-size: 28upx;
        color: #666;
    }

    .media-points-text {
        text-align: left;
        color: #FFCC00;
        font-size: 30upx;
        padding-right: 10upx;
    }

    .media-time {
        position: relative;
        top: -330upx;
        left: 620upx;
    }

    .media-time-text {
        text-align: left;
        font-size: 28upx;
        line-height: 45upx;
        color: #c9c9c9;
    }

    .add-post {
        width: 100upx;
        height: 100upx;
        border-radius: 50%;
        position: fixed;
        bottom: 90upx;
        right: 40upx;
    }
</style>
