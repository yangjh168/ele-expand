<template>
  <!-- 扩展el-select组件 -->
  <el-select v-model="currentValue" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="(item, index) in processOptions" :key="index" :value="item.value" :label="item.label" />
  </el-select>
</template>
<script>
export default {
  name: 'TsSelect',
  inheritAttrs: false,
  props: {
    value: { // 选择框的值
      type: [Number, String],
      // required: true,
      default: ''
    },
    url: { // 异步数据请求接口，优先级大于data
      type: String,
      default: ''
    },
    /**
     * 数据格式解析的回调函数，例子：
     * parseData: function(res){ //res 即为原始返回的数据
        return res.data //返回数据列表
      }
    */
    parseData: {
      type: Function,
      default: (res) => res
    },
    data: { // 本地数据
      type: Array,
      default: () => []
    },
    valueMap: { // 数据解析字段
      type: Array,
      default: () => ['label', 'value'],
      validator(val) {
        if (!val.length || val.length !== 2) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[error] prop:valueMap\'s length should be 2')
          }
          return false
        }
        return true
      }
    },
    needAll: { // 是否自动添加全部选项
      type: Boolean,
      default: false
    },
    emptyNeedAll: { // 选项为空时是否也需要全部选项
      type: Boolean,
      default: false
    },
    allValue: { // 全部选项的值
      type: [Boolean, Number, String],
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value,
      options: (!this.url) ? (this.data || []) : []
    }
  },
  computed: {
    processOptions() {
      let newOptions = []
      if (this.options.length) {
        const isObject = typeof this.options[0] === 'object'
        if (isObject && !this.valueMap) {
          newOptions = this.options
        } else if (isObject && this.valueMap) {
          newOptions = this.options.map(item => {
            if (item[this.valueMap[0]] === undefined) {
              console.error(`[error] ts-select prop:data no ${this.valueMap[0]} found in the item`)
            }
            if (item[this.valueMap[1]] === undefined) {
              console.error(`[error] ts-select prop:data no ${this.valueMap[1]} found in the item`)
            }
            return {
              label: item[this.valueMap[0]],
              value: item[this.valueMap[1]]
            }
          })
        } else {
          newOptions = this.options.map(function(item) {
            return {
              label: item,
              value: item
            }
          })
        }
      }
      if ((this.needAll && newOptions.length) || (!newOptions.length && this.emptyNeedAll)) {
        newOptions.unshift({
          label: '全部',
          value: this.allValue
        })
      }
      return newOptions
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue(val) {
      this.$emit('input', val)
    }
  },
  async created() {
    if (this.url) {
      try {
        const res = await this.$axios.get(this.url)
        this.options = this.parseData(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
