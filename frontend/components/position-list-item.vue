<template>
  <nuxt-link
    class="position-list-item"
    :to="`/currencies/${position.symbol}`"
  >
    <div class="image-container">
      <currency-icon :currency="position" />
    </div>

    <div class="currency-info">
      <div class="currency-name">{{position.name}}</div>
      <div class="currency-amount">
        {{position.amount}} {{position.symbol.toUpperCase()}}
      </div>
    </div>

    <div class="currency-equivalent">
      <div>{{position.amountEur}}</div>
      <div class="equivalent-unit">EUR</div>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
  import { Position } from '~/entities'
  import CurrencyIcon from '~/components/currency-icon.vue'

  type Props = {
    position: Position
  }

  const { position } = defineProps<Props>()

</script>

<style lang="sass" scoped>
.position-list-item
  +block
  display: flex
  align-items: center
  //width: 100%
  margin-bottom: 12px

.image-container
  width: 32px
  height: 32px
  img
    height: 100%

.currency-info
  margin-left: 12px

.currency-amount
  color: $osom-grey-light
  font-size: 12px

.currency-equivalent
  margin-left: auto
  display: flex

.equivalent-unit
  +equivalent-unit
</style>