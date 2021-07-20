<script>
import { mapMutations } from 'vuex'
export default {
  onLaunch: function (option) {
    console.log('App Launch', option)
    // if (!option.path) {
    //   if (option.query.fromOpenid) {
    //     this.go('/pages/map/index?fromOpenid=' + option.query.fromOpenid)
    //   } else {
    //     this.go('/pages/index/index')
    //   }
    // }
    // #ifdef MP-WEIXIN
    // 获取自定义顶部高度相关参数
    let capsuleObj = uni.getMenuButtonBoundingClientRect()
    if (capsuleObj) {
      uni.getSystemInfo({
        success: (res) => {
          let statusBarHeight = res.statusBarHeight//顶部状态栏高度
          this.setTitleHeight(statusBarHeight + capsuleObj.height + (capsuleObj.top - statusBarHeight) * 2)
        },
      })
    }
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    ...mapMutations(['setTitleHeight']),
  }
}
</script>

<style>
/*每个页面公共css */

@font-face {
  font-family: "font";
  src: url("https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/font.ttf");
}

.container {
  font-family: "font";
}
</style>
