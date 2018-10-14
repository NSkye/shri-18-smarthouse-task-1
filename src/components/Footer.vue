<template>
  <footer class='footer'>
    <span class='footer__item'><a href='#' class='footer__link'>Помощь</a></span>
    <span class='footer__item'><a href='#' class='footer__link'>Обратная связь</a></span>
    <span class='footer__item'><a href='#' class='footer__link'>Разработчикам</a></span>
    <span class='footer__item'><a href='#' class='footer__link'>Условия использования</a></span>
    <span class="footer__item"><a v-bind:href="license" class="footer__link">Лицензия</a></span>
    <span class='footer__copyright'>© 2001–2017  ООО «Яндекс»</span>
  </footer>
</template>

<script>
import license from '@/assets/license.pdf'

export default {
  data () {
    return { license }
  }
}
</script>

<style lang='stylus' scoped>
.footer
  border-top 1px solid #f0f0f0
  box-sizing border-box
  color #858585
  font-size 12px
  white-space nowrap
  padding-right 14px
  padding-left 14px
  display flex
  flex-wrap wrap
  align-content center
  align-items center
  @media (max-width 640px)
    border-top none
    justify-content center
  &__item
    padding-right 20px
    &:last-child
      padding-right 0
    @media (max-width 700px)
      padding-left 20px
      &:last-child
        padding-right 20px
  &__link
    text-decoration none
    color inherit
  &__copyright
    text-align right
    margin-left auto
    @media (max-width 700px)
      margin-left inherit
</style>
