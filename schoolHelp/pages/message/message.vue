<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		onNavigationBarSearchInputClicked(e) {
			console.log('事件执行了')
			uni.navigateTo({
				url: '../message/message'
			});
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
