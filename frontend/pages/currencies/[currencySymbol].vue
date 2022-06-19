<template>
  <div class="currency-page">
    <div class="page-title">
      <nuxt-link :to="'/currencies'">
        <img src="@/assets/images/back.svg" alt="back" />
      </nuxt-link>
      <h1>
        {{currency.name}}
      </h1>
    </div>

    <currency-chart />

    <div class="alerts-block">
      <div class="alerts-title">Alerts</div>
      <currency-alert
        v-for="(alert, index) in currency.alerts"
        :key="index"
        :alert="alert"
        :symbol="currency.symbol"
        :name="currency.name"
      />
    </div>

    <block-with-title title="Info">
      <div class="info-item">
        <div class="label">Circulating Supply</div>
        <div class="value">{{formatNumber(currency.circulatingSupply, true)}}</div>
      </div>
      <div class="info-item">
        <div class="label">Max Supply</div>
        <div class="value">{{formatNumber(currency.maxSupply, true)}}</div>
      </div>
      <div class="info-item">
        <div class="label">Market Cap</div>
        <div class="value">€{{formatNumber(currency.marketCap, true)}}</div>
      </div>
      <div class="info-item">
        <!--  TODO date of all-time high probably could be parsed from data   -->
        <div class="label">All-Time High • May 12 2021</div>
        <div class="value">€{{formatNumber(currency.allTimeHigh, true)}}</div>
      </div>
    </block-with-title>

    <block-with-title title="About">
      <div class="currency-description">{{currency.description}}</div>
    </block-with-title>
  </div>
</template>

<script lang="ts" setup>
  import { apiRequest } from '~/utils/api-request'
  import { useCurrencyStore } from '~/stores/currency'
  import CurrencyChart from '~/components/currency-chart.vue'
  import { Currency } from '~/entities'
  import BlockWithTitle from '~/components/block-with-title.vue'
  import CurrencyAlert from '~/components/currency-alert.vue'
  import { formatNumber } from '~/utils'

  const route = useRoute()
  const config = useRuntimeConfig()

  await useAsyncData('currency', async ({ $pinia }) => {
    // TODO exclude business logic to separated module
    const data = await apiRequest<Currency>(config.NUXT_ENV_API_URL, {
      method: 'GET',
      endpoint: `/currencies/${route.params.currencySymbol}`
    })

    if (data) {
      const store = useCurrencyStore($pinia)
      store.$patch({ currency: data })
    } else {
      throw Error('no positions provided')
    }
  })

  const store = useCurrencyStore()
  const currency = store.currency
</script>

<style lang="sass" scoped>
.currency-page
  padding-top: 24px
  padding-bottom: 90px

.page-title
  display: flex
  align-items: baseline

  h1
    margin-left: 12px

.alerts-block
  margin-top: 24px

.alerts-title
  color: $secondary-dark
  margin-bottom: 24px

.info-item
  .label
    color: $osom-grey-light
    font-size: 12px

  .value
    font-size: 14px

  &:not(:last-child)
    margin-bottom: 24px

.currency-description
  font-size: 14px
  line-height: 24px
</style>