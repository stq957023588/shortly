<template>
  <VaCard class="flex flex-col">
    <VaCardTitle class="flex items-start justify-between">
      <h1 class="card-title text-secondary font-bold uppercase">Click over time</h1>
      <div class="flex gap-2">
        <VaSelect v-model="selectedMonth" preset="small" :options="monthsWithCurrentYear" class="w-24" />
        <VaButton class="h-2" size="small" preset="primary" @click="exportAsCSV">Export</VaButton>
      </div>
    </VaCardTitle>
    <VaCardContent class="flex flex-col-reverse md:flex-row md:items-center justify-between gap-5 h-full">
      <section class="flex flex-col items-start w-full sm:w-1/3 md:w-2/5 lg:w-1/4 gap-2 md:gap-8 pl-4">
        <div>
          <p class="text-xl font-semibold">{{ formatMoney(totalEarnings) }}</p>
          <p class="whitespace-nowrap mt-2">Total request</p>
        </div>
        <div class="flex flex-col sm:flex-col gap-2 md:gap-8 w-full">
          <div>
            <div class="flex items-center">
              <!-- <span class="inline-block w-2 h-2 mr-2 -ml-4" :style="{ backgroundColor: earningsColor }"></span> -->
              <span class="text-secondary">Click this month</span>
            </div>
            <div class="mt-2 text-xl font-semibold">{{ formatMoney(earningsForSelectedMonth.earning) }}</div>
          </div>
        </div>
      </section>
      <section class="w-2/3 md:w-3/5 lg:w-3/4 h-full min-h-72 sm:min-h-32 pt-4">
        <VaChart
          :type="'line'"
          :data="chartData"
          :options="chartOptions"
          class="w-2/3 md:w-3/5 lg:w-3/4 h-full min-h-72 sm:min-h-32 pt-4"
        />
      </section>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { VaCard } from 'vuestic-ui'
import { downloadAsCSV } from '../../../../services/toCSV'
import VaChart from '@/components/va-charts/VaChart.vue'
import { months, generateRevenues, getRevenuePerMonth, formatMoney } from '../../../../data/charts/revenueChartData'
import { ChartOptions } from 'chart.js'

const revenues = generateRevenues(months)

const currentYear = new Date().getFullYear()
const monthsWithCurrentYear = months.map((month) => `${month} ${currentYear}`)

const selectedMonth = ref(monthsWithCurrentYear[0])

const earningsForSelectedMonth = computed(() => getRevenuePerMonth(selectedMonth.value.split(' ')[0], revenues))
const totalEarnings = computed(() => {
  return earningsForSelectedMonth.value.earning + earningsForSelectedMonth.value.expenses
})

const exportAsCSV = () => {
  downloadAsCSV(revenues, 'revenue-report')
}

// 模拟数据生成函数
function generateMockVisits(days: number): { labels: string[]; values: number[] } {
  const labels = []
  const values = []

  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    labels.push(d.toISOString().slice(5, 10)) // MM-DD
    values.push(Math.floor(Math.random() * 200)) // 模拟访问量
  }

  return { labels, values }
}

const range = ref<'7天' | '30天'>('30天')

const chartData = computed(() => {
  const days = range.value === '7天' ? 7 : 30
  const { labels, values } = generateMockVisits(days)

  return {
    labels,
    datasets: [
      {
        label: '访问量',
        data: values,
        fill: true,
        tension: 0.4,
        borderColor: '#42A5F5',
        backgroundColor: '#42A5F5',
      },
    ],
  }
})

const chartOptions: ChartOptions<'line'> = {
  scales: {
    x: {
      display: true,
      grid: {
        display: false, // Disable X-axis grid lines ("net")
      },
    },
    y: {
      display: true,
      grid: {
        display: false, // Disable Y-axis grid lines ("net")
      },
      ticks: {
        display: true, // Hide Y-axis values
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
}
</script>
