<template>
  <div role='button' aria-label='navigation' class="menu-button menu-button--inactive">
    <div class="menu-button__element" />
  </div>
</template>

<style lang="stylus" scoped>
$time = .2s

d2(a)
  a / 2
animate-backwards(function, timing)
  transition top d2(timing) function d2(timing), transform d2(timing) function
animate-forwards(function, timing)
  transition top d2(timing) function, transform d2(timing) function d2(timing)
deploy-el(m, time)
  content ""
  position absolute
  height 20%
  width 100%
  background-image url('~@/assets/nav-button.svg')
  top m
  animate-backwards(ease, time)

.menu-button
  display none
  height 15px
  width 16px
  position relative
  &:hover
    cursor pointer
  &::before
    deploy-el(0%, $time)
  &__element
    deploy-el(40%, $time)
  &::after
    deploy-el(80%, $time)
  &--open, &.open
    &::before, &::after, &>.menu-button__element
      top 40%
      animate-forwards(ease, $time)
    &::before, &::after
      transform rotate(45deg)
    &>.menu-button__element
      transform rotate(-45deg)
  @media(max-width 640px)
    display block
</style>
