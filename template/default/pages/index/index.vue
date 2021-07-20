<template>
  <!--index.wxml-->
  <view class="container">
    <horizon />
    <!-- 首页 -->
    <view :class="'page ' + (!pageShow ? 'on' : '')">
      <!-- kv -->
      <view class="kv">
        <image
          class="logo"
          src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/logo.png"
          mode="widthFix"
        ></image>
        <!-- #ifdef H5 -->
        <view class="login-con" v-if="isLogin">
          欢迎您，<text>{{ userInfo.nickName }}</text>
        </view>
        <view class="login-con" v-else>
          您好，请<text class="login_btn" @click="checkInit"> 【登录】</text>
        </view>

        <!-- #endif -->
        <view class="kv-bottom">
          <view
            class="bottom_btn"
            @tap="page"
            @touchstart="PTTSendClick('exchange', '点击兑换')"
          ></view>
          <view class="price">
            <view v-for="(item, index) in price" :key="index" class="box">
              <image :src="item.img" mode="widthFix"></image>
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- part1 -->
      <view class="part1">
        <view class="p1-con">
          <!-- 棋子 -->
          <view
            class="p1-piece"
            :style="'top:' + pieceT + ';left:' + pieceL"
          ></view>
          <!-- 明信片 -->
          <view class="p1-piece1"></view>
          <view class="p1-piece2"></view>
          <view class="p1-piece3"></view>
          <view class="p1-piece4"></view>
          <!-- 奖励 -->
          <view class="p1-coin coin1" v-if="itemShow(2591748, 2577978)"></view>
          <view class="p1-coin coin2" v-if="itemShow(2591753, 2577979)"></view>
          <view class="p1-coin coin3" v-if="itemShow(2591754, 2577980)"></view>
          <view class="p1-coin coin4" v-if="itemShow(2591756, 2577981)"></view>
        </view>
        <view
          class="p1-btna"
          @tap="getRecordList(true)"
          @touchstart="PTTSendClick('recordList', '获奖记录')"
          >获奖记录</view
        >
        <button
          class="p1-btnb"
          open-type="share"
          data-type="1"
          @tap="share"
          @touchstart="PTTSendClick('hdsz', '获得骰子')"
        >
          获得骰子
        </button>
        <view class="p1-num">
          <view v-show="!diceShow" class="dice-bg"></view>
          <view
            v-show="diceShow"
            class="dice-img"
            :class="'p1Img' + p1Num"
            @tap="dice"
            @touchstart="PTTSendClick('dice', '掷骰子')"
          ></view>
          <view>
            剩余骰子：<text>{{ surplusNum }}</text>
          </view>
        </view>
        <view class="p1-right">
          <view class="p1-desc">邀请<text>1</text>位好友</view>
          <view class="p1-desc2">
            获得<text>1</text>骰子 >>
            <view class="p1-icon"></view>
          </view>
        </view>
      </view>
      <!-- part2 -->
      <view class="part2">
        <view class="p2-ti"></view>
        <view class="p2-con">
          <view class="p2-ul">
            <view v-for="(v, k) in postcard" :key="k" class="p2-li">
              <image
                :src="`https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/${k}.png`"
                mode="widthFix"
                class="p2-img"
              ></image>
              <view class="p2-num">拥有的数量：{{ v }}</view>
            </view>
            <view class="p2-desc">
              <view class="p2-h1">
                <text
                  class="p"
                  @tap="initDialog(1)"
                  @touchstart="PTTSendClick('rulers', '活动规则')"
                >
                  活动规则
                </text>
                <text class="span">活动时间：即日起至2021年8月19日当日0点</text>
              </view>
              <text class="p2-line"> 1、走格子流程： </text>
              <text class="p2-line">
                ①摇骰子走到补给格，则可获得对应奖励，道具奖励仅可获得一次，明信片可重复获取
              </text>
              <text class="p2-line">
                ②摇骰子走到伙伴格，可邀请好友助力开启宝箱，当好友摇骰点数与自己摇骰点数相加≥10即可成功开启宝箱，获得一次摇骰机会
              </text>
              <text class="p2-line">
                ③摇骰子走到枪战格，会遭遇不同势力阻拦，后退一格
              </text>
              <text class="p2-line">④ 摇骰子走到空白格，不触发特殊情况</text>
              <text class="p2-line">
                2、玩家每成功邀请一位未预约好友则可以获得一次摇骰机会，每个ID只能被邀请一次，重复邀请无效
              </text>
              <text class="p2-line">
                3、兑换奖励将会消耗对应数量的明信片（明信片种类不受限）且一种奖励仅可兑换一次，不可重复兑换
              </text>
              <text class="p2-line">
                4、在此活动期间所获得的奖励，将以预约礼包形式发送至卡包，游戏不删档阶段即可兑换，届时请注意查收。
              </text>
              <!-- #ifdef MP-WEIXIN -->
              <text class="p2-line">
                5、道具查看路径：微信游戏-福利中心-黎明觉醒-预约礼包
              </text>
              <!-- #endif -->
              <!-- #ifdef H5 -->
              <text class="p2-line">
                5、道具查看路径：游戏中心-福利-礼券仓库-黎明觉醒
              </text>
              <!-- #endif -->
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 内页 -->
    <view :class="'page ' + (pageShow ? 'on' : '')">
      <view class="page1">
        <view class="page-back" @tap="page"></view>
        <view class="page1-ti"></view>
        <view v-for="(item, index) in page_price" :key="index" class="page-li">
          <view class="page-price">
            <div :class="index != 3 ? 'page-price-bg' : 'page-price-bg2'">
              <image :src="item.img" mode="widthFix"></image>
            </div>
            <text>{{ item.name }}</text>
          </view>
          <view class="page-price">
            <div class="page-price-bg" v-if="index != 3">
              <image :src="item.img2" mode="widthFix"></image>
            </div>
            <text>{{ item.name2 }}</text>
          </view>
          <view class="page-desc">
            <text>{{ item.price }}</text>
            <view class="page-btn gray" v-if="gift[index] == 2">已兑换</view>
            <view
              class="page-btn"
              v-else-if="gift[index] == 1"
              @tap="exchangePop(index)"
              @touchstart="PTTSendClick('exchange', '兑换')"
              >兑换</view
            >
            <view class="page-btn" v-else @tap="initDialog(10)">兑换</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 预加载 -->
    <image
      v-for="(item, index) in p1Img"
      :key="index"
      :src="item"
      hidden
    ></image>

    <!-- 通用弹框内容 -->
    <view v-if="dialogShow">
      <!-- 弹窗-活动规则 -->
      <view v-if="dialogIndex == 1" class="dialog dialog1" data-index="1">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="1"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg1.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <text class="dia-ti1">活动时间：即日起至2021年8月19日当日0点</text>
            <view class="dia-desc1">
              <text class="p2-line"> 1、走格子流程： </text>
              <text class="p2-line">
                ①摇骰子走到补给格，则可获得对应奖励，道具奖励仅可获得一次，明信片可重复获取
              </text>
              <text class="p2-line">
                ②摇骰子走到伙伴格，可邀请好友助力开启宝箱，当好友摇骰点数与自己摇骰点数相加≥10即可成功开启宝箱，获得一次摇骰机会
              </text>
              <text class="p2-line">
                ③摇骰子走到枪战格，会遭遇不同势力阻拦，后退一格
              </text>
              <text class="p2-line">④ 摇骰子走到空白格，不触发特殊情况</text>
              <text class="p2-line">
                2、玩家每成功邀请一位未预约好友则可以获得一次摇骰机会，每个ID只能被邀请一次，重复邀请无效
              </text>
              <text class="p2-line">
                3、兑换奖励将会消耗对应数量的明信片（明信片种类不受限）且一种奖励仅可兑换一次，不可重复兑换
              </text>
              <text class="p2-line">
                4、在此活动期间所获得的奖励，将以预约礼包形式发送至卡包，游戏不删档阶段即可兑换，届时请注意查收。
              </text>
              <!-- #ifdef MP-WEIXIN -->
              <text class="p2-line">
                5、道具查看路径：微信游戏-福利中心-黎明觉醒-预约礼包
              </text>
              <!-- #endif -->
              <!-- #ifdef H5 -->
              <text class="p2-line">
                5、道具查看路径：游戏中心-福利-礼券仓库-黎明觉醒
              </text>
              <!-- #endif -->
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-骰子用完 -->
      <view v-if="dialogIndex == 2" class="dialog dialog2" data-index="2">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="2"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg2.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-ti2">
              <text>骰子已用完</text> <text>邀请好友获取更多骰子</text>
            </view>
            <view class="dia-btn2">
              <button
                class="dia-btna"
                open-type="share"
                data-type="1"
                @tap="share"
                @touchstart="PTTSendClick('share', '邀请好友')"
              >
                邀请好友
              </button>
              <view class="dia-btnb" @tap="dialoghide">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-获奖记录 -->
      <view v-if="dialogIndex == 3" class="dialog dialog3" data-index="3">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="3"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg3.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-ul">
              <view class="dia-li dia-ti">
                <view class="dia-li-l">奖励</view>
                <view class="dia-li-r">获得时间</view>
              </view>
              <view class="dia-li" v-for="(v, k) in currRecordList" :key="k">
                <view class="dia-li-l">{{ v.name }}</view>
                <view class="dia-li-r">{{ v.ctime }}</view>
              </view>
            </view>
            <view class="dia-btn3">
              <view
                class="dia-prev"
                @tap="getRecordList(false, 'prev')"
                @touchstart="PTTSendClick('prev', '上一页')"
              ></view>
              <view
                class="dia-next"
                @tap="getRecordList(false, 'next')"
                @touchstart="PTTSendClick('next', '下一页')"
              ></view>
            </view>
            <view class="dia-btna" @tap="dialoghide">确定</view>
          </view>
        </view>
      </view>
      <!-- 弹窗-获奖 -->
      <view v-if="dialogIndex == 4" class="dialog dialog4" data-index="4">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="4"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg4.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <view class="dia-pricebg">
                <image
                  :src="`https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iPackageId/${iPackageId}.png`"
                  mode="widthFix"
                  lazy-load="true"
                ></image>
              </view>
              <text>{{ packageList[iPackageId] }}</text>
              <view class="dia-btna" @tap="dialoghide">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-后退格 -->
      <view v-if="dialogIndex == 5" class="dialog dialog5" data-index="5">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="back"
              data-index="5"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg5.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <view class="dia-pricebg"></view>
              <text
                >遭遇{{
                  backText[
                    Math.floor(Math.random() * (backText.length - 0) + 0)
                  ]
                }}势力，后退1格</text
              >
              <view class="dia-btna" @tap="back">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-密码箱 -->
      <view v-if="dialogIndex == 6" class="dialog dialog6" data-index="6">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="6"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg6.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-ti6"> 遇到一个密码箱，里面装着什么呢? </view>
            <!-- <image src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/dia-img2.png" mode="widthFix" class="dia-img2"></image> -->
            <view class="dia-bg">
              <text class="dia-desc">打开密码箱 \n 可以获得更多骰子</text>
            </view>
            <view class="dia-desc2"
              >骰子点数累计<text>10</text>点即可打开 ( {{ passwordBox.num }}/10
              )</view
            >
            <view
              class="dia-btna"
              @click="shake"
              @touchstart="PTTSendClick('shake', '摇一个')"
              >摇一个</view
            >
          </view>
        </view>
      </view>
      <!-- 弹窗-确认兑换 -->
      <view v-if="dialogIndex == 7" class="dialog dialog7" data-index="7">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="7"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg5.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <view class="dia9-flex">
                <view v-if="currExchange == 3">
                  <!--长奖励框-->
                  <view class="dia-pricebg2">
                    <image
                      :src="page_price[currExchange].img"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text>{{ page_price[currExchange].name }}</text>
                </view>
                <template v-else>
                  <view>
                    <view class="dia-pricebg">
                      <image
                        :src="page_price[currExchange].img"
                        mode="widthFix"
                        lazy-load="true"
                      ></image>
                    </view>
                    <text>{{ page_price[currExchange].name }}</text>
                  </view>
                  <view v-if="page_price[currExchange].img2">
                    <view class="dia-pricebg">
                      <image
                        :src="page_price[currExchange].img2"
                        mode="widthFix"
                        lazy-load="true"
                      ></image>
                    </view>
                    <text>{{ page_price[currExchange].name2 }}</text>
                  </view>
                </template>
              </view>
              <view class="dia-desc3"
                >兑换此奖励需要消耗<text
                  >明信片×{{ currExchange + 1 }}</text
                ></view
              >
              <view class="dia-desc3">确认兑换吗?</view>
            </view>
            <view class="dia-btn2">
              <view
                class="dia-btna"
                @tap="exchange"
                @touchstart="PTTSendClick('exchange2', '确认兑换')"
                >确认兑换</view
              >
              <view
                class="dia-btnb"
                @tap="dialoghide"
                @touchstart="PTTSendClick('zxx', '再想想')"
                >再想想</view
              >
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-破解密码箱 -->
      <view v-if="dialogIndex == 8" class="dialog dialog8" data-index="8">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="8"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg7.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-ti6"> 还差一点点就能破解密码箱了! </view>
            <image
              :src="p1Img[boxDice.myNum]"
              mode="widthFix"
              class="dia-dice"
            ></image>
            <view class="dia-desc3">
              你的点数是<text> {{ boxDice.myNum }}</text> 点，还需要
              <text>{{ 10 - boxDice.num }}</text>
              点才能打开
            </view>
            <view class="dia-desc3">快去邀请好友助力吧~</view>
            <button
              class="dia-btna"
              open-type="share"
              data-type="2"
              @tap="share"
              @touchstart="PTTSendClick('share2', '邀请好友')"
            >
              邀请好友
            </button>
          </view>
        </view>
      </view>
      <!-- 弹窗-兑换成功 -->
      <view v-if="dialogIndex == 9" class="dialog dialog9" data-index="9">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="9"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg8.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <text>您已获得</text>

              <view class="dia9-flex">
                <view v-if="currExchange == 3">
                  <!--长奖励框-->
                  <view class="dia-pricebg2">
                    <image
                      :src="page_price[currExchange].img"
                      mode="widthFix"
                    ></image>
                  </view>
                  <text>{{ page_price[currExchange].name }}</text>
                </view>
                <template v-else>
                  <view>
                    <view class="dia-pricebg">
                      <image
                        :src="page_price[currExchange].img"
                        mode="widthFix"
                        lazy-load="true"
                      ></image>
                    </view>
                    <text>{{ page_price[currExchange].name }}</text>
                  </view>
                  <view v-if="page_price[currExchange].img2">
                    <view class="dia-pricebg">
                      <image
                        :src="page_price[currExchange].img2"
                        mode="widthFix"
                        lazy-load="true"
                      ></image>
                    </view>
                    <text>{{ page_price[currExchange].name2 }}</text>
                  </view>
                </template>
              </view>
              <view class="dia-btna" @tap="dialoghide">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-兑换失败 -->
      <view v-if="dialogIndex == 10" class="dialog dialog10" data-index="10">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="10"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg9.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <text>抱歉!您没有足够的明信片</text>
              <view class="dia-btna" @tap="dialoghide">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-助力好友 -->
      <view v-if="dialogIndex == 11" class="dialog dialog11" data-index="11">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="11"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg10.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <image
                src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/dia-img2.png"
                mode="widthFix"
                class="dia-img2"
              ></image>
              <view class="dia-desc3">
                骰子点数累计<text>10</text>
                点即可打开
              </view>
              <view class="dia-desc3">( {{ guestInfo.num }}/10 )</view>
              <view class="dia-btna" @tap="help">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-破解密码箱 -->
      <view v-if="dialogIndex == 12" class="dialog dialog12" data-index="12">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="12"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg11.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <image :src="p1Img[0]" mode="widthFix" class="dia-dice"></image>
            <view class="dia-desc3">
              你的点数是<text>{{ boxDice.myNum }}</text
              >点，已成功助力好友！
            </view>
            <view class="dia-desc3">（{{ boxDice.num }}/10）</view>
            <view
              class="dia-btna"
              @tap="toMy"
              @touchstart="PTTSendClick('wyyw', '我也要玩')"
            >
              我也要玩
            </view>
            <view class="dia-desc2" v-if="boxDice.num>=10">
              好友已打开密码箱，获得了<text>骰子×1</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-破解成功 -->
      <view v-if="dialogIndex == 13" class="dialog dialog13" data-index="13">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="13"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg12.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-price">
              <text>您已获得</text>
              <view class="dia-pricebg">
                <image
                  src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/p1-img6.png"
                  mode="widthFix"
                ></image>
              </view>
              <text>骰子×{{ diceNum }}</text>
              <view class="dia-btna" @tap="dialoghide">确定</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 弹窗-明信片 -->
      <view v-if="dialogIndex == 14" class="dialog dialog14" data-index="14">
        <view class="vtc" @tap.stop="stop">
          <view class="dialog-box">
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iconclose.png"
              class="iconclose"
              mode="widthFix"
              @tap="dialoghide"
              data-index="13"
              lazy-load="true"
            ></image>
            <image
              src="https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/popbg13.png"
              class="popupbg"
              mode="widthFix"
              lazy-load="true"
            ></image>
            <view class="dia-video">
              <txvideo vid="q3259use9tq" v-if="iPackageId == 2578400"></txvideo>
              <txvideo vid="a325995qydo" v-if="iPackageId == 2578402"></txvideo>
              <txvideo vid="n3259q2f61k" v-if="iPackageId == 2578404"></txvideo>
              <txvideo vid="r32592kq76v" v-if="iPackageId == 2578405"></txvideo>
            </view>
            <view class="dia-flex">
              <view class="dia-pricebg">
                <image
                  :src="`https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/iPackageId/${iPackageId}.png`"
                  mode="widthFix"
                ></image>
              </view>
              <view class="dia-name">
                <text class="p">明信片×1</text>
                <view class="dia-btna" @tap="dialoghide">确定</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <div class="share-mask" v-if="isShare" @click="isShare = false"></div>
  </view>
