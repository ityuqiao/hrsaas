<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px; margin-right: 15px;" @change="changeDate">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px" @change="changeDate">
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="dateShow">
      <template
        slot="dateCell"
        slot-scope="{date, data}"
      >
        <div class="date-content">
          <span class="text">{{ data.day | formateDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>

      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    formateDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    myData: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      dateShow: this.myData,
      yearList: [],
      currentYear: this.myData.getFullYear(),
      currentMonth: this.myData.getMonth() + 1
    }
  },
  created() {
    for (let i = 0; i < 11; i++) {
      this.yearList.push(this.currentYear + 5 - i)
    }
  },
  methods: {
    changeDate() {
      const date = new Date(`${this.currentYear}-${this.currentMonth}-1`)
      this.dateShow = date
    },
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6
    }
  }
}
</script>

<style scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td, /deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
