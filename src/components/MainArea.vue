<template>
  <main class='main-area'>
    <h1 class='main-area__heading'>Лента событий</h1>
    <ul class='events-list'>
      <EventCard
        role='li'
        class='events-list__item'
        v-for='(event, index) in events'
        v-bind:key='index'
        v-bind:class='event.size'
        :cardInfo='event'
      />
    </ul>
  </main>
</template>

<script>
import data from '@/events.json'
import EventCard from '@/components/EventCard'

const events = data.events

export default {
  data () {
    return {
      events
    }
  },
  components: {
    EventCard
  }
}
</script>

<style lang='stylus' scoped>
.main-area
  padding-top 90px
  display grid
  grid-template-columns 1fr
  grid-template-rows min-content 1fr
  @media (max-width 640px)
    padding-top 70px
  &__heading
    box-sizing border-box
    padding 0
    margin 0
    font-size 36px
    line-height 42px
    padding-left 170px
    padding-top 34px
    padding-bottom 32px
    @media (max-width 1000px)
      padding-left 20px
    @media (max-width 640px)
      font-size 24px
      line-height 28px
      padding-top 0

.events-list
  list-style none
  margin 0
  padding 0
  display grid
  gap 20px
  grid-template-columns repeat(auto-fit, minmax(153px, 1fr))
  grid-auto-rows min-content
  padding-left 171px
  padding-right 171px
  padding-bottom 10px
  grid-auto-flow row
  @media (max-width 1000px)
    padding-left 20px
    padding-right 20px
  &__item
    border-radius 20px
    min-height 171px
    &.s
      grid-column span 2
    &.l
      grid-column span 4
      grid-row span 3
    &.m
      grid-column span 3
  @media (max-width 1000px)
    &__item
      &.s, &.l, &.m
        grid-column span 4
</style>
