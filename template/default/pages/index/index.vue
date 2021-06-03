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

<style lang="less" scoped>
.container{
  .logo{
    height: 100rpx;
  }
}
</style>
