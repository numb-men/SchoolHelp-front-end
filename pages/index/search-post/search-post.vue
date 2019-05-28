<template>
	<view id="search-post">
		<!-- 顶部搜索区域 -->
		<view class="search">
			<view class="search-box">
				<image src="/static/icons/search-gray.png" class="search-box-icon-search-in"></image>
				<input type="text" v-model="searchInput" placeholder="搜索" placeholder-class="search-box-input-placeholder" class="search-box-input"/>
				<image src="/static/icons/speech.png" class="search-box-icon-speech-in"></image>
			</view>
			<image src="/static/icons/search-black.png" class="search-icon-search" @click="goSearchResult"></image>
		</view>
		<view class="devide-line"></view>
		<!-- 热门搜索 -->
		<view class="hot-search">
			<view class="hot-search-label">热门搜索</view>
			<view class="hot-search-list">
				<view class="hot-search-list-item" @click="searchIt" :data-content="item" v-for="(item, index) in hotSearchList" :key="index" :data-index="index" :id="'hs-'+index">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-histroy">
			<view class="search-histroy-label">
				<view class="search-histroy-label-left">搜索历史</view>
				<view class="search-histroy-label-right" @click="deleteAllSearchHistroy">全部清空</view>
			</view>
			<view class="search-histroy-item" v-for="(item, index) in searchHistroyList" :key="item.id" :data-index="index" :id="item.id">
				<image src="/static/icons/search-gray.png" class="search-histroy-item-icon-search"></image>
				<view class="search-histroy-item-content" @click="searchIt" :data-content="item.content">{{item.content}}</view>
				<image src="/static/icons/delete-gray.png" class="search-histroy-item-icon-delete" @click="deleteASearchHistroy" :data-index="index" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotSearchList: [],
				searchHistroyList: [],
				searchInput: ""
			}
		},
		onShow() {
			this.getHotSearchList();
			this.getSearchHistroy();
		},
		methods: {
			goSearchResult() {
				uni.navigateTo({
					url: "../search-result/search-result?keyword=" + this.searchInput
				})
			},
			getHotSearchList() {
				var url = this.$api.urls.getHotSearch;
				var data = {};
				this.$api.req.get(url, data, (res) =>{
					this.hotSearchList = res.data;
				})
			},
			getSearchHistroy() {
				if (this.$store.state.hasLogin){
					// 云端搜索记录
					var url = this.$api.urls.getSearchHistroy;
					var data = {};
					this.$api.req.get(url, data, (res) =>{
						console.log(res);
						this.searchHistroyList = res.data.map((item) =>{
							return {
								id: item.searchId,
								content: item.content
							};
						});
					})
				} else {
					// 如果未登录获取本地搜索缓存
					this.searchHistroyList = this.$store.state.searchHistroy.map((item, index) =>{
						return {
							id: index,
							content: item
						};
					});
				}
				console.log(this.searchHistroyList);
			},
			searchIt(e) {
				this.searchInput = e.target.dataset.content;
				this.goSearchResult();
			},
			deleteASearchHistroy(e) {
				if (this.$store.state.hasLogin) {
					var url = this.$api.urls.deleteASearchHistroy;
					var data = { searchId: this.searchHistroyList[e.target.dataset.index].id};
					this.$api.req.del(url, data, (res) =>{
						console.log(res);
					})
				}
				this.searchHistroyList.splice(e.target.dataset.index, 1);
				this.$store.commit("deleteASearchHistroy", e.target.dataset.index);
				console.log(this.searchHistroyList);
			},
			deleteAllSearchHistroy() {
				if (this.$store.state.hasLogin) {
					var url = this.$api.urls.deleteAllSearchHistroy;
					var data = {};
					this.$api.req.del(url, data, (res) =>{
						uni.showToast({
							title: "清空成功"
						})
					});
				}
				this.searchHistroyList = [];
				this.$store.commit("clearSearchHistroy");
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "search-post.scss";
</style>
