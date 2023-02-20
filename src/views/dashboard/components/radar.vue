<template>
  <div ref="radar" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    var myChart = echarts.init(this.$refs.radar)
    myChart.setOption({
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [10, 30, 70, 55, 100, 40],
              name: '张三'
            },
            {
              value: [40, 50, 60, 50, 80, 60],
              name: '李四'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
.radar-echart {
    width: 600px;
    height: 400px;
}
</style>
