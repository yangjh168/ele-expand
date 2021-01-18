<template>
  <div class="code">
    <div class="code--title">
      <h2>{{title}}</h2>
      <small>{{description}}</small>
    </div>
    <div class="code--demo">
      <div class="code-content">
        <slot></slot>
      </div>
    </div>
    <div v-if="isShow" class="code--segment">
      <slot name="codeText"></slot>
    </div>
    <div v-if="$slots.codeText" class="code--button" @click="handleToggleShow">{{codeTextBtn}}</div>
  </div>
</template>

<script>
export default {
  name: 'DemoCode',
  props: ['title', 'description'],
  data() {
    return {
      isShow: true,
    }
  },
  computed: {
    codeTextBtn() {
      if (this.isShow) {
        return '隐藏代码'
      } else {
        return '显示代码'
      }
    }
  },
  methods: {
    handleToggleShow() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  overflow: hidden;
  .code--title {
    padding: 15px 20px;
    h2 {
      padding: 0;
      margin: 0;
      border-bottom: none;
      font-size: 18px;
    }
    small {
      font-size: 14px;
      display: inline-block;
      margin: 10px 0;
      color: #5e6d82;
    }
  }
  .code--demo {
    border-bottom: none;
    .code-content {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
    }
  }
  .code--segment {
    & pre {
      background-color: #fafafa;
      border-radius: 0;
      font-size: 12px;
      margin: 0;
       & code {
        color: #000;
       }
    }
  }
  .code--button {
    background: #FFF;
    color: #409eff;
    font-weight: 400;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      font-size: 15px;
    }
  }
  & + .code {
    margin-top: 0.85rem;
  }
  &:not(:first-child) {
    margin-top: 0.85rem;
  }
}
</style>