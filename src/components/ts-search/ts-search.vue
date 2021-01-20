<template>
    <ts-form v-bind="customAttrs" v-on="$listeners" v-model="currentForm">
      <template #header>
        <div v-if="showSimple" class="simple-search">
          <div class="search-input-box">
            <el-input
              v-model.trim="currentForm.keyword"
              :placeholder="placeholder"
              class="search-input"
              @keyup.enter.native="handleSearch"
            >
              <el-button slot="append" icon="el-icon-search" @click="handleSearch">快速搜索</el-button>
            </el-input>
          </div>
          <div class="morn-box">
            <el-link :underline="false" @click="moreOparation = !moreOparation">
              更多筛选
              <i :class="moreOparation ? 'el-icon-caret-top': 'el-icon-caret-bottom'" />
            </el-link>
          </div>
        </div>
      </template>
      <transition name="fade-top">
        <div v-show="moreOparation || !showSimple" class="filter-wrapper">
          <slot />
          <el-form-item>
            <el-button v-if="showSearchBtn" type="primary" @click="handleSearch">搜索</el-button>
            <slot name="footer" />
          </el-form-item>
        </div>
      </transition>
    </ts-form>
</template>
<script>
import { TsForm } from '../ts-form'
export default {
  name: 'TsSearch',
  inheritAttrs: false,
  components: {
    TsForm
  },
  props: {
    value: {
      type: Object,
      default: () => {},
      required: true
    },
    // 是否显示快捷搜索栏
    showSimple: {
      type: Boolean,
      default: false
    },
    // 默认是否显示细节搜索
    showComplex: {
      type: Boolean,
      default: false
    },
    // 快捷搜索的placeholder
    placeholder: {
      type: String,
      default: '请输入'
    },
    // 是否开启行内布局
    inline: {
      type: Boolean,
      default: true
    },
    // 是否显示细节搜索的搜索按钮
    showSearchBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentForm: this.value,
      moreOparation: this.showComplex
    }
  },
  computed: {
    customAttrs () {
      return {
        inline: this.inline,
        ...this.$attrs
      }
    }
  },
  methods: {
    // 点击搜索
    handleSearch () {
      this.$emit('on-search', this.currentForm)
    }
  },
  watch: {
    value (val) {
      this.currentForm = val
    }
  }
}
</script>
<style lang="scss" scoped>
  .simple-search {
    display: flex;
    align-items: center;
    .search-input-box {
      flex: 1;
      .search-input {
        margin-right: 20px;
      }
    }
    .morn-box {
      width: 100px;
      text-align: center;
    }
  }
  .filter-wrapper {
    margin-top: 20px;
  }
</style>
