<template>
  <div class='event-card' v-bind:class='cardInfo.type'>
    <div role='button' aria-label='close' class="event-card__close" />
    <div role='button' aria-label='next' class="event-card__next" />
    <div class='event-card__heading'>
      <i class='event-card__icon'><img v-bind:src='icons[cardInfo.icon]' v-bind:alt='cardInfo.icon'></i>
      <h2 class='event-card__title'>{{ cardInfo.title }}</h2>
      <span class='event-card__source'>{{ cardInfo.source }}</span>
      <span class='event-card__time'>{{ cardInfo.time }}</span>
    </div>
    <div class='event-card__data'>
      <span v-if='cardInfo.description' class='event-card__description'>{{ cardInfo.description }}</span>
      <Player v-if='cardInfo.data && cardInfo.data.volume' :data='cardInfo.data'/>
      <div class='climate' v-if='cardInfo.data && cardInfo.data.temperature'>
        <span class='climate__item'>
          Темература: <strong>{{ `${cardInfo.data.temperature} C` }}</strong>
        </span>
        <span class='climate__item'>
          Влажность: <strong>{{ `${cardInfo.data.humidity}%` }}</strong>
        </span>
      </div>
      <div v-if='cardInfo.data && cardInfo.data.type == "graph"' class='event-card__img-container'><img v-bind:src='graph' class='event-card__img' /></div>
      <div v-if='cardInfo.data && cardInfo.data.image' class='event-card__img-container'><img v-bind:src='robotCleaner' class='event-card__img' /></div>
      <div v-if='cardInfo.data && cardInfo.data.buttons' class='buttons'>
        <button v-for='(caption, index) in cardInfo.data.buttons' v-bind:key='index' class='buttons__button'><strong>{{ caption }}</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '@/assets/icons'
import graph from '@/assets/graph.svg'
import robotCleaner from '@/assets/robot-cleaner.jpg'
import Player from '@/components/Player'

export default {
  data () {
    return {
      icons,
      graph,
      robotCleaner
    }
  },
  props: ['cardInfo'],
  computed: {
    warn () {
      return this.cardInfo.type === 'warn'
    }
  },
  components: {
    Player
  }
}
</script>

<style lang='stylus' scoped>
.event-card
  display grid
  grid-template-columns 100%
  grid-template-rows min-content 1fr
  align-content space-between
  background-color #fafafa
  transition all .2s
  cursor pointer
  position relative
  &:hover
    background #f3f3f3
    box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.3)
  &.critical
    background-color #db5341
    color white
    &:hover
      background-color #b74738
  &__next, &__close
    position absolute
    height 14px
    width 14px
    background-size contain
    background-repeat no-repeat
    transition all .2s
    opacity 0
    .event-card:hover &
      opacity 1
  &__next
    bottom 15px
    right 15px
    background-image url('~@/assets/icons/next.svg')
  &__close
    top 15px
    right 15px
    background-image url('~@/assets/icons/cross.svg')
  &__heading
    width 100%
    box-sizing border-box
    padding 20px
    height auto
    display grid
    grid-template-columns 68px repeat(6, 1fr)
    grid-template-rows 68px min-content min-content
    justify-content space-between
    align-items center
    padding-bottom 0
  &__title
    grid-column span 6
    font-size 2.4rem
    padding 0
    margin 0
    @media (max-width 715px)
      font-size 14px
  &__source
    grid-column 1 / span 5
    padding-top 10px
    padding-bottom 10px
    font-size 16px
    @media (max-width 715px)
      font-size 12px
    .s &
      grid-column 1 / span 7
  &__time
    grid-column 6 / span 2
    text-align right
    padding-bottom 10px
    padding-top 10px
    font-size 16px
    @media (max-width 715px)
      font-size 12px
    .s &
      grid-column 1 / span 7
      text-align left
  &__data
    grid-row span 1
    display grid
    border-radius 20px
    grid-template-columns 100%
    grid-template-rows min-content min-content
    align-content space-between
    padding-left 20px
    padding-right 20px
    padding-bottom 10px
    color #333
    .critical &
      background-color #fafafa
  &__description
    grid-column 1 / span 7
    font-size 24px
    padding-top 10px
    padding-bottom 12px
    @media (max-width 715px)
      font-size 18px
    .critical &
      padding-top 20px
  &__img
    max-width 100%
    width 100%
    border-radius 20px
    &-container
      padding-top 20px
      @media (max-width 715px)
        font-size 12px

.climate
  font-size 18px
  &__item
    margin-right 10%

.buttons
  font-size 20px
  font-weight 600
  &__button
    height 54px
    width 132px
    border-radius 8px
    background-color #ffd93e
    border none
    cursor pointer
    &:last-child
      margin-left 1.8rem
      background-color #e5e5e5
    @media (max-width 355px)
      height 6.3rem
      width 12.6rem
</style>
