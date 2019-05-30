<template>
    <view id="change-userInfo">
        <!-- 背景图片 -->
        <image class="background-img" src="../../../../static/images/my_background.jpg"></image>
        <!-- 用户资料 -->
        <view class="userInfo">
            <!-- 用户头像 -->
            <image class="userInfo-head-img" :src="userInfo.headImageUrl" @click="goUploadImage"></image>

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
                <input type="text" v-model="userInfo.sex" class="userInfo-item-edit-input" maxlength="1" />
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
                <input type="text" v-model="userInfo.mail" class="userInfo-item-edit-input" maxlength="25" />
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
        onLoad(option) {
            let {
                avatar
            } = option;
            if (avatar) {
                this.userInfo.headImageUrl = avatar;
            }
        },
        // onShow() {
        //     api.req.getUserInfo()
        // },
        methods: {
            goUploadImage() {
                uni.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success(res) {
                        const src = res.tempFilePaths[0];

                        uni.redirectTo({
                            url: 'upload?src=' + src
                        });
                    }
                });
            },
            saveChange() {
                if (this.userInfo.name.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '用户名不能为空'
                    });
                    return;
                } else if (this.userInfo.phone.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '手机号不能为空'
                    });
                    return;
                } else if (this.userInfo.sex.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '性别不能为空'
                    });
                    return;
                } else if (this.userInfo.studentNum.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '学号不能为空'
                    });
                    return;
                } else if (this.userInfo.major.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '专业不能为空'
                    });
                    return;
                } else if (this.userInfo.college.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '学院不能为空'
                    });
                    return;
                } else if (this.userInfo.mail.length == 0) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '邮箱不能为空'
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
                if (this.userInfo.sex != this.male && this.userInfo.sex != this.female) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '性别只能为“男”或“女”'
                    });
                    console.log(this.userInfo.sex)
                    return;
                }
                if (this.userInfo.studentNum.length != 9) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '请输入9位数正确学号'
                    });
                    return;
                }
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.userInfo.mail)) {
                    this.loading = false;
                    uni.showToast({
                        icon: 'none',
                        title: '请输入有效邮箱地址'
                    });
                    return;
                }
                var that = this
                var url = api.urls.changeUserInfomation;
                var data = {
                    name: that.userInfo.name,
                    phone: that.userInfo.phone,
                    sex: that.userInfo.sex,
                    studentNum: that.userInfo.studentNum,
                    major: that.userInfo.major,
                    college: that.userInfo.college,
                    mail: that.userInfo.mail
                };

                api.req.put(url, data, (res) => {
                    if (res.code === 0) {
                        uni.showToast({
                            icon: 'none',
                            title: '修改成功！'
                        });
                        uni.navigateBack()
                    } else {
                        uni.showModal({
                            content: res.msg,
                            showCancel: false
                        })
                    }
                });
            }
        },
    }
</script>

<style lang="scss">
    @import "./change-userInfo";
</style>
