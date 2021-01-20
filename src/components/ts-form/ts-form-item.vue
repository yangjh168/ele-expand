<template>
  <el-form-item
    :prop="itemProp"
    :label="label"
    :label-width="labelWidth"
  >
    <!-- 使用元组件component，通过:value 和@input手动实现v-module事件 -->
    <component
      v-if="current"
      :is="current"
      :value="customValue"
      v-bind="customAttrs"
      v-on="customListeners"
    />
    <slot />
  </el-form-item>
</template>
<script>
import TsSelect from '../ts-select'
import TsRange from '../ts-range'
import builtInList from './builtInList'
import { pickerOptions } from './options'
export default {
  name: 'TsFormItem',
  inheritAttrs: false,
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
      type: [String, Array]
    },
    defaultList: { // 当formType为default-select时，默认的选项key，详情参考buildInList.js
      type: String,
      default: ''
    },
    valueSeparator: { // 范围选择值得分隔符(formType为date-picker与range有效)
      type: String,
      default: function () {
        if (this.formType === 'range') {
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
      rangeValue: [], // 最大小值(设置为数组，让ts-range返回值为数组)
      componentList: { // 动态组件配置
        text: 'el-input',
        number: 'el-input',
        select: 'ts-select',
        defaultSelect: 'ts-select',
        datePicker: 'el-date-picker',
        range: 'ts-range'
      }
    }
  },
  computed: {
    // 动态component的值，同时实时更新值
    customValue () {
      if (this.formType === 'datePicker' && this.checkRangeType()) {
        return this.dateValue
      } else if (this.formType === 'range') {
        return this.rangeValue
      } else {
        return this.currentValue
      }
    }, // 当前组件的值。当前值从父组件获取，当前值改变触发父组件的updateValue更新值
    currentValue: {
      get () {
        return (this.parent && this.parent.currentValue[this.itemProp]) || ''
      },
      set (val) {
        this.parent.$emit('updateValue', this.itemProp, val)
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
      if (['select', 'defaultSelect'].includes(this.formType)) {
        attrs.placeholder = attrs.placeholder || ('请选择' + (attrs.label || ''))
      }
      // 内置选择框默认参数
      if (this.formType === 'defaultSelect') {
        attrs.data = builtInList[this.defaultList]
      }
      // 时间日期默认参数
      if (this.formType === 'datePicker' && !this.$attrs.type) {
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
      // if (this.formType === 'range') {
      //   // console.log(attrs)
      // }
      attrs = Object.assign(attrs, this.$attrs)
      return attrs
    },
    // 扩展方法事件
    customListeners () {
      const vm = this
      const listeners = { ...this.$listeners }
      // 重写input事件
      listeners.input = (val) => {
        this.changeInput(val)
      }
      // 数字输入框时限制只能输入数字
      if (this.formType === 'number') {
        listeners.input = (val) => {
          const newVal = val.replace(/[^\d]/g, '')
          vm.currentValue = newVal
        }
      }
      return listeners
    },
    // 实现el-form-item的pop，表单验证需要
    itemProp () {
      if (Array.isArray(this.field)) {
        return this.field.join('-')
      } else {
        return this.field
      }
    }
  },
  watch: {
    // 当formType为date-picker、range时，去更新内置双向绑定的值
    currentValue (val) {
      if (this.formType === 'datePicker' && this.checkRangeType()) {
        this.dateValue = val ? val.split(this.valueSeparator) : ''
      } else if (this.formType === 'range') {
        this.rangeValue = val ? val.split(this.valueSeparator) : []
      }
    }
  },
  created () {
    // 匹配组件
    const formItem = this.componentList[this.formType]
    formItem && (this.current = formItem)
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
      // 初始化表单字段
      if (this.parent && this.itemProp) {
        const key = this.itemProp
        if (!Object.hasOwnProperty.call(this.parent.currentValue, key)) {
          this.parent && this.$set(this.parent.currentValue, key, '')
        }
      }
    },
    // 处理component元组件的input事件
    changeInput (val) {
      // console.log(val)
      // 当前formType为date-picker、range时，自定义格式手动改变表单值
      if ((this.formType === 'datePicker' && this.checkRangeType()) || this.formType === 'range') {
        if (Array.isArray(this.field)) {
          // 返回两个值字段
          if (val && val.length === 2) {
            this.$set(this.parent.currentValue, this.field[0], val[0])
            this.$set(this.parent.currentValue, this.field[1], val[1])
          } else {
            this.$set(this.parent.currentValue, this.field[0], '')
            this.$set(this.parent.currentValue, this.field[1], '')
          }
        }
        // 为了提供表单验证
        if (val && val.length === 2) {
          this.$set(this.parent.currentValue, this.itemProp, `${val[0]}${this.valueSeparator}${val[1]}`)
        } else {
          this.$set(this.parent.currentValue, this.itemProp, '')
        }
      } else {
      // 其它formType，直接改变currentValue，currentValue会触发$emit('updateValue', val)去更新表单
        this.currentValue = val
      }
    },
    // 检测是否为范围选择组件
    checkRangeType () {
      if (!this.$attrs.type || ['datetimerange', 'daterange', 'monthrange'].includes(this.$attrs.type)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
