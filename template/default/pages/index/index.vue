<template>
  <view class="container" ref="container">
    <horizon />
    <view class="kv" v-if="startList.length != 0">
      <template v-for="(v, k) in startList">
        <view
          :key="k"
          :style="
            'opacity:' +
            (startImgIndex == v.index) * 1 +
            ';background-image: url(' +
            v.src +
            ');'
          "
        ></view>
      </template>
    </view>
    <view class="timer">
      <span>{{ timerNum.h }}</span>
      <span>{{ timerNum.m }}</span>
      <span>{{ timerNum.s }}</span>
    </view>
    <view class="pd"></view>
    <button
      class="btn1"
      hover-class="none"
      @click="reserve"
      @touchend="PTTSendClick('reserve', '立即秒杀')"
      v-if="secKillStatus == 0 || secKillStatus == 3"
    ></button>
    <button v-else class="btn1 gray" hover-class="none"></button>
    <view class="progress">
      <view class="num">{{ 3 - friendsList.length }}</view>
      <view class="invitation-list">
        <view class="item" v-for="(item, index) in 3" :key="index">
          <image
            class="avatar user-head"
            :src="
              friendsList[index].guestHeadImg ||
              'https://game.gtimg.cn/images/lv/act/5837/a20210526ms/headimg.jpg'
            "
            mode="aspectFill"
            v-if="friendsList[index]"
          ></image>

          <image
            class="avatar"
            src="https://game.gtimg.cn/images/lv/act/5837/a20210526ms/avatar.png"
            mode="aspectFill"
            @click="share"
            @touchend="PTTSendClick('share3', '邀请好友')"
            v-else-if="secKillStatus == 0"
          ></image>
          <button
            class="avatar"
            @click="share"
            open-type="share"
            @touchend="PTTSendClick('share3', '邀请好友')"
            v-else
          ></button>
        </view>
      </view>
      <view class="tips">邀请3位好友助力，即可完成0元秒杀</view>
      <template v-if="secKillStatus == 2 || secKillStatus == 4">
        <button
          class="btn7"
          hover-class="none"
          v-if="qualInvitedFriends == 0"
        ></button>
        <button
          class="btn6"
          @click="receive"
          @touchend="PTTSendClick('receive', '立即领取')"
          v-else
        ></button>
      </template>
      <button
        class="btn8"
        v-else-if="secKillStatus == 0"
        @click="share"
        @touchend="PTTSendClick('share', '立即邀请')"
      ></button>
      <template v-else>
        <button
          v-if="friendsList.length > 0"
          class="btn9"
          @click="share"
          @touchend="PTTSendClick('share', '继续邀请')"
          open-type="share"
        ></button>
        <button
          v-else
          class="btn8"
          @click="share"
          @touchend="PTTSendClick('share', '立即邀请')"
          open-type="share"
        ></button>
      </template>
      <button
        class="rules-btn"
        @click="pop = 2"
        @touchend="PTTSendClick('rules', '活动规则')"
      ></button>
    </view>
    <pop :show="pop == 1" class="pop">
      <view class="close" @click="closePop"></view>
      <view class="pop-content">
        <button
          class="btn3"
          open-type="share"
          @click="share"
          @touchend="PTTSendClick('share2', '邀请好友砍价')"
        ></button>
      </view>
    </pop>

    <pop :show="pop == 2" class="pop">
      <view class="close" @click="closePop"></view>
      <view class="pop-content rules-content">
        <view class="rules-title">活动规则</view>
        <!-- #ifdef H5 -->
        <view>1、用户邀请3人为自己成功助力，即可获得20抽</view>
        <view>2、活动期间每位玩家能帮助3位朋友助力</view>
        <view>
          3、发起秒杀后页面进行24小时倒计时，24内需要完成秒杀，否则秒杀失败，超过24小时秒杀失败后可重新发起秒杀
        </view>
        <view>
          4、奖励会以卡券的形式发放至参与活动的QQ号中，待游戏上线后，在QQ游戏中心下载并注册游戏，即可兑换。兑换入口为：QQ游戏中心-福利-右上角礼券仓库
        </view>
        <!-- #endif -->
        <!-- #ifdef MP-WEIXIN -->
        <view>1、用户邀请3人为自己成功助力，即可获得20抽</view>
        <view>2、活动期间每位玩家能帮助3位朋友助力</view>
        <view
          >3、发起秒杀后页面进行24小时倒计时，24内需要完成秒杀，否则秒杀失败，超过24小时秒杀失败后可重新发起秒杀</view
        >
        <view
          >4、活动奖励待游戏上线后可兑换。兑换路径入口：微信-发现-游戏-福利中心-全部礼包
          兑换领取</view
        >
        <!-- #endif -->
      </view>
    </pop>

    <pop :show="pop == 3" class="pop">
      <view class="progress-bar">
        <view class="triangle" :style="'left:' + progress + '%'"></view>
        <view class="curr" :style="'width:' + progress + '%'"></view>
      </view>
      <view class="progress-text">{{ progress }}%</view>
    </pop>
    <imageLoader
      :imgLoadList="imgs"
      @onProgress="onProgress"
      @onLoad="imgLoadEnd"
    />
  </view>
