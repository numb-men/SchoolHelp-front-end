<template>
    <view class="content">
		<!-- 新建帖子输入盒 -->
		<view class="add-post-box">
			<view class="title-word-count">{{post.titleWordCount}}/15</view>
			<input type="text" :value="post.postTitle" placeholder="输入标题" placeholder-class="title-placeholder"
				class="post-title" maxlength="15" focus="true" confirm-type="done" @input="bindTitleInput"/>
			<view class="devide-line"></view>
			<textarea :value="post.postContent" placeholder="添加内容(至少15个字)" maxlength="400" 
				class="post-content" placeholder-class="content-placeholder" @input="bindContentInput"/>
		</view>
		<view class="content-word-count">{{post.contentWordCount}}/400</view>
		<!-- 标签盒 -->
		<view class="tags-box">
			<view class="tag" @click.stop="showTagInputBox">添加标签</view>
			<view class="tag" v-for="(tag, index) in post.tags" :key="index" :id="'tag'+index">
				{{tag}}
			</view>
		</view>
		<!-- 标签输入盒 -->
		<view class="tag-input-box" v-if="showTagInput">
			<input class="tag-input-box-input" type="text" v-model="tagInputContent" placeholder="七个字以内" maxlength="7">
			<view class="tag-input-box-add-btn" @click.stop="addTag">添加</view>
			<image src="/static/icons/delete-gray.png" class="tag-input-box-icon-cancel" @click.stop="hideTagInputBox"></image>
		</view>
		<!-- 底部操作栏 -->
		<view class="add-post-bottom">
			<view class="row-left">
				<picker class="set-points" :range="pointsRange" :value="pointsSelected" @change.stop="selectPoints">设置分数</picker>
				<view class="post-points" v-show="post.points!=-1">{{post.points}}</view>
				<picker class="set-sort" :range="postTypeRange"  :value="postTypeSelected" @change.stop="selectPostType">设置分类</picker>
				<view class="post-sorted" v-show="post.postType!=-1">{{postTypeComputed}}</view>
			</view>
			<view class="row-right">
				<image src="/static/icons/emoji.png" class="normal-icon" mode=""></image>
				<image src="/static/icons/pic.png" class="normal-icon" mode=""></image>
				<view class="send" @click.stop="sendPost">发送</view>
			</view>
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				post: {
					title: "",
					content: "",
					tags: [],
					titleWordCount: 0,
					contentWordCount: 0,
					points: -1,
					postType: -1
				},
				showTagInput: false,
				tagInputContent: "",
				pointsRange: [0, 5, 10, 20, 50, 100, 200],
				postTypeRange: ["学术论坛", "校园动态", "二手交易", "缺个伴吗", "帮你干活", "经验交流"],
				pointsSelected: 0,
				postTypeSelected: 0
            }
        },
		computed: {
			postTypeComputed() {
				return this.postTypeRange[this.post.postType];
			}
		},
        methods: {
			bindTitleInput: function(e){
				this.post.title = e.target.value;
				this.post.titleWordCount = e.target.value.length;
				// console.log(this.post.title, this.post.titleWordCount, this.post.title.length);
			},
			bindContentInput: function(e){
				this.post.content = e.target.value;
				this.post.contentWordCount = e.target.value.length;
			},
			goBack: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			showTagInputBox() {
				if (this.post.tags.length < 5) {
					this.showTagInput = true;
				}
				else {
					uni.showToast({
						icon: "none",
						title: "最多添加5个标签哦"  
					});
				}
			},
			hideTagInputBox() {
				this.showTagInput = false;
			},
			addTag() {
				if (this.post.tags.length < 5) {
					this.post.tags.push(this.tagInputContent);
					this.tagInputContent = "";
				}
				else {
					uni.showToast({
						icon: "none",
						title: "最多添加5个标签哦"  
					});
					this.tagInputContent = "";
					this.hideTagInputBox();
				}
			},
			selectPoints(e) {
				this.post.points = this.pointsRange[e.detail.value];
			},
			selectPostType(e) {
				this.post.postType = e.detail.value;
			},
			sendPost() {
				if (this.post.points == -1) {
					uni.showToast({
						icon: "none",
						title: "请设置帖子积分"
					});
					return;
				}
				if (this.post.postType == -1) {
					uni.showToast({
						icon: "none",
						title: "请设置帖子分类"
					});
					return;
				}
				if (this.post.title.length < 5 || this.post.title.length > 15) {
					uni.showToast({
						icon: "none",
						title: "帖子标题长度应在5-15之间"
					});
					return;
				}
				if (this.post.content.length < 15 || this.post.content.length > 400) {
					uni.showToast({
						icon: "none",
						title: "帖子内容长度应在15-400之间"
					});
					return;
				}
				var url = this.$api.urls.sendPost;
				var data = this.post;
				this.$api.req.post(url, data, (res)=>{
					console.log(res);
					if (res.code < 0){
						uni.showToast({
							icon: "none",
							title: res.msg
						});
					}
					else {
						uni.showToast({
							icon: "none",
							title: "发帖成功"
						});
						setTimeout(()=>{this.goBack()}, 1500);
					}
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
	@import "add-post.scss";
</style>