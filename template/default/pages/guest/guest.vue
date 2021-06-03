<template>
  <view class="container">
    <view class="kv"></view>
    <view class="timer">
      <span>20</span>
      <span>20</span>
      <span>5</span>
    </view>
    <button class="btn4"></button>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 1560rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/k-bg.jpg)
    no-repeat center top/100% 100%;
}
.kv {
}
.timer {
  padding-top: 1233rpx;
  padding-left: 386rpx;
  span {
    display: inline-block;
    width: 92rpx;
    height: 66rpx;
    line-height: 66rpx;
    font-size: 60rpx;
    color: #ffffff;
    letter-spacing: 13rpx;
    text-indent: 10rpx;
    text-align: center;
    margin-right: 28rpx;
    font-family: Helvetica;
  }
}

.btn4 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn4.png)
    no-repeat center center/100% 100%;
  margin: 55rpx auto;
}
</style>