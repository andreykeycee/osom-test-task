<template>
  <div class="currency-chart">
    <div class="chart-header">
      <div class="currency-icon-container">
        <currency-icon :currency="currency"/>
      </div>

      <div class="general-currency-info">
        <div class="currency-equivalent">
          <div class="currency-price">{{formatNumber(currency.price)}}</div>
          <div class="equivalent-unit">EUR</div>
        </div>
        <div
          class="currency-trend"
          :class="[selectedHistory.change.isUptrend ? 'positive' : 'negative']"
        >
          {{selectedHistory.change.isUptrend ? '↑' : '↓'}}
          {{formatNumber(selectedHistory.change.amount)}} ({{selectedHistory.change.percents}})
        </div>
      </div>

      <div class="selected-range">{{rangeNames[state.selectedTab]}}</div>
    </div>

    <line-chart class="chart" v-bind="lineChartProps" :height="108"/>

    <div class="chart-tabs">
      <div
        class="chart-tab"
        v-for="key in Object.keys(rangeNames)"
        @click="state.selectedTab = key"
        :class="{ active: state.selectedTab === key }"
      >
        {{key}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useCurrencyStore } from '~/stores/currency'
  import { PriceHistoryRange, PriceHistoryRangeName } from '~/entities'
  import { useLineChart, LineChart } from 'vue-chart-3'
  import { ChartOptions, Chart, registerables } from 'chart.js'
  import CurrencyIcon from '~/components/currency-icon.vue'
  import { formatNumber } from '~/utils'

  Chart.register(...registerables)

  type State = {
    selectedTab: PriceHistoryRangeName
  }

  const state = reactive<State>({
    selectedTab: '1D'
  })

  const { currency } = useCurrencyStore()

  const selectedHistory = computed<PriceHistoryRange | null>(() => {
    return currency?.priceHistory[state.selectedTab] ?? null
  })

  const rangeNames: Record<PriceHistoryRangeName, string> = {
    '1D': '1 Day',
    '7D': '7 Days',
    '1M': '1 Month',
    '3M': '3 Months',
    YTD: 'Year to date',
    ALL: 'All',
  }

  const chartData = computed<ChartOptions<'line'>>(() => {

    return {
      labels: selectedHistory.value?.priceData.map(() => ''),
      datasets: [{
        data: selectedHistory.value?.priceData.map(([_, price]) => price),
        borderColor: '#0064FF',
        radius: 0,
        cubicInterpolationMode: 'monotone'
      }]
    }
  })

  const options = computed<ChartOptions<'line'>>(() => ({
    scales: {
      yAxis: {
        display: false,
        grid: {
          display: false
        }
      },
      xAxis: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }))

  const { lineChartProps } = useLineChart({ chartData, options })
</script>

<style lang="sass" scoped>
.currency-chart
  +block

.chart-header
  display: flex

.currency-icon-container
  height: 44px
  width: 44px
  margin-right: 8px
  img
    height: 100%

.currency-equivalent
  display: flex

.currency-price
  font-size: 32px
  font-weight: bold

.equivalent-unit
  +equivalent-unit

.currency-trend
  font-size: 12px

  &.positive
    color: $success

  &.negative
    color: $fail

.selected-range
  color: $osom-grey-light
  font-size: 12px
  margin-left: auto

.chart
  margin-top: 24px

.chart-tabs
  display: flex
  justify-content: space-between
  margin-top: 24px

.chart-tab
  display: flex
  justify-content: center
  align-items: center
  width: 42px
  height: 32px
  border-radius: 12px
  font-size: 14px
  cursor: pointer
  color: $secondary-dark

  &.active
    background: $chips-blue
    color: $text-active-dark

</style>