</template>

<script>
import http from '../../utils/request'
import config from '../../utils/config'
import { formatTimer } from '../../utils/util'
import horizon from '../../components/horizon'
import pop from '../../components/pop'
import imageLoader from '../../components/imageLoader'
const Ulink = requirePlugin('ulink-mini-sdk')
let imgs = []
for (let i = 0; i < 36; i++) {
  imgs.push('//game.gtimg.cn/images/lv/act/5837/a20210526ms/start/1_000' + (i + '').padStart(2, '0') + '.jpg')
}
export default {
  data() {
    return {
      imgs,
      startList: [],
      startImgIndex: 0,
      progress: 0,
      pop: 3,
      initFinish: false,
      friendsList: [], // 助力列表
      inviteInfo: "",// 邀请码
      timeLeft: 0, // 倒计时
      qualInvitedFriends: "0",// 领取连抽礼包资格 <= 0 为已领取
      secKillStatus: 0,// 秒杀状态 0:未开启秒杀 1:秒杀中，不邀请满3人 2:秒杀中，已邀请满3人 3:已结束，未邀请满3人 4:已结束，邀请满3人[此时应展示礼包领取结果]
      timer: null, // 计时器
    }
  },
  computed: {
    timerNum() {
      return formatTimer(this.timeLeft)
    },
  },
  components: {
    horizon,
    pop,
    imageLoader,
  },
  onLoad() {
    this.AppInit().then(res => {
      this.init()
      // #ifdef MP-WEIXIN
      Ulink.BookGame.get().then(({ data }) => {
        console.log(data)
        if (data.state == 1) {
          this.start()
        } else {
          Ulink.BookGame.post({ noticeid: 90265059 })
        }
      })
      // #endif
    })
  },
  onShow() {
    // #ifdef H5
    window.addEventListener('scroll', this.scrollToTop)
    // #endif
  },
  onShareAppMessage(e) {
    return {
      title: '神仙卡面可以免费抽啦，快来帮我秒杀吧~',
      path: e.from == 'button' && this.inviteInfo ? `/pages/guest/guest?invite=${this.inviteInfo}` : `/pages/index/index`,
      imageUrl: config.assertsUrl + 'miniapp-share.jpg',
    }
  },
  methods: {
    //初始化
    init() {
      http('User/indexInit', {
        platId: Ulink.CONSTS.isIOS ? 2 : 1
      }, { loading: false }).then(res => {
        this.friendsList = res.data.friendsList
        this.inviteInfo = res.data.inviteInfo
        this.timeLeft = +res.data.timeLeft
        this.qualInvitedFriends = res.data.qualInvitedFriends
        this.secKillStatus = res.data.secKillStatus
        this.initFinish = true
        if ((this.secKillStatus == 2 || this.secKillStatus == 4) && this.qualInvitedFriends > 0) {
          uni.showModal({
            content: `您已成功秒杀20抽，请领取奖励~`,
            showCancel: false,
          })
        }
        this.setTimer()
      })
    },
    //倒计时
    setTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.timeLeft == 0) {
          clearInterval(this.timer)
          return
        }
        this.timeLeft--
      }, 1000);
    },
    // 预约wifi预约下载
    reserve() {
      if (!this.checkInit()) return
      // #ifdef H5
      // if (this.secKillStatus == 0) {
      //   if (Ulink.CONSTS.isIOS) {
      //     uni.showModal({
      //       content: `预约成功，游戏上线后将通知你`,
      //       showCancel: false,
      //     })
      //   } else {
      //     uni.showModal({
      //       content: `预约成功，游戏上线后将在Wi-Fi下自动下载`,
      //       showCancel: false,
      //     })
      //   }
      // }
      this.start()
      // #endif
      // #ifdef MP-WEIXIN
      if (Ulink.CONSTS.isIOS) {
        uni.showModal({
          content: `预约成功，游戏上线后将通知你`,
          showCancel: false,
        })
      } else {
        uni.showModal({
          content: `预约成功，游戏上线后将在Wi-Fi下自动下载`,
          showCancel: false,
        })
      }
      // #endif
    },
    // 开启秒杀
    start() {
      if (!this.checkInit()) return
      if (this.secKillStatus != 0 && this.secKillStatus != 3) return
      http('User/startSecKill', {
        platId: Ulink.CONSTS.isIOS ? 2 : 1
      }).then(res => {
        this.timeLeft = +res.data
        this.secKillStatus = 1
        this.setTimer()
        this.pop = 1
        this.backBottom()
      })
    },
    // 领取
    receive() {
      // #ifdef H5
      const route = 'Lottery/obtainInvitedFriendsQQ'
      // #endif
      // #ifdef MP-WEIXIN
      const route = 'Lottery/obtainInvitedFriendsWX'
      // #endif
      http(route, {}, { resAlert: 'alert' }).then(res => {
        this.timeLeft = 0
        this.qualInvitedFriends = 0
      })
    },
    checkInit() {
      //验证登录态
      if (!this.isLogin) {
        this.AppInit().catch(err => {
          uni.showToast({
            title: '请在手Q内打开',
            icon: 'none'
          })
        })
        return false
      }
      //验证初始化
      if (!this.initFinish) {
        this.init()
        return false
      }
      return true
    },
    onProgress(e) {
      console.log(e)
      this.progress = e
      if (e == 100) {
        this.closePop()
      }
    },
    imgLoadEnd(e) {
      this.startList = e
      this.startImgTimer()
    },
    startImgTimer() {
      setTimeout(() => {
        this.startImgIndex++
        if (this.startImgIndex >= 36) {
          this.startImgIndex = 24
        }
        this.startImgTimer()
      }, 100);
    },
    backBottom() {
      // #ifdef H5
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop - ispeed
        if (this.scrollTop >= document.body.scrollHeight - document.body.clientHeight) {
          clearInterval(timer)
        }
      }, 16)
      // #endif
      // #ifdef MP-WEIXIN
      wx.pageScrollTo({
        scrollTop: 9999,
        duration: 300
      })
      // #endif
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 60) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    },
    share() {
      // #ifdef H5
      if (!this.checkInit()) return
      if (this.secKillStatus == 0) {
        uni.showToast({
          title: '请先开启秒杀后再分享～',
          icon: 'none'
        })
        return
      }
      window.mqq && window.mqq.invoke(
        'QQApi',
        'shareArkMessage',
        {
          appName: 'com.tencent.gamecenter.qqsy', // 固定
          appView: 'picView2', // 固定
          appDesc: '光与夜之恋', // 固定
          promptText: '砍价秒杀活动分享', // 可修改，对话列表提示信息
          appMinVersion: '1.0.0.1', // 固定
          appConfig: JSON.stringify({
            type: 'normal', // 固定
            forward: 0, // // 0: 不允许转发ark 1: 允许转发，按需填
          }),
          metaData: JSON.stringify({
            shareData: {
              appid: '1106900827', // 固定，游戏appid
              openId: '',   // 可留空，用户openId(或gopenid)
              scene: '753',
              url: config.share.arkImgUrl,       // 可选，可传入大图url
              extData: {
                invite: this.inviteInfo
              }    // 可选。与场中配置的跳转链接关联透传参数
            },
          }),
        },
        function (result) { /* your actions */ }
      )
      // #endif
    },
    closePop() {
      this.pop = 0
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1495rpx;
  view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: 100% 100%;
  }
}
.timer {
  position: absolute;
  z-index: 8;
  top: 1233rpx;
  left: 386rpx;
  width: 335rpx;
  height: 66rpx;
  background: url("https://game.gtimg.cn/images/lv/act/5837/a20210526ms/timer.png")
    no-repeat left top/100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    width: 92rpx;
    height: 66rpx;
    line-height: 66rpx;
    font-size: 60rpx;
    color: #ffffff;
    letter-spacing: 15rpx;
    text-indent: 8rpx;
    text-align: center;
    font-family: Helvetica;
  }
}
.pd {
  height: 1303rpx;
}
.btn1 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn1.png)
    no-repeat center center/100% 100%;
  margin: 55rpx auto;
  position: relative;
  z-index: 9;
}
.progress {
  position: absolute;
  top: 1493rpx;
  left: 0;
  width: 100%;
  .num {
    width: 68rpx;
    height: 95rpx;
    line-height: 1.5;
    text-align: center;
    font-size: 86rpx;
    color: #ea7373;
    margin-left: 240rpx;
    font-family: Helvetica;
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
      background: #fff;
      .avatar {
        display: block;
        width: 100%;
        height: 100%;
        background: transparent
          url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/avatar.png)
          no-repeat center center/100% 100%;
      }
      button {
        width: 100%;
        height: 100%;
      }
      .user-head {
        border: 1px solid #8b72e8;
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
.btn7 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn7.png)
    no-repeat center center/100% 100%;
  margin: 25rpx auto 0;
}
.btn8 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn8.png)
    no-repeat center center/100% 100%;
  margin: 25rpx auto 0;
}

