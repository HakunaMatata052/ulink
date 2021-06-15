<template>
  <view v-if="!isFinish">
    <image
      v-for="(v, k) in imgLoadList"
      :key="k"
      :src="v"
      :data-index="k"
      :data-src="v"
      @load="imgOnLoad"
      @error="imgOnLoadError"
      style="width: 0; height: 0; opacity: 0"
    />
  </view>
</template>

<script>
export default {
  props: {
    imgLoadList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isFinish:false,
      imgList: [],
      imgNum: 0,
    }
  },
  watch: {
    imgNum(val) {
      let progress = Math.ceil(val / this.imgLoadList.length * 100)
      this.$emit('onProgress', progress)
      if (val >= this.imgLoadList.length) {
        this.isFinish = true
        this.$emit('onLoad', this.imgList)
      }
    }
  },
  methods: {
    imgOnLoad(e) {
      this.imgList.push({
        ...e.detail,
        src: e.target.dataset.src,
        index:e.target.dataset.index
      })
      this.imgNum++
    },
    imgOnLoadError(e) {
      // console.log(e)
      this.imgNum++
    }
  }
}
</script>
