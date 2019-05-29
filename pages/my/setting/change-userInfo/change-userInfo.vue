<template>
    <view id="change-userInfo">
        <!-- 背景图片 -->
        <image class="background-img" src="../../../../static/images/my_background.jpg"></image>
        <!-- 用户资料 -->
        <view class="userInfo">
            <!-- 用户头像 -->
            <image class="userInfo-head-img" :src="userInfo.headUrl" @click="chooseImage"></image>

            <!-- 顶部 -->
            <view class="userInfo-top">
                <view class="userInfo-top-label">全部信息</view>
                <image class="userInfo-top-icon" src=""></image>
            </view>

            <!-- 详细资料 -->
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">昵称</view>
                <input type="text" v-model="userInfo.name" class="userInfo-item-edit-input" maxlength="13" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">手机号</view>
                <input type="text" v-model="userInfo.phone" class="userInfo-item-edit-input" maxlength="11" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">性别</view>
                <input v-if="userInfo.sex" type="text" v-model="male" class="userInfo-item-edit-input" maxlength="1" />
                <input v-else type="text" v-model="female" class="userInfo-item-edit-input" maxlength="1" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">学号</view>
                <input type="text" v-model="userInfo.studentNum" class="userInfo-item-edit-input" maxlength="9" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">专业</view>
                <input type="text" v-model="userInfo.major" class="userInfo-item-edit-input" maxlength="13" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">学院</view>
                <input type="text" v-model="userInfo.college" class="userInfo-item-edit-input" maxlength="13" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <view class="userInfo-item-label">邮箱</view>
                <input type="text" v-model="userInfo.password" class="userInfo-item-edit-input" maxlength="25" />
            </view>
            <view class="devide-line"></view>
            <view class="userInfo-item">
                <button type="primary" class="primary" formType="submit" @click="saveChange()">保存修改</button>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import store from "@/store/index.js";
    import api from "@/api/api.js";
    export default {
        computed: mapState(['hasLogin', 'userInfo', 'token']),
        data() {
            return {
                male: '男',
                female: '女'
            };
        },
        onLoad() {},
        methods: {
            chooseImage() {
                uni.chooseImage({
                    count: 1, //默认9
                    // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: function(res) {
                        console.log(JSON.stringify(res.tempFilePaths));
                        userInfo.headUrl = res.tempFilePaths[0];
                    }
                });
            },
            saveChange() {
                /* || userInfo.sex.length == 0 || userInfo.studentNum.length == 0 || userInfo.major.length == 0 || userInfo.college.length == 0 || userInfo.college.mail == 0*/
                if (this.userInfo.name.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '用户名不能为空'
                    });
                    return;
                }
                if (this.userInfo.phone.length != 11) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '手机号为11位数字'
                    });
                    return;
                }
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.userInfo.phone))) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '请检查手机号是否正确'
                    });
                    return;
                }
                if (this.userInfo.sex != this.male && this.userInfo.sex != this.female &&
                    this.userInfo.sex != true && this.userInfo.sex != false) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '性别只能为“男”或“女”'
                    });
                    return;
                }
                if (this.userInfo.studentNum.length > 0) {
                    if (this.userInfo.studentNum.length != 9) {
                        this.loading = false;
                        uni.showToast({
                            icon: 'none',
                            title: '请输入9位数正确学号或者不填'
                        });
                        return;
                    }
                }
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (this.userInfo.mail.length > 0) {
                    if (!reg.test(this.userInfo.mail)) {
                        this.loading = false;
                        uni.showToast({
                            icon: 'none',
                            title: '请输入有效邮箱地址'
                        });
                        return;
                    }
                }
                var that = this
                var url = api.urls.changeUserInfomation;
                var data = {
                    phone: this.userInfo.phone,
                };

                api.req.post(url, data, (res) => {
                    if (res.code === 0) {}
                });
            }
        },
    }
</script>

<style lang="scss">
    @import "./change-userInfo";
</style>
