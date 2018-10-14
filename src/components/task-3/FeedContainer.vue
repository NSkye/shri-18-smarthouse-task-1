<template>
  <div ref='wrapperDiv' class="video-wrapper">
    <div v-on:click='center' ref='videoDiv' class="video">
      <video ref='videoContainer' muted src="" class="video__video feed-1"></video>
    </div>
  </div>
</template>

<script>
const HLS = window.Hls

export default {
  mounted () {
    const video = this.$refs.videoContainer

    if (HLS.isSupported()) {
      const hls = new HLS()
      hls.loadSource(this.source)
      hls.attachMedia(video)
      hls.on(HLS.Events.MANIFEST_PARSED, () => video.play())
    }
  },
  props: {
    source: String
  },
  methods: {
    center () {
      const el = this.$refs.videoDiv
      const wrapper = this.$refs.wrapperDiv
      const left = wrapper.clientX
      const top = wrapper.clientY
      const width = wrapper.clientWidth
      const height = wrapper.clientHeight
      console.log({ width, height })
      el.classList.toggle('video--centered')
      el.style.left = left
      el.style.top = top
      el.style.width = `${width}px`
      el.style.height = `${height}px`
    }
  }
}
</script>

<style lang="stylus" scoped>
.video-wrapper
  background black
  border-radius 20px
  box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
.video
  background black
  cursor pointer
  display flex
  justify-content center
  align-items center
  border-radius 20px
  overflow hidden
  box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
  height 100%
  width 100%
  &--centered
    position absolute
  &__video
    height 100%
    width auto
</style>
