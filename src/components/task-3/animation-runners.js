/**
 * Выводит кликнутое видео в центр экрана
 */
export function focusOn () {
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
}

/**
 *  Возвращает видео в первоначальное положение
 */
export function focusOff () {
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
}
