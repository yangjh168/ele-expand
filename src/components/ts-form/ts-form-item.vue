<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :aria-disabled="true"
  >
    <!-- 方式一： -->
    <!-- 文本框 / 数字框 -->
    <!-- <template v-if="formType === 'text' || formType === 'number'">
        <el-input
          v-model.trim="currentValue"
          v-bind="customAttrs"
          type="text"
          v-on="customListeners"
        />
      </template> -->
    <!-- 选择框 / 内置默认选择框 -->
    <!-- <template v-if="formType === 'select' || formType === 'default-select'">
        <ts-select
          v-model.trim="currentValue"
          v-bind="customAttrs"
          v-on="customListeners"
        />
      </template> -->
    <!-- 时间日期 -->
    <!-- <template v-if="formType === 'date-picker'">
        <el-date-picker
          v-model="dateValue"
          v-bind="customAttrs"
          v-on="customListeners"
        />
      </template> -->
    <!-- <template v-if="formType === 'section'">
        <ts-range
          v-model.trim="sectionValue"
          v-bind="customAttrs"
          v-on="customListeners"
        />
      </template> -->

    <!-- 方式二 -->
    <!-- 使用元组件component，通过:value 和@input手动实现v-module事件 -->
    <component
      v-if="current"
      :is="current"
      :value="moduleKey"
      v-bind="customAttrs"
      v-on="customListeners"
    />
  </el-form-item>
</template>
<script>
import TsSelect from '@/components/ts-select'
import TsRange from '@/components/ts-range'
import builtInList from './builtInList'
import pickerOptions from '@/mixins/pickerOptions'
export default {
  name: 'TsFormItem',
  components: {
    TsSelect,
    TsRange
  },
  props: {
    formType: { // 组件类型
      type: String,
      default: ''
    },
    label: { // 查找父组件
      type: String,
      default: ''
    },
    labelWidth: { // 表单域标签的的宽度
      type: String,
      default: ''
    },
    field: { // 表单字段name
      type: [String, Array],
      required: true
    },
    defaultList: { // 当formType为default-select时，默认的选项key，详情参考buildInList.js
      type: String,
      default: ''
    },
    valueSeparator: { // 范围选择值得分隔符(formType为date-picker与section有效)
      type: String,
      default: function () {
        if (this.formType === 'section') {
          return '_'
        } else {
          return '~'
        }
      }
    }
  },
  data () {
    return {
      current: null, // 当前渲染的组件
      parent: null, // 父组件ts-form实例
      dateValue: '', // 范围日期值
      sectionValue: [], // 最大小值(设置为数组，让ts-range返回值为数组)
      componentList: { // 动态组件配置(方式二)
        text: { current: 'el-input', valueObj: 'currentValue' },
        number: { current: 'el-input', valueObj: 'currentValue' },
        select: { current: 'ts-select', valueObj: 'currentValue' },
        'default-select': { current: 'ts-select', valueObj: 'currentValue' },
        'date-picker': { current: 'el-date-picker', valueObj: 'dateValue' },
        section: { current: 'ts-range', valueObj: 'sectionValue' }
      }
    }
  },
  computed: {
    // 当前子组件的值
    currentValue: {
      get () {
        return (this.parent && this.parent.currentValue[this.field]) || ''
      },
      set (val) {
        this.parent.$emit('updateValue', this.field, val)
      }
    },
    // 扩展属性
    customAttrs () {
      let attrs = {}
      // 部分组件默认参数
      if (['text', 'number'].includes(this.formType)) {
        attrs.type = 'text'
        attrs.placeholder = attrs.placeholder || ('请输入' + (attrs.label || ''))
      }
      if (['select', 'default-select'].includes(this.formType)) {
        attrs.placeholder = attrs.placeholder || ('请选择' + (attrs.label || ''))
      }
      // 内置选择框默认参数
      if (this.formType === 'default-select') {
        attrs.data = builtInList[this.defaultList]
      }
      // 时间日期默认参数
      if (this.formType === 'date-picker') {
        attrs.type = 'daterange'
        attrs['picker-options'] = pickerOptions
        attrs['value-format'] = 'yyyy-MM-dd'
        attrs['range-separator'] = '至'
        attrs['start-placeholder'] = '开始日期'
        attrs['end-placeholder'] = '结束日期'
        attrs['end-placeholder'] = '结束日期'
        attrs.align = 'right'
      }
      // 设置最大小值默认参数
      if (this.formType === 'section') {
        // console.log(attrs)
      }

      attrs = Object.assign(attrs, this.$attrs)
      return attrs
    },
    // 扩展方法事件
    customListeners () {
      const vm = this
      const listeners = { ...this.$listeners }
      // 重新input事件
      listeners.input = (val) => {
        this.changeInput(val)
      }
      // 数字输入框默认方法
      if (this.formType === 'number') {
        listeners.input = (val) => {
          const newVal = val.replace(/[^\d]/g, '')
          vm.currentValue = newVal
        }
      }
      // 日期默认方法
      if (this.formType === 'date-picker') {
        listeners.change = (val) => {
          this.handleChangeTime(val)
          this.$emit('change', val)
        }
      }
      // 最小大值默认方法
      if (this.formType === 'section') {
        listeners.change = (val) => {
          this.handleChangeSection(val)
          this.$emit('change', val)
        }
      }
      return listeners
    },
    // 动态value(方式二)
    moduleKey () {
      const obj = this.findConValueObj(this.formType)
      return this[obj.valueObj]
    }
  },
  watch: {
  },
  created () {
    // 检查是哪个组件(方式二)
    const obj = this.findConValueObj(this.formType)
    this.current = obj.current
    // 查找父组件
    this.findCptUpward('TsForm')
  },
  methods: {
    // 查找父组件
    findCptUpward (cptName) {
      let parentCpt = this.$parent
      while (parentCpt) {
        if (parentCpt.$options.name === cptName) {
          this.parent = parentCpt
          break
        }
        parentCpt = parentCpt.$parent
      }
    },
    // 改变时间日期
    handleChangeTime (val) {
      if (Array.isArray(this.field)) {
        // 返回两个值字段
        if (val) {
          this.$set(this.parent.currentValue, this.field[0], val[0])
          this.$set(this.parent.currentValue, this.field[1], val[1])
        } else {
          this.$set(this.parent.currentValue, this.field[0], '')
          this.$set(this.parent.currentValue, this.field[1], '')
        }
      } else {
        // 一个值字段
        this.$set(this.parent.currentValue, this.field, `${val[0]}${this.valueSeparator}${val[1]}`)
      }
    },
    // 改变最大小值
    handleChangeSection (val) {
      if (Array.isArray(this.field)) {
        // 返回两个值字段
        if (val) {
          this.$set(this.parent.currentValue, this.field[0], val[0])
          this.$set(this.parent.currentValue, this.field[1], val[1])
        } else {
          this.$set(this.parent.currentValue, this.field[0], '')
          this.$set(this.parent.currentValue, this.field[1], '')
        }
      } else {
        // 一个值字段
        this.$set(this.parent.currentValue, this.field, `${val[0]}${this.valueSeparator}${val[1]}`)
      }
    },
    // 处理component元组件的input事件（方法二）
    changeInput (val) {
      const obj = this.findConValueObj(this.formType)
      const key = obj.valueObj
      this[key] = val
    },
    // 根据formType查找valueObj（方法二）
    findConValueObj (formType) {
      const formItem = this.componentList[formType]
      return formItem
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
