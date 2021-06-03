<template>
  <view class="popup" v-if="show">
    <view class="mask" v-if="mask"></view>
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
  data() {
    return {
    }
  },
  methods: {
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
  .mask {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
  .popup-content {
    position: relative;
    z-index: 1001;
    width: 100vw;
  }
}
</style>