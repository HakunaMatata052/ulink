<template>
  <view class="container">
    <view class="kv"></view>
    <view class="timer">
      <span>20</span>
      <span>20</span>
      <span>05</span>
    </view>
    <button class="btn1"></button>
    <view class="progress">
      <view class="num">3</view>
      <view class="invitation-list">
        <view class="item" v-for="(item, index) in 3" :key="index">
          <image
            class="avatar"
            src="https://game.gtimg.cn/images/lv/act/5837/a20210526ms/avatar.png"
            mode="aspectFill"
          ></image>
        </view>
      </view>
      <view class="tips">邀请3位好友助力，即可完成0元秒杀</view>
      <button class="btn2" v-if="true" @click="share"></button>
      <button class="btn6" v-else></button>
      <button class="rules-btn"></button>
    </view>
    <pop :show="popShow" class="pop">
      <view class="close" @click="closePop"></view>
      <view class="pop-content">
        <button class="btn3"></button>
      </view>
    </pop>
  </view>
</template>

<script>
import config from '../../utils/config';
import pop from '../../components/pop';
export default {
  data() {
    return {
      popShow: false
    }
  },
  components: {
    pop
  },
  onLoad() {
  },
  methods: {
    share(){
      ulink.share.init(config.share)
    },
    closePop(){
      this.popShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 2013rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/z-bg.jpg)
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
.btn1 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn1.png)
    no-repeat center center/100% 100%;
  margin: 55rpx auto;
}
.progress {
  position: absolute;
  top: 1493rpx;
  left: 0;
  width: 100%;
  .num {
    width: 68rpx;
    height: 92rpx;
    text-align: center;
    font-size: 86rpx;
    color: #ea7373;
    margin-left: 240rpx;
  }
  .invitation-list {
    width: 534rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30rpx auto;
    .item {
      width: 123rpx;
      height: 124rpx;
      .avatar {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tips {
    margin-top: 35rpx;
    font-size: 24rpx;
    color: #8c6ded;
    text-align: center;
  }
}
.btn2 {
  width: 310rpx;
  height: 89rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn2.png)
    no-repeat center center/100% 100%;
  margin: 25rpx auto 0;
}
.btn6 {
  width: 310rpx;
  height: 89rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn6.png)
    no-repeat center center/100% 100%;
  margin: 25rpx auto 0;
}
.rules-btn {
  width: 140rpx;
  height: 39rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/rules.png)
    no-repeat center center/100% 100%;
  margin: 25rpx auto 0;
}
.pop {
  .close {
    width: 69rpx;
    height: 125rpx;
    margin: auto;
    background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/close.png)
      no-repeat center center/100% 100%;
  }
  .pop-content {
    width: 100%;
    height: 764rpx;
    background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/pop1.png)
      no-repeat center center/auto 100%;
    padding-top: 635rpx;
    box-sizing: border-box;
  }
  .btn3 {
    width: 402rpx;
    height: 105rpx;
    background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn3.png)
      no-repeat center center/100% 100%;
  }
}
</style>