</template>

<script>
import config from '../../utils/config'
import http from '../../utils/request'
import { mapState, mapMutations } from 'vuex'
import txvideo from '../../components/txvideo.vue'
import horizon from '../../components/horizon.vue';
const Ulink = requirePlugin('ulink-mini-sdk')
export default {
  data() {
    return {
      //奖励
      price: [{
        img: config.assertsUrl + 'peice-img1-1.png',
        name: '生存基础礼包'
      }, {
        img: config.assertsUrl + 'peice-img1-2.png',
        name: '生存进阶礼包'
      }, {
        img: config.assertsUrl + 'peice-img1-3.png',
        name: '生存高阶礼包'
      }, {
        img: config.assertsUrl + 'peice-img2.png',
        name: '紫晶-ORIGIN-12'
      }],
      //拥有的明信片
      postcard: {
        2578400: 0,
        2578402: 0,
        2578404: 0,
        2578405: 0,
      },
      // 棋子位置
      position: [{
        top: "475rpx",
        left: '350rpx'
      }, {
        top: "436rpx",
        left: '295rpx'
      }, {
        top: "395rpx",
        left: '222rpx'
      }, {
        top: "350rpx",
        left: '160rpx'
      }, {
        top: "310rpx",
        left: '100rpx'
      }, {
        top: "260rpx",
        left: '30rpx'
      }, {
        top: "230rpx",
        left: '105rpx'
      }, {
        top: "190rpx",
        left: '155rpx'
      }, {
        top: "150rpx",
        left: '95rpx'
      }, {
        top: "110rpx",
        left: '165rpx'
      }, {
        top: "70rpx",
        left: '235rpx'
      }, {
        top: "35rpx",
        left: '300rpx'
      }, {
        top: "65rpx",
        left: '360rpx'
      }, {
        top: "115rpx",
        left: '430rpx'
      }, {
        top: "155rpx",
        left: '490rpx'
      }, {
        top: "195rpx",
        left: '560rpx'
      }, {
        top: "225rpx",
        left: '630rpx'
      }, {
        top: "275rpx",
        left: '570rpx'
      }, {
        top: "315rpx",
        left: '495rpx'
      }, {
        top: "355rpx",
        left: '565rpx'
      }, {
        top: "395rpx",
        left: '505rpx'
      }, {
        top: "435rpx",
        left: '435rpx'
      }],
      // 骰子
      p1Num: 6,
      p1Img: [config.assertsUrl + 'p1-img1.png', config.assertsUrl + 'p1-img2.png', config.assertsUrl + 'p1-img3.png', config.assertsUrl + 'p1-img4.png', config.assertsUrl + 'p1-img5.png', config.assertsUrl + 'p1-img6.png'],
      //骰子初始值
      diceIndex: 0,
      //剩余骰子
      surplusNum: 0,
      //骰子初始位置
      pieceT: "475rpx",
      pieceL: '350rpx',
      //棋子状态
      pieceIs: false,
      //骰子旋转
      diceShow: true,
      // 手Q的原生组件，会挡住dialog,
      //内页奖励
      page_price: [{
        img: config.assertsUrl + 'page-img1.png',
        name: '简易绷带×15',
        img2: config.assertsUrl + 'page-img2.png',
        name2: '变异血液×15',
        price: '消耗明信片×1'
      }, {
        img: config.assertsUrl + 'page-img3.png',
        name: '抗体药剂×10',
        img2: config.assertsUrl + 'page-img4.png',
        name2: '简易强化涂层×5',
        price: '消耗明信片×2'
      }, {
        img: config.assertsUrl + 'page-img5.png',
        name: '加固板补给箱×3',
        img2: config.assertsUrl + 'page-img6.png',
        name2: '1级配件图纸×3',
        price: '消耗明信片×3'
      }, {
        img: config.assertsUrl + 'page-img7.png',
        name: '紫晶-ORIGIN-12×1',
        price: '消耗明信片×4'
      }],
      pageShow: false,
      //弹框类型
      dialogIndex: 1,
      //弹框显示
      dialogShow: false,
      backText: ['小丑帮', '夜枭飞车党', '沙鹰雇佣军', '掠食者'],
      iPackageId: null,
      backType: null,
      passwordBox: null, //密码箱
      boxDice: {
        num:0,
        myNum:0
      }, //密码箱骰子
      diceNum: 0,// 解锁的骰子数
      MathNum: 0,// 棋子剩余步数
      recordList: [], //获奖记录
      currRecordList: [], // 当前显示的获奖记录
      pageNum: 1,// 页码
      gift: [1, 1, 1, 1],// 奖励状态
      openid: null,// 登录人openid
      guestInfo: null,// 客态信息
      currExchange: null,// 当前兑换的奖励
      received: [], // 地图上已领取的奖励
      query: {},// url参数
      isShare: false,
      packageList: {
        2591748: '银币×888',
        2591753: '木材×888',
        2591754: '石头×500',
        2591756: '子弹壳×500',

        2577978: '银币×888',
        2577979: '木材×888',
        2577980: '石头×500',
        2577981: '子弹壳×500',
      },
      putDiceInfo: null, // 掷骰子信息
      prevIndex: null, // 骰子走到之前的index
      isReserved: false, // 是否本次预约
    };
  },

  computed: {
    ...mapState(['userInfo', 'isLogin']),
    ...mapState('init', ['initFinish']),
  },
  components: {
    horizon,
    txvideo,
  },
  props: {},
  watch: {
    postcard: {
      deep: true,
      handler: function (val) {
        let sum = Object.values(val).reduce((total, num) => total + num, 0)
        this.gift = this.gift.map((item, index) => {
          if (item === 2) return item
          if (index < sum) return 1
          return 0
        })
      }
    }
  },
  onShareAppMessage(e) {
    return this.share(e)
  },
  onLoad(query) {
    this.query = query
    this.AppInit().then(async res => {
      // #ifdef MP-WEIXIN
      const res2 = await Ulink.BookGame.get()
      if (res2.data.state != 1) {
        this.isReserved = await Ulink.BookGame.post({ noticeid: 90267464 })
      }
      // #endif
      this.init()
    })
  },
  onShow() {
    console.log(this.prevIndex, this.diceIndex)
    if (this.prevIndex !== null && this.prevIndex !== this.diceIndex) {
      this.diceIndex = this.prevIndex
      this.diceAction()
    }
    // this.MathNum && this.diceAction()
  },
  methods: {
    ...mapMutations(['setLoginState', 'setUserInfo', 'setThrottleInit']),
    ...mapMutations('init', ['setInitFinish']),
    // 初始化
    init() {
      this.AppInit().then(res => {
        http('Index/index', {
          // #ifdef MP-WEIXIN
          fromOpenid: this.query.fromOpenid && this.isReserved ? this.query.fromOpenid : '',
          // #endif
          // #ifdef H5
          fromOpenid: this.query.fromOpenid || '',
          // #endif
          key: this.query.key || '',
          plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other'
        }).then(res => {
          this.surplusNum = res.data.surplusNum
          this.diceIndex = res.data.diceIndex
          this.pieceT = this.position[res.data.diceIndex].top
          this.pieceL = this.position[res.data.diceIndex].left
          this.postcard = res.data.postcard
          this.openid = res.data.openid
          this.guestInfo = res.data.guestInfo
          this.gift = res.data.gift
          this.received = res.data.received
          this.diceNum = res.data.diceNum

          this.setInitFinish(true)
          if (res.data.guestInfo.key) {
            this.initDialog(11)
            return
          }
          if (res.data.diceNum) {
            this.initDialog(13)
          }
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
    // 我也要玩
    toMy() {
      if (this.diceNum) {
        this.initDialog(13)
      } else {
        this.dialoghide()
      }
    },
    // 客态助力
    help() {
      http('Index/helpPartner', {
        key: this.guestInfo.key,
        // openid: this.guestInfo.openid,
        plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other',
      }).then(res => {
        this.boxDice = res.data
        this.initDialog(12)
      }).catch(err => {
        console.log(err.iRet)
        if (err.iRet == 10305 || err.iRet == 10303) {
          this.dialoghide()
        }
      })
    },
    // 兑换弹窗
    exchangePop(index) {
      if (!this.checkInit()) return
      this.currExchange = index
      this.initDialog(7)
    },
    // 确认兑换
    exchange() {
      if (!this.checkInit()) return
      http('Index/convertGift', {
        key: this.currExchange,
        plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other',
      }).then(res => {
        this.gift[this.currExchange] = 2
        this.postcard = res.data
        this.initDialog(9)
      })
    },
    // 地图上奖励显示开关
    itemShow(wxiPackageId, qqiPackageId) {
      const r = (this.received.indexOf(wxiPackageId * 1) == -1 && this.received.indexOf(qqiPackageId * 1) == -1) ? true : false
      // console.log(r)
      return r
    },
    //骰子
    dice() {
      if (!this.checkInit()) return
      //棋子是否在走
      if (this.pieceIs) {
        return
      }
      // 没有骰子
      if (this.surplusNum == 0) {
        this.initDialog(2)
        return
      }
      //骰子播放动画
      this.setData({
        diceShow: false
      })
      http('Index/putDice', {
        // snum:this.query.snum,
        plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other'
      }, { loading: false }).then(async res => {
        // res.data.type 0:无反应 1:明信片 2:实物奖励 3:伙伴格  4:退一格
        this.surplusNum--
        //棋子移动
        await this.sleep(1000)
        this.setData({
          //骰子播放完动画
          diceShow: true
        })
        this.p1Num = res.data.num
        this.putDiceInfo = res.data
        this.prevIndex = this.diceIndex
        this.diceAction()
      }).catch(err => {
        this.setData({
          //骰子播放完动画
          diceShow: true
        })
      })
    },
    async sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      })
    },
    diceAction() {
      this.diceMove(this.putDiceInfo.num, async () => {
        this.iPackageId = this.putDiceInfo.iPackageId
        this.passwordBox = this.putDiceInfo.passwordBox
        this.backType = this.putDiceInfo.backType
        this.endPop(this.putDiceInfo.type)
      })
    },
    //棋子移动
    async diceMove(MathNum, callback) {
      this.MathNum = MathNum
      if (this.MathNum > 0) {
        this.MathNum--
        this.diceIndex++
        if (this.diceIndex >= 22) {
          this.diceIndex = 0
        }
      } else {
        this.MathNum++
        this.diceIndex--
        if (this.diceIndex < 0) {
          this.diceIndex = 21
        }
      }
      this.pieceIs = true
      this.pieceT = this.position[this.diceIndex].top
      this.pieceL = this.position[this.diceIndex].left
      await this.sleep(500)
      if (this.MathNum == 0) {
        this.pieceIs = false
        callback && callback()
      } else {
        this.diceMove(this.MathNum, callback)
      }
    },
    // 后退一格
    back(res) {
      this.dialoghide()
      this.pieceIs = true
      this.sleep(500)
      this.diceMove(-1, () => {
        this.sleep(500)
        this.endPop(this.backType)
        this.pieceIs = false
        this.prevIndex = this.diceIndex
      })
    },
    // 棋子停留后弹出那个弹窗
    endPop(type) {
      switch (type) {
        case 1:
          // 明信片
          this.postcard[this.iPackageId]++
          this.prevIndex = this.diceIndex
          this.initDialog(14)
          break
        case 2:
          // 实物奖励
          this.received.push(this.iPackageId)
          this.prevIndex = this.diceIndex
          this.initDialog(4)
          break
        case 3:
          // 伙伴格
          if (this.passwordBox.num == 0) {
            this.initDialog(6)
          } else {
            this.boxDice = this.passwordBox
            this.initDialog(8)
          }
          this.prevIndex = this.diceIndex
          break
        case 4:
          // 退后一格
          this.initDialog(5)
          break
        default:
          this.prevIndex = this.diceIndex
          break
      }
    },
    // 密码箱骰子摇一摇
    async shake() {
      if (!this.checkInit()) return
      if (this.passwordBox.num == 0) {
        // 没有开启过助力
        const res = await http('Index/helpPartner', {
          key: this.passwordBox.key,
          plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other',
        })
        this.boxDice = res.data
      } else {
        this.boxDice = this.passwordBox
      }
      this.initDialog(8)
    },
    async getRecordList(isClear, type) {
      if (!this.checkInit()) return
      if (isClear) {
        this.pageNum = 1
        this.recordList = []
        this.currRecordList = []
      }
      this.initDialog(3)
      if (type == 'prev') {
        console.log(this.pageNum)
        if (this.pageNum <= 1) {
          this.pageNum = 1
          return
        }
        this.pageNum--
      } else if (type == 'next') {
        if (this.currRecordList.length < 5) return
        this.pageNum++
      }
      console.log(this.recordList[this.pageNum - 1])
      if (this.recordList[this.pageNum - 1]) {
        if (!this.recordList[this.pageNum - 1].length) {
          this.pageNum--
          return
        }
        if (this.currRecordList.length < 5) return
        this.currRecordList = this.recordList[this.pageNum - 1]
      } else {
        console.log(777)
        const res = await http('index/giftLog', {
          page: this.pageNum,
          plat: Ulink.CONSTS.isIOS ? 'ios' : Ulink.CONSTS.isAndroid ? 'android' : 'other'
        })
        this.recordList[this.pageNum - 1] = res.data.list
        if (res.data.list.length == 0) {
          this.pageNum--
          return
        }
        this.currRecordList = res.data.list
      }

    },
    share(e) {
      let path = `/pages/index/index`
      let title = config.share.title
      let desc = config.share.desc
      // 分享客态
      if (e.target && e.target.dataset.type == 1) {
        if (this.openid) {
          path = `/pages/index/index?fromOpenid=${this.openid}`
          title = "朋友，与我一同收集明信片赢紫晶-ORIGIN-12限定皮肤"
          desc = "收集明信片换紫晶-ORIGIN-12、生存高阶礼包等海量游戏福利"
        }
      }
      // 分享密码箱
      if (e.target && e.target.dataset.type == 2) {
        if (this.openid) {
          path = `/pages/index/index?fromOpenid=${this.openid}&key=${this.passwordBox.key}`
          title = `朋友再帮我摇个${10 - this.boxDice.num}点，就能赢紫晶-ORIGIN-12限定枪皮`
          desc = "收集明信片换紫晶-ORIGIN-12、生存高阶礼包等海量游戏福利"
        }
      }
      const shareConfig = {
        ...config.share,
        title,
        desc,
        path,
        imageUrl: config.assertsUrl + 'miniapp-share.jpg',
        link: `${config.share.link || ''}#${path}`,
        QQtrigger: () => {
          ulink.share.init(config.share)
          this.isShare = false
        }
      }
      // #ifdef H5
      this.dialoghide()
      ulink.share.init(shareConfig)
      this.isShare = true
      // #endif
      return shareConfig
    },
    // 注销登录
    logout() {
      ulink.LoginManager.logout()
      this.setInitFinish(false)
      this.setThrottleInit(true)
      this.setLoginState(false)
      this.setUserInfo(null)
    },
    //打开弹窗
    opendialog(e) {
      var index = e.currentTarget.dataset['index'];
      this.initDialog(index);
    },

    stop() {// 防止事件往上传
    },

    // 打开弹窗
    initDialog(index, data) {
      this.setData({
        dialogShow: true,
        dialogIndex: index
      });
    },

    // 关闭弹框
    dialoghide() {
      this.setData({
        dialogShow: false
      })
    },

    //弹窗回调函数
    OnViewText(e) {
      console.log('back', e);
    },

    //打开内页
    page() {
      this.setData({
        pageShow: !this.pageShow
      })
    }

  }
};
</script>
<style lang="less" scoped>
@import "./index.css";
</style>