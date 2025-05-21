<script lang="ts" setup>
import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
import RegionRevenue from './cards/RegionRevenue.vue'
import ClickOverTime from './cards/ClickOverTime.vue'
import MonthlyGrowthRate from './cards/MonthlyGrowthRate.vue'
import MonthlyClickByDevice from './cards/MonthlyClickByDevice.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1 class="page-title font-bold">{{ t('menu.dashboard') }}</h1>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-4">
      <ClickOverTime class="w-full sm:w-[70%]" />
      <div class="flex flex-col gap-4 w-full sm:w-[30%]">
        <MonthlyClickByDevice class="h-full" />
        <MonthlyGrowthRate />
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4">
      <RevenueByLocationMap class="w-full md:w-4/6" />
      <RegionRevenue class="w-full md:w-2/6" />
    </div>
  </section>
</template>
