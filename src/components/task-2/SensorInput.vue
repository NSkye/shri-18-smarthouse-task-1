<template>
  <div class='container'>
    <div class='sensor-input'>
      <div class="sensor-input__window-wrapper">
        <div
          class="sensor-input__window"
          ref='cameraWindow'
          :style='{
            backgroundPosition: `${backgroundPosition}px`,
            transform: `scale(${zoom})`,
            filter: `brightness(${brightness}%)`
          }'
        />
      </div>
      <span>Zoom</span>
      <span>{{ zoom.toFixed(2) }}</span>
      <span>Brightness</span>
      <span>{{ `${brightness.toFixed(0)}%` }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      speed: 8,
      pEvents: [],
      backgroundPosition: 0,
      zoom: 1,
      brightness: 100,
      camera: null
    }
  },
  mounted () {
    this.camera = this.$refs.cameraWindow
    this.camera.addEventListener('touchmove', e => e.preventDefault())
    this.camera.addEventListener('pointerdown', this.registerPointerDown)
    this.camera.addEventListener('pointermove', this.registerPointerMove)
    this.camera.addEventListener('pointerup', this.registerPointerUp)
    this.camera.addEventListener('pointercancel', this.registerPointerCancel)
  },
  methods: {
    registerPointerDown (e) {
      e.preventDefault()
      this.camera.setPointerCapture(e.pointerId)
      this.pEvents.push(e)
    },
    registerPointerMove (e) {
      e.preventDefault()

      const prevVer = this.pEvents.find(p => p.pointerId == e.pointerId)
      if (prevVer) {
        this.pEvents.splice(this.pEvents.indexOf(prevVer), 1, e)
      }

      if (this.pEvents.length == 1) {
        this.moveCamera(e)
      } else if (this.pEvents.length == 2) {
        this.do()
      }
    },
    registerPointerUp (e) {
      this.camera.releasePointerCapture(e.pointerId)
      this.pEvents = this.pEvents.filter(p => p.pointerId != e.pointerId)
    },
    registerPointerCancel (e) {
      this.camera.releasePointerCapture(e.pointerId)
      this.pEvents = this.pEvents.filter(p => p.pointerId != e.pointerId)
    },
    moveCamera (e) {
      const prevEvents = [...e.getCoalescedEvents()]
      const prevX = prevEvents.length > 1 ? prevEvents[prevEvents.length - 2].clientX : e.clientX
      const currX = e.clientX
      const delta = (prevX - currX) * this.speed

      this.backgroundPosition = this.backgroundPosition - delta
    },
    do () {
      this.doPinch()
      this.doZoom()
    },
    doPinch () {
      const deadzone = 1

      const [ e1, e2 ] = this.pEvents
      const [ e1Start, e1End ] = e1.getCoalescedEvents()
      const [ e2Start, e2End ] = e2.getCoalescedEvents()

      const start = Math.atan2((e2Start.clientY - e1Start.clientY), (e2Start.clientX - e1Start.clientX))
      const end = Math.atan2((e2End.clientY - e1End.clientY), (e2End.clientX - e1End.clientX))
      const delta = (end - start) * 50

      const nextBrightness = delta + this.brightness

      if (Math.abs(delta) > deadzone) {
        this.brightness = (nextBrightness < 0) ? 0 : ((nextBrightness > 400) ? 400 : nextBrightness)
      }
    },
    doZoom () {
      const deadzone = 0.01

      const [ e1, e2 ] = this.pEvents
      const [ e1Start, e1End ] = e1.getCoalescedEvents()
      const [ e2Start, e2End ] = e2.getCoalescedEvents()

      const start = Math.pow(Math.pow(e2Start.clientX - e1Start.clientX, 2) + Math.pow(e2Start.clientY - e1Start.clientY, 2), 1 / 2)
      const end = Math.pow(Math.pow(e2End.clientX - e1End.clientX, 2) + Math.pow(e2End.clientY - e1End.clientY, 2), 1 / 2)
      const delta = (end - start) / 100

      const nextZoom = delta + this.zoom
      if (Math.abs(delta) > deadzone) {
        this.zoom = (nextZoom < 1) ? 1 : ((nextZoom > 5) ? 5 : nextZoom)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.container
  padding-top 90px
  font-size 20px
  width 100%
  display grid
  justify-content center
  align-items center

.sensor-input
  box-sizing border-box
  width 320px
  height 400px
  background #fafafa
  box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
  display grid
  grid-template-columns 1fr min-content
  grid-template-rows 320px 1fr 1fr
  align-items center
  padding 10px
  border-radius 8px
  column-gap 10px
  &__window-wrapper
    overflow hidden
    grid-column span 2
  &__window
    width 100%
    height 320px
    background-image url('~@/assets/panorama.jpg')
    background-size auto 320px
    touch-action manipulation
</style>
