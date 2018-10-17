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
            <div class='volume-level'>
              <div class='volume-level__bar' :style='{ width: `${motionLevel}%` }' />
            </div>
          </div>
          <div>
            <span>Освещение</span>
            <div class='volume-level'>
              <div class='volume-level__bar' :style='{ width: `${brightnessLevel}%` }' />
            </div>
          </div>
        </div>
        <video :style='{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }' ref='videoContainer' :muted='!showControls' src="" class="video__video" />
        <canvas class='canvas' ref='canvas' />
      </div>
    </div>
  </div>
</template>

<script>
import { animateTransform } from './animations'
import { processAudio } from './process-audio'
import { focusOn, focusOff } from './animation-runners'
const HLS = window.Hls

export default {
  data () {
    return {
      canvas: null,
      imageProcessorInterval: null,
      imgData: null,
      previousImage: null,
      focusActive: false,
      backwardFrames: null,
      animationInProgress: false,
      videoContainer: null,
      showControls: false,
      volumeLevel: 0,
      brightnessLevel: 0,
      motionLevel: 0,
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

    this.canvas = this.$refs.canvas
  },
  props: {
    source: String
  },
  methods: {
    animateTransform,
    processAudio,
    focusOn,
    focusOff,
    /**
     * Абсолютно позиционирует элемент с видео, чтобы потом можно было применить к нему соответствующие анимации
     */
    makeAbsolute () {
      this.style = {
        ...this.style,
        position: 'absolute',
        ...this.calculateAbsolutePosition()
      }
    },
    /**
     * Статично позиционирует элемент после того как он был возвращен в изначальное положение
     */
    makeStatic () {
      this.style = {
        ...this.style,
        position: 'static'
      }
    },
    /**
     * Рассчитывает значения, которые следует применить к элементу с видео при абсолютном позиционировании
     */
    calculateAbsolutePosition () {
      const wrapper = this.$refs.wrapperDiv
      return {
        width: `${wrapper.clientWidth}px`,
        height: `${wrapper.clientHeight}px`
      }
    },
    /**
     * Изменяет яркость
     */
    adjustBrightness (e) {
      this.brightness = e.srcElement.value
    },
    /**
     * Изменяет контраст
     */
    adjustContrast (e) {
      this.contrast = e.srcElement.value
    },
    processImage () {
      const ctx = this.canvas.getContext('2d')
      const w = this.videoContainer.videoWidth
      const h = this.videoContainer.videoHeight

      this.canvas.width = w
      this.canvas.height = h

      this.imageProcessorInterval = setInterval(() => {
        ctx.drawImage(this.videoContainer, 0, 0, w, h)

        const imgData = ctx.getImageData(0, 0, w, h).data
        this.registerFrameDiff(imgData)
        // существенно уменьшаем количество обрабатываемых пикселей, будет где-то 63, достаточно, чтоб понять уровень освещенности
        const step = Math.floor((imgData.length) / 250) * 4

        let avgBrightness = []
        for (let i = 0; i < imgData.length; i += step) {
          const r = imgData[i]
          const g = imgData[i + 1] || 0
          const b = imgData[i + 2] || 0
          avgBrightness.push((r + g + b) / 3)
        }
        const medianBrightness = (avgBrightness.sort((a, b) => a - b))[Math.floor(avgBrightness.length / 2)]
        const imgBrightnessPercentage = (medianBrightness / 255) * 100

        this.brightnessLevel = imgBrightnessPercentage
      }, 1000)
    },
    registerFrameDiff (imgData) {
      if (!this.imgData) {
        this.imgData = imgData
        return null
      }

      let motion = 0
      for (let i = 0; i < imgData.length; i += 4) {
        let ii = 0
        while (ii < 3) {
          if (this.imgData[i + ii] !== imgData[i + ii]) {
            motion++
            break
          }
          ii++
        }
      }

      motion = (motion / (imgData.length / 4)) * 100
      this.motionLevel = motion
      this.imgData = imgData
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

.canvas
  display none

.position-relative-wrapper
  position relative
  height 100%
  width 100%
  overflow hidden
  display flex
  justify-content center
  align-items center
</style>
