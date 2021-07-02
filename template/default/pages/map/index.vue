<template>
  <view class="container" :style="'opacity:' + mapWidth ? 1 : 0">
    <horizon />
    <image
      class="logo"
      src="https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/logo.png"
      mode="widthFix"
      :style="'margin-top:' + titleHeight + 'px'"
    ></image>
    <view class="tabs" :style="'margin-top:' + titleHeight + 'px'">
      <view
        class="item"
        @click="changeTab(6)"
        @touchend="PTTSendClick('rules', '规则')"
        :class="currTab == 7 ? 'gray' : null"
      >
        规<view></view>则
      </view>
      <view
        class="item"
        @click="changeTab(7)"
        @touchend="PTTSendClick('gift', '礼包')"
        :class="currTab == 6 ? 'gray' : null"
      >
        礼<view></view>包
      </view>
    </view>
    <scroll-view
      class="scroll-view"
      scroll-x="true"
      :scroll-left="scrollLeft"
      :scroll-with-animation="true"
      :enhanced="true"
      :bounces="false"
    >
      <image
        class="map"
        src="https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/map.jpg"
        @load="mapLoadEnd"
        mode="heightFix"
      ></image>
      <image
        class="location"
        :style="'width:' + mapWidth + 'px'"
        src="https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/location.png"
      ></image>
      <view class="cloud-list" :style="'width:' + mapWidth + 'px'">
        <image
          v-for="(v, k) in 6"
          :key="k"
          :class="[
            'clouds',
            'c' + k,
            !dotList[k - 1] || dotList[k - 1] == 0 || dotList[k] == 2
              ? 'cloudmove'
              : null,
          ]"
          :id="!dotList[k - 1] || dotList[k] == 2"
          :src="
            'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/c' +
            k +
            '.png'
          "
          mode="widthFix"
        ></image>
      </view>
      <view class="dot-list" :style="'width:' + mapWidth + 'px'">
        <view :class="'dot dot' + k" v-for="(v, k) in 6" :key="k">
          <image
            class="light"
            :class="
              dotList[k] != 0 && (dotList[k - 1] == 0 || dotList[k] == 2)
                ? 'show'
                : 'hide'
            "
            :style="'width:' + mapWidth * 0.08 + 'px;'"
            src="https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/dot.png"
            mode="widthFix"
            @click="receive(k)"
            @touchend="PTTSendClick('receive', '光效')"
          >
          </image>
          <view class="prop">
            <image
              :class="dotList[k] != 0 ? 'prop-active' : 'gray'"
              :style="'width:' + mapWidth * 0.045 + 'px'"
              :src="
                'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop' +
                k +
                '.png'
              "
              mode="widthFix"
            >
            </image>
          </view>
        </view>
      </view>
    </scroll-view>
    <pop :show="pop == 1" @close="goOn">
      <view class="pop-content pop1">
        <view class="title">
          恭喜你，成功点亮{{ areaName[currArea] }}区域！
        </view>
        <view class="sub-title">并获得礼包</view>
        <view class="prop">
          <image
            :src="
              'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop' +
              currArea +
              '.png'
            "
            mode="widthFix"
          />
        </view>
        <view class="prop-name">{{ propName[currArea] }}</view>
        <button
          v-if="currArea < 5"
          class="pop-btn"
          @click="goOn"
          @touchend="PTTSendClick('goon', '继续点亮')"
        >
          继续点亮
        </button>
        <button
          v-else
          class="pop-btn"
          @click="closePop"
          @touchend="PTTSendClick('confirm2', '确定')"
        >
          确定
        </button>
        <view class="tips"
          >(礼包已通过卡券形式发放，请在卡包内查看。游戏不册档后即可兑换~)</view
        >
      </view>
    </pop>
    <pop :show="pop == 2" @close="closePop">
      <view class="pop-content pop2">
        <view class="tips"> 末日生存艰难，一个人是无法完成的哦~ </view>
        <view class="title">快找好友帮忙吧~</view>
        <view class="sub-title">点亮该区域你将获得</view>
        <view class="prop">
          <image
            :src="
              'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop' +
              currArea +
              '.png'
            "
            mode="widthFix"
          />
        </view>
        <view class="prop-name">{{ propName[currArea] }}</view>
        <button
          class="pop-btn"
          @click="share"
          open-type="share"
          @touchend="PTTSendClick('toHelp', '请好友帮忙')"
        >
          请好友帮忙
        </button>
      </view>
    </pop>
    <pop :show="pop == 3">
      <view class="pop-content pop3" v-if="fromInfo">
        <view class="title">快找好友帮忙吧~</view>
        <view class="avatar">
          <image :src="fromInfo.headImg" mode="aspectFill" />
        </view>
        <view class="nickname">{{ fromInfo.nickname }}</view>
        <view class="nickname">正在等待您的救援</view>
        <button
          class="pop-btn"
          @click="help"
          @touchend="PTTSendClick('help', '帮助好友')"
        >
          帮助好友
        </button>
      </view>
    </pop>
    <pop :show="pop == 4">
      <view class="pop-content pop4">
        <view class="title">成功解救好友!</view>
        <view class="sub-title">和好友一起开启你的生存之路吧~</view>
        <button
          v-if="canIUseGetUserProfile"
          class="pop-btn"
          @click="start"
          @touchend="PTTSendClick('start2', '开启探索之旅')"
        >
          开启探索之旅
        </button>
        <button
          v-else
          class="pop-btn"
          open-type="getUserInfo"
          @getuserinfo="start"
          @touchend="PTTSendClick('start2', '开启探索之旅')"
        >
          开启探索之旅
        </button>
      </view>
    </pop>
    <pop :show="pop == 5">
      <view class="pop-content pop4">
        <view class="title">来晚了,好友{{ fromInfo.nickname }}已被救援!</view>
        <view class="sub-title"
          >快和{{ fromInfo.nickname }}—起收集更多生存资源吧</view
        >
        <button
          v-if="canIUseGetUserProfile"
          class="pop-btn"
          @click="start"
          @touchend="PTTSendClick('start3', '开启探索之旅')"
        >
          开启探索之旅
        </button>
        <button
          v-else
          class="btn1"
          open-type="getUserInfo"
          @getuserinfo="start"
          @touchend="PTTSendClick('start3', '开启探索之旅')"
        >
          开启探索之旅
        </button>
      </view>
    </pop>

    <pop :show="pop == 6" @close="closePop">
      <view class="pop-content pop5">
        <view class="tab">
          <button class="pop-btn">游戏规则</button>
          <button
            class="pop-btn gray"
            @click="changeTab(7)"
            @touchend="PTTSendClick('gift2', '我的礼包')"
          >
            我的礼包
          </button>
        </view>
        <view class="rules">
          <view>1、活动时间：2021年7月12日-2021年7月25日</view>
          <view>2、首次进入活动即可点亮一张地图，并获得对应礼包</view>
          <view>
            3、剩余地图可邀请好友帮助点亮，每位好友可帮助点亮1张地图
          </view>
          <view>4、每位用户最多可帮助3人点亮地图</view>
          <view>5、已获得的礼包可在“我的礼包”查看</view>
          <view>6、礼包以卡券形式发放，游戏不删档开启后即可兑换</view>
        </view>
      </view>
    </pop>

    <pop :show="pop == 7" @close="closePop">
      <view
        class="pop-content pop5"
        style="
          width: 636rpx;
          height: 850rpx;
          background-image: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/pop-bg2.png);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        "
      >
        <view class="tab">
          <button
            class="pop-btn gray"
            @click="changeTab(6)"
            @touchend="PTTSendClick('rulers2', '游戏规则')"
          >
            游戏规则
          </button>
          <button class="pop-btn">我的礼包</button>
        </view>
        <view class="gift">
          <view
            class="title"
            v-if="dotList.filter((item) => item == 0).length > 0"
            >已获得礼包</view
          >
          <view class="gift-list">
            <template v-for="(v, k) in dotList">
              <view class="item" v-if="v == 0" :key="k">
                <image
                  :src="
                    'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop' +
                    k +
                    '.png'
                  "
                  mode="widthFix"
                />
                <view class="prop-name">{{ propName[k] }}</view>
              </view>
            </template>
          </view>
          <view
            class="title"
            v-if="dotList.filter((item) => item == 0).length < 6"
            >即将获得礼包</view
          >
          <view class="gift-list">
            <template v-for="(v, k) in dotList">
              <view class="item" v-if="v != 0" :key="k">
                <image
                  :src="
                    'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop' +
                    k +
                    '.png'
                  "
                  mode="widthFix"
                />
                <view class="prop-name">{{ propName[k] }}</view>
              </view>
            </template>
          </view>
        </view>
      </view>
    </pop>

    <pop :show="pop == 8">
      <view class="pop-content pop4">
        <view class="title">你已经预约过游戏，不能帮助好友!</view>
        <view class="sub-title">快来开启你的生存之路吧~</view>
        <button
          v-if="canIUseGetUserProfile"
          class="pop-btn"
          @click="start"
          @touchend="PTTSendClick('start2', '开启探索之旅')"
        >
          开启探索之旅
        </button>
        <button
          v-else
          class="pop-btn"
          open-type="getUserInfo"
          @getuserinfo="start"
          @touchend="PTTSendClick('start2', '开启探索之旅')"
        >
          开启探索之旅
        </button>
      </view>
    </pop>
    <pop :show="pop == 9" @close="closePop">
      <view class="pop-content pop4">
        <view class="title">请先点亮{{ areaName[currArea] }}区域!</view>
        <view class="sub-title">快来开启你的生存之路吧~</view>
        <button
          class="pop-btn"
          @click="closePop"
          @touchend="PTTSendClick('confirm', '确定')"
        >
          确定
        </button>
      </view>
    </pop>
    <pop :show="pop == 10" @close="closePop">
      <view class="pop-content pop4">
        <view class="title">不能给自己助力哦～!</view>
        <view class="sub-title">快来开启你的生存之路吧~</view>
        <button
          class="pop-btn"
          @click="closePop"
          @touchend="PTTSendClick('confirm', '确定')"
        >
          确定
        </button>
      </view>
    </pop>
    <div class="share-mask" v-if="isShare" @click="isShare = false"></div>
  </view>
