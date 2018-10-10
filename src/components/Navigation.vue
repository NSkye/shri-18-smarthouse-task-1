<template>
  <nav class='navigation'>
    <ul class='navigation__list'>
      <li class="navigation__item"><a class="navigation__link" href="/">События</a></li>
      <li class="navigation__item"><a class="navigation__link" href="#">Сводка</a></li>
      <li class="navigation__item"><a class="navigation__link" href="#">Устройства</a></li>
      <li class="navigation__item"><a class="navigation__link" href="#">Сценарии</a></li>
    </ul>
  </nav>
</template>

<style lang="stylus" scoped>
.navigation
  width auto
  min-height 100%
  height 100%
  transition transform .2s
  background white
  &__list
    list-style none
    padding 0
    margin 0
    width auto
    height 100%
    display grid
    grid-auto-flow column dense
    grid-template-rows 100%
    justify-content start
  &__item
    height 100%
    width auto
  &__link
    height 100%
    display grid
    align-items center
    justify-content center
    padding-left 14px
    padding-right 14px
    text-decoration none
    color #8a8a8a
    font-weight bold
  &__link[href='/']
    color #333333

@media (max-width 640px)
  .navigation
    position absolute
    top 100%
    left 0
    height auto
    width 100%
    transform translateY(-100%)
    z-index -2
    &--open, &.open
      transform translateY(0)
    &__list
      grid-auto-flow row dense
      grid-template-columns 100%
    &__item
      height auto
      width 100%
    &__link
      padding 0
      min-height 2em
</style>
