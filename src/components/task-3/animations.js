/**
 * Выполняет анимированный переход посредством Web Animations API
 * @param {function} cb функция-коллбэк на прекращение анимации
 * @param {number} time длительность анимации в мс
 * @param {frames} frames фреймы анимации, если есть
 * @returns {array}
 */
export function animateTransform (cb, time, frames) {
  const { scale, translate } = calculateTransform.apply(this)
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
}

/**
 * Вычисляет значение свойства transform для разворачивания видео
 */
function calculateTransform () {
  const wc = window.innerHeight < this.$refs.wrapperDiv.parentElement.scrollHeight ? getWindowCenter() : getElementCenter(this.$refs.wrapperDiv.parentElement)
  const ec = getElementCenter(this.$refs.videoDiv)

  const translate = `translate(${wc.x - ec.x}px, ${wc.y - ec.y}px)`
  const scaleLevel = (this.$refs.wrapperDiv.parentElement.clientWidth) / this.$refs.videoDiv.clientWidth
  const scale = `scale(${scaleLevel})`
  this.scaleLevel = scaleLevel
  return {
    scale,
    translate
  }
}

/**
 * Получает координаты центра viewport
 */
function getWindowCenter () {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
}

/**
 * Получает координаты центра заданного элемента
 */
function getElementCenter (el) {
  const rect = el.getBoundingClientRect()
  const top = rect.top
  const left = rect.left

  const y = top + el.clientHeight / 2
  const x = left + el.clientWidth / 2

  return { x, y }
}
