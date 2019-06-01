<template>
    <view>
        <view id="message" class="content">
            <!-- 消息列表 -->
            <view v-for="(msgItem, index) in msgs" :key="msgItem.id">
                <view class="msg-item" :data-index="index" :id="msgItem.chatUserId" @click="showMsgDetail">
                    <!-- 左侧头像 -->
                    <image class="chat-user-head-img" :src="msgItem.chatUserHeadImg" mode=""></image>
                    <!-- 中间用户名和最新聊天内容 -->
                    <view class="msg-item-center">
                        <view class="chat-user-name">
                            {{msgItem.chatUserName}}
                        </view>
                        <view class="latest-msg-content">
                            {{msgItem.latestMsgContent}}
                        </view>
                    </view>
                    <!-- 右侧时间和未读消息数目 -->
                    <view class="msg-item-right">
                        <view class="latest-msg-time">
                            {{msgItem.latestMsgTime}}
                        </view>
                        <!-- 判断未读消息数目是否为0，为0隐藏 -->
                        <view class="not-read-msg-num" v-if="msgItem.notReadMsgNum != '0'">
                            {{msgItem.notReadMsgNum}}
                        </view>
                        <view class="not-new-message" v-else></view>
                    </view>
                </view>
                <view class="devide-line"></view>
            </view>
            <view class='noCard' v-if="msgs.length===0">
                暂无信息
            </view>
        </view>
    </view>
</template>

<script>
    import {
        friendlyDate,
        cutString
    } from "@/common/util.js";

    export default {
        data() {
            return {
                msgs: []
            }
        },
        onShow: function() {
            var url = this.$api.urls.getChatList;
            var data = {};
            this.$api.req.get(url, data, (res) => {
                this.msgs = res.data.map((item, index) => {
                    return {
                        id: index,
                        chatUserHeadImg: item.headIimage,
                        chatUserId: item.userId,
                        chatUserName: "",
                        chatUser: {},
                        latestMsgContent: item.latedMessage,
                        notReadMsgNum: item.newMessageNum,
                        latestMsgTime: friendlyDate(new Date(item.latedTime.replace(/\-/g, '/').replace(
                            /\T/g, ' ').substring(0, 19)).getTime())
                    }
                })
                this.getUserData();
            })
            for (var msgItem of this.msgs) {
                // 裁剪过长的消息内容
                msgItem.latestMsgContent = cutString(msgItem.latestMsgContent, 15);
                // 隐藏过多的未读消息
                msgItem.notReadMsgNum = (msgItem.notReadMsgNum > 99 ? '99+' : '' + msgItem.notReadMsgNum);
            }
        },
        methods: {
            showMsgDetail: function(e) {
                let detail = this.msgs[e.currentTarget.dataset.index];
                uni.navigateTo({
                    url: "message-detail/message-detail?detail=" + encodeURIComponent(JSON.stringify(detail))
                });
            },
            getUserData() {
                this.msgs.map((item) => {
                    var url = this.$api.urls.getOtherUserInfo + item.chatUserId;
                    var data = {};
                    this.$api.req.get(url, data, (res) => {
                        item.chatUser = res.data;
                        item.chatUserName = res.data.name;
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    @import '@/app.scss';

    .content {
        @extend %content;
        padding: 0 10upx;
    }

    #message {
        width: 730upx;
    }

    .msg-item {
        @include row;
        padding: 10upx;
    }

    .chat-user-head-img {
        @include circle(100upx);
        margin: 27upx 5upx;
        margin-right: 25upx;
    }

    .msg-item-center {
        @include column($space: space-around);
        flex: 1;
    }

    .chat-user-name {
        @include font(34upx, 55upx, $align: left, $bold: bold, $color: #666);
        padding-top: 15upx;
    }

    .latest-msg-content {
        @include font(30upx, 35upx, $align: left, $color: #666);
        height: 60upx;
    }

    .msg-item-right {
        @include column($space: space-around);
        width: 150upx;
    }

    .latest-msg-time {
        @include font(28upx, 55upx, $align: center);
        width: 100%;
    }

    .not-read-msg-num {
        @include like-ellipse(36upx, red);
        @include font(22upx, 36upx, white);
        padding: 0 5upx;
        margin: 10upx auto;
        margin-left: 30upx;
    }

    .not-new-message {
        width: 75upx;
        height: 60upx;
    }
    
    .noCard {
        width: 90%;
        height: 200upx;
        margin: auto;
        margin-top: 20upx;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
        border-radius: 10upx;
    }
</style>
