<template>
  <VaCard>
    <VaCardContent>
      <div class="w-full flex items-center">
        <VaChart :type="'line'" :data="chartData" :options="chartOptions" class="h-24" />
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VaChart from '../../../../components/va-charts/VaChart.vue'

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

const range = ref<'7天' | '30天'>('7天')

const chartData = computed(() => {
  const days = range.value === '30天' ? 30 : 7
  const { labels, values } = generateMockVisits(days)

  return {
    labels,
    datasets: [
      {
        label: '访问量',
        data: values,
        fill: false,
        tension: 0.4,
        borderColor: '#42A5F5',
        backgroundColor: '#42A5F5',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 50,
      },
    },
  },
}
</script>
