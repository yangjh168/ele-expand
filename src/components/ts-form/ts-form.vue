<template>
  <div class="handle-box">
    <el-form :model="currentValue" ref="elForm" v-bind="$attrs" v-on="$listeners">
      <slot name="header"></slot>
      <slot />
      <slot name="footer"></slot>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'TsForm',
  inheritAttrs: false,
  props: {
    // 表单对象数据
    value: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      currentValue: this.value || {}
    }
  },
  computed: {
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue: {
      deep: true,
      handler: function (val, oldVal) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  },
  created () {
    // 监听值变化
    this.$on('updateValue', this.updateValue)
  },
  methods: {
    // 监听值变化触发函数
    updateValue (key, value) {
      this.$set(this.currentValue, key, value)
    },
    // 实现el-form的一些内置方法
    validate (rest) {
      this.$refs.elForm.validate(rest)
    },
    validateField (rest) {
      this.$refs.elForm.validateField(rest)
    },
    resetFields () {
      this.$refs.elForm.resetFields()
    },
    clearValidate (rest) {
      this.$refs.elForm.clearValidate(rest)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
