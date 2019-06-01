<template>
    <view id="my-follows" class="content">
        <block v-for="(myFollow, index) in myFollows" :key="myFollow.id">
            <view class="my-follow-item" :id="myFollow.id" :data-index="index">
                <view class="left">
                    <image :src="myFollow.userHeadImg" class="user-head-img" :data-userId="myFollow.id" @click.stop="goUserData"></image>
                    <view class="my-follow-item-center">
                        <view class="has-certified" v-if="myFollow.isCertified">已认证</view>
                        <view class="not-certified" v-else>未认证</view>
                        <view class="user-name">{{myFollow.name}}</view>
                    </view>
                </view>
                <view class="my-follow-item-right">
                    <image class="normal-icon" src="/static/icons/more.png"></image>
                    <image class="normal-icon" src="/static/icons/cancel-follow.png" @click.stop="cancelAttention"
                        :data-index="index"></image>
                </view>
            </view>
            <view class="devide-line"></view>
        </block>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                myFollows: []
            }
        },
        onLoad() {
            var url = this.$api.urls.getAttentions;
            var data = {};
            this.$api.req.get(url, data, (res) => {
                console.log(res);
                this.myFollows = res.data.map((item) => {
                    return {
                        id: item.id,
                        userHeadImg: item.imageUrl,
                        name: item.name,
                        isCertified: item.isCertified
                    }
                })
            });
            // this.follow(2);
            // this.follow(27);
            // this.follow(6034);
            // this.follow(534);
        },
        methods: {
            follow(id) {
                var url = this.$api.urls.attentionSomeone;
                var data = {
                    beAttentionUserId: id
                };
                this.$api.req.post(url, data, (res) => {
                    console.log(res);
                })
            },
            cancelAttention(e) {
                var index = e.currentTarget.dataset.index;
                var url = this.$api.urls.cancelAttention;
                var data = {
                    beAttentionUserId: this.myFollows[index].id
                };
                this.$api.req.del(url, data, (res) => {
                    console.log(res);
                    this.myFollows.splice(e.currentTarget.dataset.index, 1);
                    uni.showToast({
                        icon: "none",
                        title: "取消关注成功"
                    })
                })
            },
            goUserData(e) {
                console.log(e.currentTarget.dataset.userid, this.$store.state.userInfo.id);
                if (e.currentTarget.dataset.userId != this.$store.state.userInfo.id) {
                    // 非自身的用户
                    uni.navigateTo({
                        url: "../../otherUsers/otherUsers?userId=" + e.currentTarget.dataset.userid
                    })
                }
            },
        }
    }
</script>

<style lang="scss">
    @import "@/app.scss";

    #my-follows {
        width: 750upx;
    }

    .my-follow-item {
        @include row;
        padding: 20upx 30upx;
    }

    .left {
        @include row;
        max-width: 600upx;
    }

    .user-head-img {
        @include circle(100upx);
        margin-right: 25upx;
    }

    .my-follow-item-center {
        @include column;
        flex: 1;
    }

    .has-certified {
        background: rgb(0, 153, 255);
        @include font(25upx, 40upx, #fefefe, $bold: bold);
        border-radius: 5upx;
        margin-bottom: 6upx;
        width: 105upx;
    }

    .not-certified {
        @extend .has-certified;
        background: #ccc;
    }

    .user-name {
        @include font(32upx, 45upx, #343131, $bold: bold, $align: left);
    }

    .my-follow-item-right {
        @include column;
    }
</style>
