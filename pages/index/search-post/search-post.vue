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
				<view class="hot-search-list-item" v-for="(item, index) in hotSearchList" :key="item.id" :data-index="index" :id="'hs-'+item.id">
					{{item.content}}
				</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-histroy">
			<view class="search-histroy-label">
				<view class="search-histroy-label-left">搜索历史</view>
				<view class="search-histroy-label-right">全部清空</view>
			</view>
			<view class="search-histroy-item" v-for="(item, index) in searchHistroyList" :key="item.id" :data-index="index" :id="'sh-'+item.id">
				<image src="/static/icons/search-gray.png" class="search-histroy-item-icon-search"></image>
				<view class="search-histroy-item-content">{{item.content}}</view>
				<image src="/static/icons/delete-gray.png" class="search-histroy-item-icon-delete"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotSearchList: [
					{
						id: 1,
						content: "锐捷租借"
					},
					{
						id: 2,
						content: "开黑"
					},
					{
						id: 3,
						content: "打球"
					},
					{
						id: 4,
						content: "旧书转卖"
					}
				],
				searchHistroyList: [
					{
						id: 1,
						content: "水一水"
					},
					{
						id: 2,
						content: "再水一水"
					}
				],
				searchInput: ""
			}
		},
		onLoad() {
		},
		methods: {
			goSearchResult() {
				uni.navigateTo({
					url: "../search-result/search-result"
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "search-post.scss";
</style>
