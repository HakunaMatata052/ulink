<template>
  <view class="container">
    <pop :show="popShow" class="pop">
      <view class="close" @click="closePop"></view>
      <view class="pop-content">
        <!-- do something -->
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
      popShow: true
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
</style>
