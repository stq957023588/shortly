import { TDoughnutChartData } from '../types'

export const profitBackground = '#154EC1'
export const expensesBackground = '#fff'
export const earningsBackground = '#ECF0F1'

export const doughnutChartData: TDoughnutChartData = {
  labels: ['Desktop', 'Mobile', 'UniApp', 'Unknown'],
  datasets: [
    {
      label: 'Yearly Breakdown',
      backgroundColor: ['#154EC1', '#3A6EE0', '#6C5DD3', '#00B5D8', '#66C5FF', '#5061B2', '#A8C1F3'],
      data: [432, 167, 500],
    },
  ],
}
