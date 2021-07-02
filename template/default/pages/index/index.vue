<template>
  <view class="container">
    <horizon />
    <view class="logo" :style="'margin-top:' + titleHeight + 'px'"></view>
    <view
      class="wx-icon"
      v-if="isWechat"
      :style="'margin-top:' + titleHeight + 'px'"
    ></view>
    <view
      class="mqq-icon"
      v-else
      :style="'margin-top:' + titleHeight + 'px'"
    ></view>
    <view class="main">
      <view
        class="user-info"
        v-if="nickname || (userInfo && userInfo.nickName)"
      >
        欢迎你：{{ nickname || (userInfo && userInfo.nickName) }}
      </view>
      <view class="p1"> 收集生存物资 <text>赢稀有头饰</text> </view>
      <button
        v-if="nickname"
        class="btn1"
        @click="go('/pages/map/index')"
        @touchend="PTTSendClick('start', '开启探索之旅')"
      ></button>
      <template v-else>
        <button
          v-if="canIUseGetUserProfile"
          class="btn1"
          @click="start"
          @touchend="PTTSendClick('start', '开启探索之旅')"
        ></button>
        <button
          v-else
          class="btn1"
          open-type="getUserInfo"
          @getuserinfo="start"
          @touchend="PTTSendClick('start', '开启探索之旅')"
        ></button>
      </template>
    </view>
  </view>
</template>

<script>
import config from '../../utils/config'
import { filterEmoji } from '../../utils/util';
import http from '../../utils/request'
import horizon from '../../components/horizon'
import { mapState, mapMutations } from 'vuex'
const Ulink = requirePlugin('ulink-mini-sdk')
console.log(Ulink)
export default {
  data() {
    return {
      plat: Ulink.CONSTS.isIOS ? 'ios' : 'android',
      isWechat: Ulink.CONSTS.isWechat,
      canIUseGetUserProfile: true,
    }
  },
  computed: {
    ...mapState(['titleHeight']),
    ...mapState('init', ['initFinish', 'headImg', 'nickname', 'openid']),
  },
  components: {
    horizon,
  },
  onLoad() {
    this.checkInit()
    // #ifdef MP-WEIXIN
    this.canIUseGetUserProfile = !!uni.getUserProfile
    // #endif
    console.log(this.$store.state.titleHeight)
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapMutations('init', ['setInitFinish', 'setHeadImg', 'setNickname', 'setDotList', 'setOpenid']),
    //初始化
    init() {
      this.AppInit().then(res => {
        http('event/info', {
          plat: this.plat,
        }).then(res => {
          this.setHeadImg(res.data.userInfo.headImg)
          this.setNickname(res.data.userInfo.nickname)
          this.setOpenid(res.data.userInfo.openid)
          this.setDotList(res.data.light)
          this.setInitFinish(true)
        })
      }).catch(err => {
        uni.showToast({
          title: '请在手Q内打开',
          icon: 'none'
        })
      })
    },
    checkInit() {
      //验证初始化
      if (!this.initFinish) {
        this.init()
        return false
      }
      return true
    },
    async start(e) {
      if (!this.checkInit()) return
      if (!this.nickname) {
        let userProfile
        if (wx.getUserProfile) {
          userProfile = await wx.getUserProfile({ desc: '用于完善会员资料' })
          userProfile = userProfile.userInfo
        } else if (e.detail.userInfo) {
          userProfile = e.detail.userInfo
        }
        if (userProfile) {
          this.setUserInfo({
            ...userProfile,
            headimgurl: userProfile.avatarUrl,
          })
        }

        try {
          await http('event/save', {
            plat: this.plat,
            nickname: filterEmoji(this.userInfo.nickName).substr(0, 12) || (this.isWechat ? '微信用户' : '手Q用户'),
            headImg: this.userInfo.headimgurl || config.assertsUrl + 'headimg.jpg',
          })
        } catch (e) {
          throw new Error('授权失败')
        }
      }

      // #ifdef MP-WEIXIN
      // 获取预约状态
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      const appointmentStatus = await Ulink.BookGame.get()
      if (appointmentStatus.data) {
        if (appointmentStatus.data.state == 0) {
          const { data } = await Ulink.BookGame.post({ noticeid: 90265695 })
          uni.hideLoading()
          if (data && data.state) {
            this.go('/pages/map/index')
          } else {
            uni.showModal({
              content: '预约失败',
              showCancel: false,
            })
          }
        } else {
          uni.hideLoading()
          this.go('/pages/map/index')
        }
      } else {
        uni.hideLoading()
        uni.showModal({
          content: '预约失败~',
          showCancel: false,
        })
      }
      // #endif
      // #ifdef H5
      this.go('/pages/map/index')
      // #endif

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100vh;
  background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/home-bg.jpg)
    no-repeat center center/100% auto;
  display: flex;
  align-items: center;
}
.logo {
  width: 244rpx;
  height: 107rpx;
  background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/logo.png)
    no-repeat center center/100% 100%;
  position: absolute;
  left: 10rpx;
  top: 10rpx;
}
.mqq-icon {
  width: 107rpx;
  height: 107rpx;
  background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/mqq-icon.png)
    no-repeat center center/100% 100%;
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}
.wx-icon {
  width: 190rpx;
  height: 44rpx;
  background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/wx-icon.png)
    no-repeat center center/100% 100%;
  position: absolute;
  top: 30rpx;
  right: 0;
}
.main {
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  .user-info {
    text-align: center;
    font-size: 24rpx;
    color: #4c423f;
    padding-top: 20%;
  }
  .p1 {
    font-size: 27rpx;
    line-height: 36rpx;
    color: hsl(0, 0%, 87%);
    text-shadow: 0rpx 3rpx 16rpx 0rpx rgba(51, 39, 30, 0.74);
    margin-top: 210rpx;
    text {
      color: #fa7e23;
    }
  }
  .btn1 {
    width: 248rpx;
    height: 106rpx;
    background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/btn1.png)
      no-repeat center center/100% 100%;
    text-indent: 999999px;
    overflow: hidden;
    margin-top: 390rpx;
  }
}
</style>
