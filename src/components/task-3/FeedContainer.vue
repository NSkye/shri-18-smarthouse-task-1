<template>
  <div ref='wrapperDiv' class="video-wrapper">
    <div v-on:click='focusOn' :style='style' ref='videoDiv' class="video">
      <div class="position-relative-wrapper">
        <div v-show='showControls' class="video__controls">
          <div class='video__all-videos' role='button' v-on:click='focusOff'>Все видео</div>
          <div class="video__filters">
            <span>Ярк.</span><input v-on:change='adjustBrightness' :style='{ transform: `scale(${1 / scaleLevel})`}' min='0' value='100' max='300' step='any' type="range" >
            <span>Контр.</span><input v-on:change='adjustContrast' :style='{ transform: `scale(${1 / scaleLevel})`}' min='0' value='100' max='300' step='any' type="range">
          </div>
        </div>
        <div v-show='showControls' class='video__info'>
          <div>
            <span>Уровень шума</span>
            <div class='volume-level'>
              <div class='volume-level__bar' :style='{ width: `${volumeLevel}%` }' />
            </div>
          </div>
          <div>
            <span>Движение</span>
            <span></span>
          </div>
          <div>
            <span>Освещение</span>
            <span></span>
          </div>
        </div>
        <video :style='{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }' ref='videoContainer' :muted='!showControls' src="" class="video__video" />
      </div>
    </div>
  </div>
</template>

<script>
const HLS = window.Hls

export default {
  data () {
    return {
      focusActive: false,
      backwardFrames: null,
      animationInProgress: false,
      videoContainer: null,
      showControls: false,
      volumeLevel: 0,
      scaleLevel: 1,
      brightness: 100,
      contrast: 100,
      style: {
        position: 'static',
        left: 'auto',
        top: 'auto',
        width: '100%',
        height: '100%',
        transform: 'none',
        zIndex: 0
      }
    }
  },
  mounted () {
    this.videoContainer = this.$refs.videoContainer

    if (HLS.isSupported()) {
      const hls = new HLS()
      hls.loadSource(this.source)
      hls.attachMedia(this.videoContainer)
      hls.on(HLS.Events.MANIFEST_PARSED, () => this.videoContainer.play())
    }
  },
  props: {
    source: String
  },
  methods: {
    focusOn () {
      if (!this.animationInProgress && !this.focusActive) {
        this.makeAbsolute()
        this.style.zIndex = 4
        this.videoContainer.style.zIndex = -1
        this.focusActive = true
        this.animationInProgress = true
        this.backwardFrames = this.animateTransform(() => {
          this.animationInProgress = false
          this.showControls = true
          this.processAudio()
        }, 200)
      }
    },
    focusOff () {
      if (!this.animationInProgress && this.focusActive) {
        this.animationInProgress = true
        this.showControls = false
        this.animateTransform(() => {
          this.focusActive = false
          this.style.zIndex = 0
          this.makeStatic()
          this.animationInProgress = false
          this.videoContainer.style.zIndex = 'auto'
        }, 200, this.backwardFrames)
      }
    },
    animateTransform (cb, time, frames) {
      const { scale, translate } = this.calculateTransform()
      frames = frames || [
        { transform: 'translate(0) scale(1)' },
        { transform: `${translate} ${scale}` }
      ]
      const player = this.$refs.videoDiv.animate(frames, {
        duration: time,
        iterations: 1,
        fill: 'forwards'
      })
      setTimeout(cb, time)
      player.play()
      return frames.reverse()
    },
    calculateTransform () {
      const wc = window.innerHeight < this.$refs.wrapperDiv.parentElement.scrollHeight ? this.getWindowCenter() : this.getElementCenter(this.$refs.wrapperDiv.parentElement)
      const ec = this.getElementCenter(this.$refs.videoDiv)

      const translate = `translate(${wc.x - ec.x}px, ${wc.y - ec.y}px)`
      const scaleLevel = (this.$refs.wrapperDiv.parentElement.clientWidth) / this.$refs.videoDiv.clientWidth
      const scale = `scale(${scaleLevel})`
      this.scaleLevel = scaleLevel
      return {
        scale,
        translate
      }
    },
    makeAbsolute () {
      this.style = {
        ...this.style,
        position: 'absolute',
        ...this.calculateAbsolutePosition()
      }
    },
    makeStatic () {
      this.style = {
        ...this.style,
        position: 'static'
      }
    },
    calculateAbsolutePosition () {
      const wrapper = this.$refs.wrapperDiv
      return {
        width: `${wrapper.clientWidth}px`,
        height: `${wrapper.clientHeight}px`
      }
    },
    getWindowCenter () {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
    },
    getElementCenter (el) {
      const rect = el.getBoundingClientRect()
      const top = rect.top
      const left = rect.left

      const y = top + el.clientHeight / 2
      const x = left + el.clientWidth / 2

      return { x, y }
    },
    processAudio () {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const audioAnalyser = audioCtx.createScriptProcessor(1024, 1, 1)
      audioAnalyser.connect(audioCtx.destination)
      const audioSource = audioCtx.createMediaElementSource(this.videoContainer)
      audioSource.connect(audioAnalyser)
      audioAnalyser.addEventListener('audioprocess', e => {
        const out = e.outputBuffer.getChannelData(0)
        const int = e.inputBuffer.getChannelData(0)

        let maxVolume = 0
        for (let i = 0; i < int.length; i++) {
          out[i] = int[i]
          maxVolume = Math.max(int[i], maxVolume)
          this.volumeLevel = (maxVolume * 100).toFixed(2)
        }
      })
    },
    adjustBrightness (e) {
      this.brightness = e.srcElement.value
    },
    adjustContrast (e) {
      this.contrast = e.srcElement.value
    }
  }
}
</script>

<style lang="stylus" scoped>
.video-wrapper
  box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
.video
  background black
  cursor pointer
  display flex
  justify-content center
  align-items center
  overflow hidden
  box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
  height 100%
  width 100%
  &__video
    height 100%
    width auto
  &__controls
    position absolute
    display flex
    justify-content space-around
    align-items center
    width 100%
    height 40px
    bottom 0
    left 0
    color white
    font-weight bold
    font-size 70%
    background linear-gradient(to bottom, rgba(0,0,0,0.01) 0%,rgba(0,0,0,0.8) 100%)
    padding-bottom 5px
  &__filters
    display grid
    height 100%
    width auto
    grid-template-rows repeat(2, min-content)
    grid-template-columns repeat(2, min-content)
    column-gap 1em
    text-align right
    align-items center
    font-weight normal
    font-size 70%
  &__info
    position absolute
    box-sizing border-box
    display flex
    justify-content space-around
    align-items top
    padding-top 10px
    width 100%
    height 40px
    top 0
    left 0
    color white
    font-size 50%
    background linear-gradient(to top, rgba(0,0,0,0.01) 0%,rgba(0,0,0,0.8) 100%);
    opacity .6
  &__all-videos
    opacity .6
    transition opacity .2s
    &:hover
      opacity 1
.volume-level
  height 1em
  width 100%
  &__bar
    background white
    min-width 1px
    height 100%

.position-relative-wrapper
  position relative
  height 100%
  width 100%
  overflow hidden
  display flex
  justify-content center
  align-items center
</style>
