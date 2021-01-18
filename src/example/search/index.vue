<template>
  <div>
    <div class="title">筛选表单组件</div>

    <ts-search v-model="formData" inline showSimple>
      <ts-form-item label="名称" form-type="text" field="name"/>
      <ts-form-item label="年龄" form-type="number" field="age"/>
      <ts-form-item label="选择框" :data="selectList" form-type="select" field="type" />
      <ts-form-item label="年龄" :value-map="['value','key']" form-type="default-select" field="defaultType" default-list="serveName"/>
      <ts-form-item label="值返回字符串" form-type="date-picker" field="date"/>
      <ts-form-item label="值返回数组" :field="['start', 'end']" form-type="date-picker"/>
      <ts-form-item label="值返回数组" :field="['min', 'max']" form-type="section"/>
    </ts-search>

  </div>
</template>

<script>
import { TsSearch, TsFormItem } from '@/components/ts-search'
export default {
  components: {
    TsSearch,
    TsFormItem
  },
  data () {
    return {
      selectList: [{ label: '1步', value: 1 }, { label: '2步', value: 2 }, { label: '3步', value: 3 }, { label: '4步', value: 4 }],
      formData: {}
    }
  },
  watch: {
    formData: {
      deep: true, // 深度监听设置为 true
      handler: function (val, oldVal) {
        console.log(val)
      }
    }
  },
  methods: {
  }
}
</script>
<style>
  .title {
    margin-top: 20px;
  }
</style>
