<template>
  <div class="horizon" id="horizon">
    <div class="horizon-box">
      <div class="horizon-pic">
        <i />
      </div>
      <span>为了更好的体验，请将手机/平板竖过来</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.horizon {
  width: 100%;
  height: 100%;
  background: #32373b;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1001;
  display: none;
}

.horizon-box {
  width: 100%;
  height: 300rpx;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -150rpx;
}

.horizon-pic {
  width: 150rpx;
  height: 230rpx;
  margin: 0 auto;
  text-align: center;
}

.horizon span {
  font-size: 22rpx;
  display: block;
  color: #ffd40a;
  text-align: center;
}

.horizon i {
  width: 150rpx;
  height: 227rpx;
  background: url(data:image/png;base64,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)
    0 0 no-repeat;
  background-size: 150rpx 227rpx;
  margin: 0 auto;
  animation: maskAni 1.5s ease infinite alternate;
  position: static;
  display: block;
}

@keyframes maskAni {
  0% {
    -webkit-transform: rotate(-90deg);
  }

  30% {
    -webkit-transform: rotate(-90deg);
  }

  70% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(0deg);
  }
}

@media screen and (orientation: landscape) {
  .horizon {
    display: block;
  }
}
</style>