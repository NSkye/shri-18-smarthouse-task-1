<template>
  <div class='app'>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import MainArea from '@/components/MainArea'

export default {
  computed: {
    MainContainer () {
      return this.$route
    }
  },
  components: {
    Footer,
    Header,
    MainArea
  }
}
</script>

<style lang='stylus' scoped>
.app
  display grid
  grid-template-columns 100%
  grid-template-rows 1fr 60px
  min-height 100vh
</style>

<style lang='stylus'>
html
  font-size 10px
  @media (max-width 800px)
    font-size 1.5vw
body
  font-family 'Arial', 'Helvetica', sans-serif
  font-size 1.6rem
</style>
