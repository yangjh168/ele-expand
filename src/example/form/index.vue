<template>
  <div id="app">
    <div class="title">选择框组件</div>
    <ts-select v-model="selectValue" :data="selectList" need-all clearable/>
    <div class="title">时间日期组件</div>
    <el-date-picker
      v-model="datePicker"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="val => handleChangeTime(val)"
    />
    <div class="title">最大最小值组件</div>
    <ts-range
      v-model="rangeValue"
    />
    <div class="title">筛选表单组件</div>

    <ts-form v-model="formData" inline>
      <ts-form-item form-type="text" field="name"/>
      <ts-form-item form-type="number" field="age"/>
      <ts-form-item :data="selectList" form-type="select" field="type" />
      <ts-form-item :value-map="['value','key']" form-type="default-select" field="defaultType" default-list="serveName"/>
      <ts-form-item label="值返回字符串" form-type="date-picker" field="date"/>
      <ts-form-item :field="['start', 'end']" label="值返回数组" form-type="date-picker"/>
      <ts-form-item :field="['min', 'max']" label="值返回数组" form-type="section"/>
    </ts-form>

  </div>
</template>

<script>
import TsSelect from '@/components/ts-select'
import TsRange from '@/components/ts-range'
import { TsForm, TsFormItem } from '@/components/ts-form'
export default {
  components: {
    TsSelect,
    TsRange,
    TsForm,
    TsFormItem
  },
  data () {
    return {
      selectValue: '',
      selectList: [{ label: '1步', value: 1 }, { label: '2步', value: 2 }, { label: '3步', value: 3 }, { label: '4步', value: 4 }],
      datePicker: '',
      rangeValue: [],
      formData: {}
    }
  },
  watch: {
    selectValue (val) {
      console.log(val)
    },
    rangeValue (val) {
      console.log(val)
    },
    formData: {
      deep: true, // 深度监听设置为 true
      handler: function (val, oldVal) {
        console.log(val)
      }
    }
  },
  methods: {
    handleChangeTime (val) {
      console.log(val)
      console.log(this.datePicker)
    }
  }
}
</script>
<style>
  .title {
    margin-top: 20px;
  }
</style>
