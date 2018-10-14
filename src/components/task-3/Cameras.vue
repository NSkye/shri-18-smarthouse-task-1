<template>
  <div class='videos-container'>
    <FeedContainer v-for='(source, index) in sources' :key='index' :source='source' />
  </div>
</template>

<script>
import FeedContainer from './FeedContainer'

export default {
  data () {
    return {
      sources: [
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8',
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
      ]
    }
  },
  components: {
    FeedContainer
  }
}
</script>

<style lang="stylus" scoped>
.videos-container
  position relative
  display grid
  grid-template-columns repeat(auto-fill, 360px)
  grid-template-rows repeat(auto-fill, 360px)
  grid-auto-rows 360px
  grid-auto-flow row dense
  max-width 720px
  height auto
  width 100%
  margin 0 auto
  margin-top 120px
  margin-bottom 5.2vh
  justify-content center
  align-content center
</style>
