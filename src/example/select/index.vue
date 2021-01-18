<template>
  <div>
    <div class="select-box">
      <label>1、简单用法：</label>
      <ts-select v-model="selectValue" :data="selectList"/>
    </div>
    <div class="select-box">
      <label>2、插入全部：</label>
      <ts-select v-model="selectValue" :data="selectList" need-all/>
    </div>
    <div class="select-box">
      <label>3、带有清空功能：</label>
      <ts-select v-model="selectValue" :data="selectList" clearable/>
    </div>
    <div class="select-box">
      <label>4、异步数据选择框：</label>
      <ts-select v-model="selectValue" url="/xxxxxxx" />
    </div>

    <div class="select-box">
      <label>5、异步数据，自定义解析字段：</label>
      <ts-select v-model="selectValue" url="/xxxxxxx" :value-map="['key', 'value']"/>
    </div>

  </div>
</template>

<script>
import TsSelect from '@/components/ts-select'
export default {
  components: {
    TsSelect
  },
  data () {
    return {
      selectValue: '',
      selectList: [{ label: '1步', value: 1 }, { label: '2步', value: 2 }, { label: '3步', value: 3 }, { label: '4步', value: 4 }]
    }
  },
  watch: {
    selectValue (val) {
      console.log(val)
    }
  },
  methods: {
  }
}
</script>
<style>
  .select-box {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
</style>
