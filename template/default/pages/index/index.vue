<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <button @click="handleInit">绑定大区</button>
    <!-- <roleSelector ref="roleSelector"/> -->
  </view>
</template>

<script>
import init from '../../utils/init';
const Ulink = requirePlugin('ulink-mini-sdk')
export default {
  components: {
    // roleSelector
  },
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {
    init().catch(err => {
      console.log(err)
    })
  },
  methods: {

  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