.btn9 {
  width: 367rpx;
  height: 105rpx;
  background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn9.png)
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
    margin: auto;
    background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/pop1.png)
      no-repeat center center/auto 100%;
    padding-top: 635rpx;
    box-sizing: border-box;
  }
  .rules-content {
    width: 80%;
    background: #fff;
    padding: 30rpx;
    height: 760rpx;
    overflow: auto;
    font-size: 34rpx;
    line-height: 1.5;
    .rules-title {
      text-align: center;
      font-size: 40rpx;
      margin-bottom: 25rpx;
    }
    view {
      margin-top: 15rpx;
    }
  }
  .btn3 {
    width: 402rpx;
    height: 105rpx;
    background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/btn3.png)
      no-repeat center center/100% 100%;
  }
}
.progress-bar {
  position: relative;
  width: 529rpx;
  height: 28rpx;
  background-color: #8a69ef;
  border: 5rpx solid rgba(131, 91, 255, 0.51);
  border-radius: 28rpx;
  margin: auto;
  .triangle {
    display: block;
    position: absolute;
    top: -20rpx;
    width: 0;
    height: 0;
    border-left: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-top: 20rpx solid #8a69ef;
  }
  .curr {
    position: relative;
    height: 28rpx;
    border-radius: 28rpx;
    overflow: hidden;
    &::before {
      content: "";
      display: block;
      width: 529rpx;
      height: 28rpx;
      position: absolute;
      left: 0;
      top: 0;
      background: url(https://game.gtimg.cn/images/lv/act/5837/a20210526ms/progress.png)
        no-repeat left center/100% 100%;
    }
  }
}
.progress-text {
  font-size: 24rpx;
  color: #fff;
  text-align: center;
  padding-top: 15rpx;
}
.gray {
  filter: grayscale(100%);
}
</style>
