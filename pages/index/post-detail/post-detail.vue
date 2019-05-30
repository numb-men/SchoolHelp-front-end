<template>
	<view id="post-detail" class="content">
		<view class="post-detail">
			<view class="show-user">
				<image class="user-head-img" :src="post.user.headImg" :data-userId="post.user.id" @click.stop="goUserData"></image>
				<view class="show-user-right">
					<view class="show-user-right-top">
						<view class="user-info">
							<view class="user-name">{{post.user.name}}</view>
							<view class="has-certified" v-if="post.user.isCertified">已认证</view>
							<view class="not-certified" v-else>未认证</view>
						</view>
						<view class="post-points">${{post.points}}</view>
					</view>
					<view class="post-publish-time">{{post.publishTime}}</view>
				</view>
			</view>
			<view class="post-title">{{post.title}}</view>
			<view class="devide-line"></view>
			<view class="post-content"><text>{{post.content}}</text></view>
			<view class="operation-box">
				<image class="operation-icon" src="/static/icons/collect.png" @click="collectPost"></image>
				<image class="operation-icon" src="/static/icons/comment2.png" @click="showAddCommentBox"></image>
				<view class="operation-times">{{post.commentNum}}</view>
				<image class="operation-icon" src="/static/icons/give-a-like.png" @click="approvalPost"></image>
				<view class="operation-times" >{{post.approvalNum}}</view>
				<image class="operation-icon" src="/static/icons/report.png" @click="reportPost"></image>
				<view class="operation-times">{{post.reportNum}}</view>
			</view>
		</view>
		<view class="post-devide-line"></view>
		<!-- 添加评论 -->
		<view class="add-comment-box" v-show="showAddComment">
			<textarea v-model="commentEnter" placeholder="输入评论..." class="add-comment-box-textarea" placeholder-class="add-comment-box-textarea-pr"/>
			<view class="add-comment-box-bottom">
				<view style="flex:1;"></view>
				<image class="operation-icon" src="/static/icons/emoji.png"></image>
				<image class="operation-icon" src="/static/icons/pic.png"></image>
				<view class="add-comment-box-bottom-submit" @click="addComment">评论</view>
			</view>
		</view>
		<!-- 评论列表 -->
		<view @click.stop="hideAddCommentBox">
			<block v-for="(comment, index) in post.comments" :key="comment.id">
				<view class="comment-item"  :data-index="index" :id="'comment-'+comment.id">
					<view class="show-user">
						<image class="user-head-img" :src="comment.user.headImg" :data-userId="comment.user.id" @click.stop="goUserData"></image>
						<view class="show-user-right">
							<view class="show-user-right-top">
								<view class="user-info">
									<view class="user-name">{{comment.user.name}}</view>
									<view class="has-certified" v-if="comment.user.isCertified">已认证</view>
									<view class="not-certified" v-else>未认证</view>
								</view>
								<image class="help-ok" src="/static/icons/help-ok.png" v-if="comment.helpOk"></image>
								<image class="help-not-ok" src="/static/icons/help-not-ok.png" v-else></image>
							</view>
							<view class="post-publish-time">{{comment.publishTime}}</view>
						</view>
					</view>
					<view class="comment-content">{{comment.content}}</view>
					<!-- <view class="operation-box">
						<image class="operation-icon-comment" src="/static/icons/comment2.png"></image>
						<image class="operation-icon-comment" src="/static/icons/give-a-like.png"></image>
						<image class="operation-icon-comment" src="/static/icons/report.png"></image>
					</view> -->
					<view class="devide-line"></view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		friendlyDate
	} from '@/common/util.js';
	
	export default {
		data() {
			return {
				showAddComment: false,
				commentEnter: "",
				postDetail: {},
				post: {}
			}
		},
		methods: {
			showAddCommentBox() {
				this.showAddComment = true;
			},
			hideAddCommentBox() {
				this.showAddComment = false;
			},
			goUserData(e) {
				console.log(e.currentTarget.dataset.userid, this.$store.state.userInfo.id);
				if (e.currentTarget.dataset.userId != this.$store.state.userInfo.id){
					// 非自身的用户
					uni.navigateTo({
						url: "../../otherUsers/otherUsers?userId=" + e.currentTarget.dataset.userid
					})
				}
			},
			addComment() {
				var url = this.$api.urls.addComment;
				var data = {postId: this.post.id, commentContent: this.commentEnter};
				console.log(data);
				this.$api.req.post(url, data, (res)=> {
					console.log(res);
					this.commentEnter = "";
					this.updateComments();
					this.hideAddCommentBox();
				})
			},
			updateComments() {
				var url = this.$api.urls.getAllComments + this.post.id;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					console.log(res);
					var helpUserId = this.post.helpUserId;
					var comments = [];
					if (res.data) {
						comments = res.data.map((item) =>{
							return {
								id: item.commentId,
								user: {
									id: item.userId,
									headImg: item.headImageUrl,
									isCertified: true,
									name: item.commentUserName
								},
								publishTime: friendlyDate(new Date(item.commentTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
								content: item.commentContent,
								helpOk: item.userId==helpUserId,
							}
						});
						this.post.comments = comments;
						this.checkCertified();
					}
				})
			},
			checkCertified() {
				var url = this.$api.urls.checkCertified;
				var userIds = [];
				userIds.push(this.post.user.id);
				this.post.comments.map((comment) =>{
					if (!userIds.includes(comment.user.id))
						userIds.push(comment.user.id);
				});
				var data = {userIds};
				console.log(data);
				this.$api.req.put(url, data, (res) =>{
					console.log(res);
					for (var i in userIds){
						if (i == 0) {
							this.post.user.isCertified = res.data[0];
							continue;
						}
						for (var comment of this.post.comments){
							if (comment.user.id == userIds[i]){
								comment.user.isCertified = res.data[i];
							}
						}
					}
					console.log(this.post);
				});
			},
			approvalPost() {
				var url = this.$api.urls.approvalPost;
				var data = { postId: this.post.id };
				this.$api.req.post(url, data, (res) =>{
					console.log(res);
					if (res.code == 0) {
						uni.showToast({
							icon: "none",
							title: res.data
						});
						if (res.data == "点赞成功"){
							this.post.approvalNum ++;
						}
						else if (res.data == "取消点赞") {
							this.post.approvalNum --;
						}
					}
					else {
						uni.showToast({
							icon: "none",
							title: res.msg
						});
					}
				})
			},
			reportPost() {
				var url = this.$api.urls.reportPost;
				var data = { postId: this.post.id, reportDes: "nonenonenonenonenonenonenone" };
				this.$api.req.post(url, data, (res) =>{
					if (res.code == 0) {
						uni.showToast({
							icon: "none",
							title: "举报成功"
						});
						this.post.reportNum ++;
					}
					else {
						uni.showToast({
							icon: "none",
							title: res.msg
						});
					}
				})
			},
			collectPost() {
				var url = this.$api.urls.collectPost;
				var data = { postId: this.post.id };
				this.$api.req.post(url, data, (res) =>{
					if (res.code == 0) {
						uni.showToast({
							icon: "none",
							title: "收藏成功"
						});
						this.post.collectNum ++;
					}
					else {
						uni.showToast({
							icon: "none",
							title: res.msg
						});
					}
				})
			},
			getPostDetail() {
				var url = this.$api.urls.getPostDetail + this.postDetail.postId;
				var data = {};
				this.$api.req.get(url, data, (res)=> {
					console.log(res);
					var helpUserId = res.data.post.helpUserId;
					var comments = [];
					if (res.data.comments) {
						comments = res.data.comments.map((item) =>{
							return {
								id: item.commentId,
								user: {
									id: item.userId,
									headImg: item.headImageUrl,
									isCertified: true,
									name: item.commentUserName
								},
								publishTime: friendlyDate(new Date(item.commentTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
								content: item.commentContent,
								helpOk: item.userId==helpUserId,
							}
						});
					}
					var resPost  = res.data.post;
					this.post = {
						id: resPost.postId,
						user: {
							id: resPost.userId,
							headImg: resPost.headImageUrl,
							isCertified: true,
							name: resPost.userName
						},
						title: resPost.title,
						content: resPost.content,
						publishTime: friendlyDate(new Date(resPost.issueTime.replace(/\-/g, '/').replace(/\T/g, ' ').substring(0, 19)).getTime()),
						points: resPost.points,
						comments: comments,
						viewNum: resPost.viewNum,
						approvalNum: resPost.approvalNum,
						commentNum: resPost.commentNum,
						reportNum: resPost.reportNum,
						helpUserId: resPost.helpUserId,
						helpOk: resPost.helpUserId!=-1
					}
					this.checkCertified();
				})
			}
		},
		onPullDownRefresh() {
			this.getPostDetail();
			setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 1000)
		},
 		onLoad: function(option){
			this.postDetail = JSON.parse(option.query);
			for (let key in this.postDetail){
				console.log(key, "---", this.postDetail[key]);
			}
			this.getPostDetail();
		}
	}
</script>

<style lang="scss" scoped>
	@import "post-detail.scss";
</style>
