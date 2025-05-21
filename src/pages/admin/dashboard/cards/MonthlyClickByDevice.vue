<template>
  <VaCard>
    <VaCardTitle class="pb-0!">
      <h1 class="card-title text-secondary font-bold uppercase">Yearly Breakup</h1>
    </VaCardTitle>
    <VaCardContent>
      <div class="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="w-full md:w-1/2 relative">
          <div class="w-full flex items-center">
            <VaChart type="doughnut" :data="chartData" :options="chartOptions" />
          </div>

          <!-- 中心文字 -->
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div class="text-2xl font-semibold">{{ total }}</div>
            <div class="text-sm text-gray-500">Clicks + Scans</div>
          </div>
        </div>

        <!-- 图例 -->
        <div class="flex flex-col gap-2 w-full md:w-1/2">
          <div v-for="(item, index) in legend" :key="item.label" class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: chartColors[index] }" />
              <span class="text-sm">{{ item.label }}</span>
            </div>
            <span class="text-sm font-medium text-gray-600">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import VaChart from '@/components/va-charts/VaChart.vue'
import { doughnutConfig } from '@/components/va-charts/vaChartConfigs'
import { ChartOptions } from 'chart.js'

// 原始数据
const legend = [
  { label: 'Desktop', value: 146 },
  { label: 'E-Reader', value: 101 },
  { label: 'Tablet', value: 70 },
  { label: 'Mobile', value: 50 },
  { label: 'Unknown', value: 14 },
]

// 提取颜色
const chartColors = ['#2CA8B4', '#B0F1F9', '#3D45D8', '#BDC9FF', '#D97904']

const chartData = {
  labels: legend.map((i) => i.label),
  datasets: [
    {
      data: legend.map((i) => i.value),
      backgroundColor: chartColors,
      borderWidth: 0,
      hoverOffset: 10,
    },
  ],
}

const total = legend.reduce((sum, i) => sum + i.value, 0)

const chartOptions: ChartOptions<'doughnut'> = {
  ...doughnutConfig,
  responsive: true,
  layout: {
    padding: 0,
  },
  cutout: '75%', // 环形厚度
  // ✅ 移除 XY 轴
  scales: {
    x: { display: false },
    y: { display: false },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `${context.label}: ${context.raw}`
        },
      },
    },
  },
}
</script>
