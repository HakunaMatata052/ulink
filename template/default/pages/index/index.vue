<template>
</template>

<script>
import config from '../../utils/config'
import http from '../../utils/request'
import { mapState, mapMutations } from 'vuex'
const Ulink = requirePlugin('ulink-mini-sdk')
export default {
  data() {
    return {
    };
  },

  computed: {
  },
  components: {
  },
  props: {},
  watch: {
  },
  onShareAppMessage(e) {
    return this.share(e)
  },
  onLoad(query) {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.AppInit().then(res => {
        console.log('res',res)
      }).catch(err => {
        console.log(err)
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
      ulink.share.init(shareConfig)
      // #endif
      return shareConfig
    },
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>