/**
 * Производит визуализацию аудиоконтекста
 */
export function processAudio () {
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
}