</template>

<script>
import config from '../../utils/config'
import { filterEmoji } from '../../utils/util'
import http from '../../utils/request'
import horizon from '../../components/horizon'
import pop from '../../components/pop.vue'
import { mapState, mapMutations } from 'vuex'
const Ulink = requirePlugin('ulink-mini-sdk')
export default {
  data() {
    return {
      plat: Ulink.CONSTS.isIOS ? 'ios' : 'android',
      canIUseGetUserProfile: true,
      scrollLeft: 0,
      mapWidth: 0,
      pop: 0,
      currArea: 0,
      areaName: ['渡鸦基地', '湖畔镇', '中部平原', '军事基地', '克勒矿山', '第五街区'],
      propName: ['抗体药剂×1', '幸存者的祝福', '木材×188', '银币×388', '石头×200', '胡萝卜头饰×1'],
      areaPosition: [],
      fromOpenid: null,
      fromInfo: {},
      currTab: 6,
      isShare: false,
    }
  },
  components: {
    horizon,
    pop,
  },
  computed: {
    ...mapState(['titleHeight']),
    ...mapState('init', ['initFinish', 'headImg', 'nickname', 'dotList', 'openid']),
    isOver() {
      return !this.dotList.reduce((prev, curr) => prev * 1 + curr * 1)
    },
    // 图片与请求都完成
    loadEnd() {
      return this.initFinish && this.mapWidth
    },
  },
  watch: {
    loadEnd() {
      this.nextArea()
      this.setArea()
    }
  },
  onShareAppMessage(e) {
    console.log(e)
    let titleArry = [
      "救救我！解锁这块地图就能获得更多物资了！",
      "帮帮我！有了物资就能活下去！",
      "一起点亮地图，获取生存物资吧~",
    ]
    // 如果有用户昵称，可以加入用户昵称
    // if (this.userInfo.nickName) {
    //     titleArry.push(`【${this.userInfo.nickName}】`)
    // }
    const titleIndex = Math.floor(Math.random() * (titleArry.length - 0) + 0)
    const title = titleArry[titleIndex]
    const share = {
      title,
      path: e.from == 'button' ? `/pages/map/index?fromOpenid=${this.openid}` : `/pages/map/index`,
      imageUrl: config.assertsUrl + 'miniapp-share.jpg',
    }
    console.log(share)
    return share
  },
  onLoad(query) {
    console.log(query)
    if (query.fromOpenid) {
      this.fromOpenid = query.fromOpenid
      this.setInitFinish(false)
    }
    // #ifdef MP-WEIXIN
    this.canIUseGetUserProfile = !!uni.getUserProfile
    // #endif
    // #ifdef H5
    window.addEventListener('resize', this.mapLoadEnd)
    // #endif
    this.checkInit()

  },
  onShow() {
    if (this.fromOpenid && this.fromOpenid == this.openid) {
      this.pop = 10
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapMutations('init', ['setInitFinish', 'setHeadImg', 'setNickname', 'setDotList', 'setOpenid']),
    //初始化
    init() {
      this.AppInit().then(res => {
        http('event/info', {
          fromOpenid: this.fromOpenid || '',
          plat: this.plat,
        }).then(res => {
          this.setHeadImg(res.data.userInfo.headImg)
          this.setNickname(res.data.userInfo.nickname)
          this.setOpenid(res.data.userInfo.openid)
          this.setDotList(res.data.light)
          if (this.fromOpenid) {
            if (this.fromOpenid == res.data.userInfo.openid) {
              uni.showModal({
                content: '不能给自己助力哦～',
                showCancel: false,
                success: (res) => {
                  if (res.confirm) {
                    this.go('/pages/index/index')
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else {
              this.fromInfo = res.data.fromInfo
              this.pop = 3
            }
          }
          this.nextArea()
          this.setArea()
          this.setInitFinish(true)
        })
      }).catch(err => {
        uni.showToast({
          title: '请在手Q内打开',
          icon: 'none'
        })
      })
    },
    nextArea() {
      const currArea = this.dotList.map(item => item * 1).lastIndexOf(0)
      this.currArea = currArea + 1
    },
    setArea() {
      if (this.scrollLeft = this.areaPosition[this.currArea]) {
        this.scrollLeft = this.areaPosition[this.currArea] + this.currArea // 更新滚动条位置
        return
      }
      this.scrollLeft = this.areaPosition[this.currArea]
    },
    checkInit() {
      //验证初始化
      if (!this.initFinish) {
        this.init()
        return false
      }
      return true
    },
    // 领奖
    receive(e) {
      if (!this.checkInit()) return
      if (this.currArea != e) {
        this.pop = 9
        return
      }
      if (this.dotList[this.currArea] == 1) {
        this.pop = 2
        return
      }
      http('event/mark', {
        type: 'light' + (e * 1 + 1),
        plat: this.plat,
      }).then(res => {
        if (this.currArea < 6) this.currArea = e
        const dotList = JSON.parse(JSON.stringify(this.dotList))
        dotList[this.currArea] = 0
        this.setDotList(dotList)
        this.pop = 1
      })
    },
    // 继续点亮
    goOn() {
      this.closePop()
      if (this.currArea < 6) {
        this.currArea++
        this.nextArea()
        this.setArea()
      }
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
      this.closePop()
    },
    // 帮助好友
    async help() {
      // #ifdef MP-WEIXIN
      const appointmentStatus = await Ulink.BookGame.get()
      if (appointmentStatus.data) {
        if (appointmentStatus.data.state == 0) {
          const { data } = await Ulink.BookGame.post({ noticeid: 90265695 })
          if (data && data.state) {
            this.eventHelp()
          } else {
            uni.showModal({
              content: '预约失败',
              showCancel: false,
            })
          }
        } else {
          this.pop = 8
        }
      } else {
        uni.showModal({
          content: '预约失败~',
          showCancel: false,
        })
      }
      // #endif
      // #ifdef H5
      this.eventHelp()
      // #endif
    },
    eventHelp() {
      http('event/help', {
        fromOpenid: this.fromOpenid,
        plat: this.plat,
      }, {
        errAlert: false
      }).then(res => {
        this.pop = 4
      }).catch(err => {
        if (err.iRet == 2034 || err.iRet == 2037) {
          this.pop = 5
          return
        }
        if (err.iRet == 2032) {
          this.pop = 8
          return
        }
        uni.showToast({
          title: err.sMsg,
          icon: 'none'
        })
      })
    },
    // 分享
    share() {
      // #ifdef H5
      let titleArry = [
        "救救我！解锁这块地图就能获得更多物资了！",
        "帮帮我！有了物资就能活下去！",
        "一起点亮地图，获取生存物资吧~",
      ]
      // 如果有用户昵称，可以加入用户昵称
      // if (this.userInfo.nickName) {
      //     titleArry.push(`【${this.userInfo.nickName}】`)
      // }
      const titleIndex = Math.floor(Math.random() * (titleArry.length - 0) + 0)
      const title = titleArry[titleIndex]
      ulink.share.init({
        ...config.share,
        link: `${config.share.link}#/pages/map/index?fromOpenid=${this.openid}`,
        title,
        QQtrigger: () => {
          this.isShare = false
        }
      })
      this.isShare = true
      // #endif
    },
    changeTab(e) {
      this.currTab = e
      this.pop = e
    },
    mapLoadEnd(e) {
      let obj = uni.createSelectorQuery().select('.map')
      obj.boundingClientRect((data) => { // data - 各种参数
        this.scrollLeft = data.width / 2 - uni.upx2px(750) / 2
        this.mapWidth = data.width
        this.areaPosition = [data.width / 2 - uni.upx2px(750) / 2, data.width, data.width, data.width, data.width / 3 - uni.upx2px(750) / 2, 0]
      }).exec()
    },
    closePop() {
      this.pop = 0
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.logo {
  width: 326rpx;
  height: 143rpx;
  position: absolute;
  top: 50rpx;
  left: 50%;
  margin-left: -163rpx;
  z-index: 120;
}
.tabs {
  position: absolute;
  z-index: 121;
  top: 30rpx;
  right: 0;
  .item {
    width: 53rpx;
    height: 142rpx;
    background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/tab.png)
      no-repeat center center/100% 100%;
    font-size: 28rpx;
    color: #49484d;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }
}
.scroll-view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.map {
  height: 100vh;
}
.location {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 11;
}
.cloud {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  animation: 5s cloudfade infinite;
}
.dot-list {
  overflow: hidden;
  height: 100%;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
}
.dot {
  position: absolute;
  z-index: 99;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .light {
    padding-bottom: 24%;
  }
  .prop {
    background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop-effect.png)
      no-repeat center bottom/68rpx auto;
    padding-bottom: 20rpx;
  }
  .prop-active {
    animation: 2s propmove infinite linear;
  }
}
.dot0 {
  top: 49%;
  left: 43%;
}
.dot1 {
  top: 18%;
  left: 71.5%;
}
.dot2 {
  top: 40%;
  left: 77%;
}
.dot3 {
  top: 73%;
  left: 80.5%;
}
.dot4 {
  top: 74%;
  left: 29.5%;
}
.dot5 {
  top: 39%;
  left: 9.5%;
}
.cloud-list {
  height: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
  .clouds {
    position: absolute;
    z-index: 101;
  }
  .c0 {
    width: 68%;
    top: 31%;
    left: 20%;
  }
  .c1 {
    width: 63%;
    top: -6%;
    left: 37%;
  }
  .c2 {
    width: 48%;
    top: 30%;
    left: 60%;
  }
  .c3 {
    width:57%;
    top: 40%;
    left: 48%;
  }
  .c4 {
    width: 60%;
    top: 54%;
    left: 4%;
  }
  .c5 {
    width: 58%;
    top: 0%;
    left: -10%;
  }
}
.cloudmove {
  animation-name: cloudmove;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

.pop-content {
  background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/pop-bg.png)
    no-repeat center center/100% 100%;
  width: 650rpx;
  height: 567rpx;
  margin: auto;
  padding: 80rpx 30rpx 50rpx 60rpx;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .title {
    color: #fce1b0;
  }

  .prop {
    width: 176rpx;
    height: 162rpx;
    margin: 20rpx auto 10rpx;
    background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/prop-bg.png)
      no-repeat center center/100% 100%;
    padding-top: 25rpx;
    box-sizing: border-box;
    image {
      width: 120rpx;
      height: 120rpx;
      margin: auto;
    }
  }
  .prop-name {
    font-size: 24rpx;
    line-height: 40rpx;
    color: #fefefe;
    text-align: center;
  }
  .pop-btn {
    width: 248rpx;
    height: 105rpx;
    font-size: 32rpx;
    color: #49484d;
    margin: 5rpx auto;
    background: url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/btn-bg.png)
      no-repeat center center/100% 100%;
  }
  &.pop1 {
    .title {
      font-size: 36rpx;
    }
    .sub-title {
      font-size: 28rpx;
      color: #e4eaf3;
    }
    .tips {
      font-size: 16rpx;
      color: #bcc0c7;
    }
  }
  &.pop2 {
    .tips {
      font-size: 24rpx;
      color: #fefefe;
    }
    .title {
      font-size: 28rpx;
      color: #fce1b0;
    }
    .sub-title {
      font-size: 20rpx;
      color: #aeb3bb;
    }
  }
  &.pop3 {
    .title {
      font-size: 36rpx;
    }
    .avatar {
      width: 154rpx;
      height: 154rpx;
      margin: 20rpx auto;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .nickname {
      font-size: 24rpx;
      color: #fefefe;
      margin-bottom: 15rpx;
    }
  }
  &.pop4 {
    .title {
      font-size: 48rpx;
      color: #fce1b0;
      margin-bottom: 10rpx;
    }
    .sub-title {
      font-size: 28rpx;
      color: #dfdfdf;
      margin-bottom: 25rpx;
    }
  }

  &.pop5 {
    .tab {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .rules {
      font-size: 24rpx;
      color: #fefefe;
      text-align: left;
      height: 380rpx;
      view {
        margin-bottom: 10rpx;
      }
    }
    .gift {
      height: 600rpx;
      .title {
        font-size: 30rpx;
        color: #fce1b0;
        margin-bottom: 15rpx;
      }
      .gift-list {
        width: 390rpx;
        margin-bottom: 10rpx;
        text-align: left;
        .item {
          width: 130rpx;
          display: inline-block;
          image {
            width: 120rpx;
          }
          .prop-name {
            font-size: 20rpx;
            color: #fefefe;
          }
        }
      }
    }
  }
}

.share-mask {
  position: fixed;
  z-index: 310;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55)
    url(https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/share_img.png)
    no-repeat right top/233rpx 189rpx;
}
.show {
  visibility: visible;
}
.hide {
  visibility: hidden;
}

@keyframes cloudfade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

@keyframes cloudmove {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100rpx);
    opacity: 0;
  }
}

@keyframes propmove {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10rpx);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
