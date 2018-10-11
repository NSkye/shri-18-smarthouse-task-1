<template>
  <div class='player'>
    <div class='player__albumcover'><img v-bind:src='data.albumcover' alt=''></div>
    <div class='player__track'>
      <span>{{ data.artist }}</span> - <span>{{ data.track.name }}</span>
    </div>
    <div class='seekbar'>
      <div class='seekbar__track' />
      <div class='seekbar__thumb' />
    </div>
    <span class='player__time'>{{ data.track.length }}</span>
    <span class='player__seekback'></span>
    <span class='player__seekforward'></span>
    <div class='volumebar'>
      <div class='volumebar__track' />
      <div class='volumebar__thumb' />
    </div>
    <div class='player__volume'>
      {{ `${data.volume}%` }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang='stylus' scoped>
.player
  display grid
  grid-template-columns 52px min-content 1fr 30px
  grid-template-rows min-content min-content 20px min-content
  column-gap 15px
  align-items center
  &__albumcover
    height 52px
    width 52px
    grid-row span 2
    & > img
      width 100%
      border-radius 8px
  &__track
    grid-column span 2
    font-size 18px
  &__seekback, &__seekforward
    height 52px
    width 52px
    grid-row 4
    cursor pointer
    background-image url('~@/assets/seek.svg')
    background-repeat no-repeat
    background-size contain
  &__seekforward
    margin-left 12px
    transform rotate(180deg)
  &__volume
    grid-row 4
  &__time, &__volume
    font-size 14px
    color #D8D8D8 30%

  .seekbar
    width 100%
    grid-column span 2
    position relative
    cursor pointer
    &__track
      height 1px
      width 100%
      background #979797
    &__thumb
      width 12px
      height 20px
      background #D8D8D8
      border-radius 4.5px
      position absolute
      top 50%
      left 20%
      transform translate(-50%, -50%)

  .volumebar
    grid-row 4
    width 100%
    position relative
    cursor pointer
    &__track
      width 100%
      height 4px
      background #D8D8D8 30%
      border-radius 2px
    &__thumb
      height 17px
      width 17px
      position absolute
      top 50%
      left 80%
      border-radius 50%
      background-color #605757
      transform translate(-50%, -50%)
</style>
