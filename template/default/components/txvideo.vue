<template>
  <view class="container">
    <!--  #ifdef  H5 -->
    <view :id="vid" class="txvideo"></view>
    <!--  #endif -->
    <!--  #ifdef  MP-WEIXIN -->
    <txv-video
      :vid="vid"
      :playerid="vid"
      :autoplay="autoplay"
      width="100%"
      height="100%"
    ></txv-video>
    <!--  #endif -->
  </view>
</template>
<script>
/* 
在manifest.json 中添加
"mp-weixin": { 
    ...
    "plugins": {
    ...
        "tencentvideo": {
            "version": "1.4.7",
            "provider": "wxa75efa648b60994b"
        }
    }
},
在page.json中添加
"globalStyle": {
    ...
    "usingComponents": {
        ...
        // #ifdef  MP-WEIXIN 
        "txv-video": "plugin://tencentvideo/video"
        // #endif
    }
}
*/
export default {
  name: 'txvideo',
  props: {
    vid: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // #ifdef H5
    const script = document.createElement('script')
    script.src = '//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js'
    document.body.appendChild(script)
    script.onload = () => {
      new Txplayer({
        containerId: this.vid,
        vid: this.vid,
        width: '100%',
        height: '100%',
        autoplay: this.autoplay,mini:false
      })
    }
    // #endif
  }
}
</script>
<style lang="less" scoped>
.container{
  width: inherit;
  height: inherit;
}
.txvideo {
  width: 100%;
  height: 100%;
  font-family: serif;
}
</style>