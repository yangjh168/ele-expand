<template>
  <div class="handle-box">
    <el-form v-bind="$attrs" v-on="$listeners">
      <slot name="header"></slot>
      <slot />
      <slot name="footer"></slot>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'TsForm',
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
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
