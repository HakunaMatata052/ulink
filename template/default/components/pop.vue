<template>
  <view class="popup" v-if="show">
    <view class="mask" v-if="mask" @click="close"></view>
    <view class="popup-content">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      console.log(11)
      this.$emit('close',true)
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 301;
  .mask {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 300;
  }
  .popup-content {
    position: relative;
    z-index: 301;
    width: 100vw;
  }
}
</style>