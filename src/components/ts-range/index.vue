<template>
  <div class="ts-range">
    <el-input
      class="ts-range-item"
      v-model.trim="startValue"
      :disabled="disabled && disabled[0]"
      :maxlength="maxlength && maxlength[0]"
      :max="endValue"
      :placeholder="placeholder && placeholder[0]"
      :clearable="clearable"
      type="text"
      @input="handleInput('startValue', startValue)"
    />
    <span class="range-separator">{{ rangeSeparator }}</span>
    <el-input
      class="ts-range-item"
      v-model.trim="endValue"
      :disabled="disabled && disabled[1]"
      :maxlength="maxlength && maxlength[1]"
      :min="startValue"
      :placeholder="placeholder && placeholder[1]"
      :clearable="clearable"
      type="text"
      @input="handleInput('endValue', endValue)"
    />
  </div>
</template>
<script>
// 判断值是否相等
const valueEquals = function (a, b) {
  const aIsArray = a instanceof Array
  const bIsArray = b instanceof Array
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false
    }
    return a.every((item, index) => item === b[index])
  }
  if (!aIsArray && !bIsArray) {
    return a === b
  }
  return false
}

export default {
  name: 'TsRange',
  inheritAttrs: false,
  props: {
    // 输入框值
    value: {
      type: [String, Array],
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Array,
      default: () => [false, false],
      validator (val) {
        if (!val.length || val.length !== 2) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[error] prop:disabled\'s length should be 2')
          }
          return false
        }
        return true
      }
    },
    // 最大输入长度
    maxlength: {
      type: Array,
      default: null,
      validator (val) {
        if (!val.length || val.length !== 2) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[error] prop:maxlength\'s length should be 2')
          }
          return false
        }
        return true
      }
    },
    // 输入框分隔符
    rangeSeparator: {
      type: String,
      default: '至'
    },
    // 值得分隔符
    valueSeparator: {
      type: String,
      default: '_'
    },
    // 输入框占位文本
    placeholder: {
      type: Array,
      default: () => ['最小值', '最大值'],
      validator (val) {
        if (!val.length || val.length !== 2) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[error] prop:placeholder\'s length should be 2')
          }
          return false
        }
        return true
      }
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      startValue: '', // 当前最小值的值
      endValue: '', // 当前最大值的值
      currentValue: '' // 动态值，当值为数组时，返回数组值，当值为字符串时返回拼接字符串
    }
  },
  watch: {
    // 监听各项值的变化
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value (val, oldVal) {
      if (!valueEquals(val, oldVal)) {
        if (val && val.length > 0) {
          if (Array.isArray(val)) {
            if (val && val.length === 2) {
              this.startValue = val ? val[0] : ''
              this.endValue = val ? val[1] : ''
            } else {
              console.error('[error] prop:v-model\'s length should be 2')
            }
          } else {
            const ary = val.split(this.valueSeparator)
            if (ary && ary.length === 2) {
              this.startValue = ary ? ary[0] : ''
              this.endValue = ary ? ary[1] : ''
            } else {
              console.error('[error] prop:v-model must be split to conform to valueSeparator format')
            }
          }
        } else {
          this.startValue = ''
          this.endValue = ''
        }
      }
    },
    startValue (val) {
      this.updateValue()
    },
    endValue (val) {
      this.updateValue()
    },
    valueSeparator () {
      this.updateValue()
    }
  },
  methods: {
    // 中文等其他非数字类型数据处理
    handleInput (type, val) {
      this[type] = val.replace(/[^\d]/g, '')
    },
    // 动态更新值
    updateValue () {
      if (this.startValue || this.endValue) {
        if (Array.isArray(this.value)) {
          this.currentValue = [this.startValue ? this.startValue : '', this.endValue ? this.endValue : '']
        } else {
          this.currentValue = `${this.startValue}${this.valueSeparator}${this.endValue}`
        }
      } else {
        if (Array.isArray(this.value)) {
          this.currentValue = []
        } else {
          this.currentValue = ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .ts-range {
    display: flex;
    align-items: center;
    .ts-range-item {
      flex: 1;
    }
    .range-separator {
      margin: 0 15px;
    }
  }
</style>
