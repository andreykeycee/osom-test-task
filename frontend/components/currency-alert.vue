<template>
  <div class="currency-alert">
    <div class="icon-container">
      <currency-icon :currency="{ name, symbol }" />
    </div>

    <!-- TODO this looks the same as the general-currency-info from the chart -->
    <div class="general-alert-info">
      <div class="target-equivalent">
        <div class="currency-price">{{formatNumber(alert.targetPriceEur)}}</div>
        <div class="equivalent-unit">EUR</div>
      </div>
      <div class="target-trend">
        {{alert.isHigher ? '↑' : '↓'}} ({{alert.percentsToChange}})
      </div>
    </div>

    <div class="delete-icon">
      <img src="../assets/images/trash.svg" alt="trash"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CurrencyAlert } from '~/entities'
  import CurrencyIcon from '~/components/currency-icon.vue'
  import { formatNumber } from '~/utils'

  type Props = {
    name: string
    symbol: string
    alert: CurrencyAlert
  }

  const { alert, symbol, name } = defineProps<Props>()
</script>

<style lang="sass" scoped>
.currency-alert
  +block
  display: flex

.icon-container
  width: 32px
  height: 32px
  margin-right: 12px
  img
    width: 100%

.target-equivalent
  display: flex

.currency-price
  font-size: 19px

.equivalent-unit
  +equivalent-unit

.target-trend
  font-size: 12px
  color: $secondary-dark

.delete-icon
  margin-left: auto
  height: 38px
  width: 38px
  border-radius: 12px
  background: rgba(152, 169, 188, 0.1)
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
</style>