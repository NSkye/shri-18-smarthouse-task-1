<template>
  <div class="fixed-pos-wrapper">
    <header class='header'>
      <div class='logo'>
        <img class='logo__image' v-bind:src='logo'>
      </div>
      <div class='header__background-mobile' />
      <Navigation v-bind:class='{ open: navOpen }' />
      <NavigationButton v-on:click.native='toggleNav' v-bind:class='{ open: navOpen }' />
    </header>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg'
import Navigation from '@/components/Navigation'
import NavigationButton from '@/components/NavigationButton'

export default {
  data () {
    return {
      logo,
      navOpen: false
    }
  },
  components: {
    Navigation,
    NavigationButton
  },
  methods: {
    toggleNav () {
      this.navOpen = !this.navOpen
    }
  }
}
</script>

<style lang="stylus" scoped>
.fixed-pos-wrapper
  width 100%
  height auto
  position fixed
  z-index 10

.header
  position relative
  box-sizing border-box
  display grid
  height 90px
  width 100%
  grid-template-columns 110px auto
  grid-template-rows 100%
  align-items center
  border-bottom 1px solid #f0f0f0
  padding-left 40px
  padding-right 40px
  z-index 2
  background-color white
  @media (max-width 640px)
    justify-content space-between
    border-bottom none
    padding-left 20px
    padding-right 20px
    height 70px
  &__background-mobile
    display none
    z-index -1
    width 100%
    height 100%
    position absolute
    background white
    @media (max-width 640px)
      display block

.logo
  width 110px
  &__image
    width 100%
</style>
