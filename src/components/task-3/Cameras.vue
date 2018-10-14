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
  grid-template-columns repeat(2, 480px)
  grid-template-rows repeat(2, 360px)
  justify-content center
  align-content center
  gap 20px
  margin-top 90px
</style>
