# ts-search


### 代码演示

#### 简单用法
> 添加showSimple属性，显示快速搜索。开启后默认不显示细节搜索
::: demo 
```html
<template>
  <div>
    <ts-search v-model="formData" showSimple>
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" type="date" field="birthday"/>
      <ts-form-item label="在校日期：" form-type="datePicker" field="inSchoolTime"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
    </ts-search>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectList: [{ label: '1班', value: 1 }, { label: '2班', value: 2 }, { label: '3班', value: 3 }, { label: '4班', value: 4 }],
        formData: {}
      }
    }
  }
</script>
```
:::
#### 默认显示细节搜索
> 通过添加showComplex=true属性默认显示细节搜索
::: demo 通过ts-form-item组件的field属性，进行绑定属性对象
```html
<template>
  <div>
    <ts-search v-model="formData" showSimple showComplex @on-search="handleSearch">
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" type="date" field="birthday"/>
      <ts-form-item label="在校日期：" form-type="datePicker" field="inSchoolTime"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
    </ts-search>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectList: [{ label: '1班', value: 1 }, { label: '2班', value: 2 }, { label: '3班', value: 3 }, { label: '4班', value: 4 }],
        formData: {}
      }
    },
    methods: {
      handleSearch () {
        console.log("搜索")
      }
    }
  }
</script>
```
:::


#### 自定义插槽内容
> 可以自定义部分按钮，同时隐藏细节搜索的搜索按钮
::: demo 
```html
<template>
  <div>
    <ts-search v-model="formData" @change="changeForm" :showSearchBtn="false">
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" type="date" field="birthday"/>
      <ts-form-item label="在校日期：" form-type="datePicker" field="inSchoolTime"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
      <template #footer>
        <el-button type="default" @click="handleExport">导出</el-button>
      </template>
    </ts-search>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectList: [{ label: '1班', value: 1 }, { label: '2班', value: 2 }, { label: '3班', value: 3 }, { label: '4班', value: 4 }],
        formData: {}
      }
    },
    methods: {
      changeForm (val) {
        console.log(val)
      },
      handleExport() {
        console.log("导出")
      }
    }
  }
</script>
```
:::


### 使用指南

```js
import { TsSearch, TsFormItem } from '@/components/ts-form'
Vue.use(TsSearch);
Vue.use(TsFormItem);
```

### ts-search：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| value | `Object` | `-` | v-module双向绑定 |
| showSimple | `Boolean` | `false` | 是否显示快捷搜索栏 |
| showComplex | `Boolean` | `false` | 默认是否显示细节搜索 |
| placeholder | `String` | `请输入` | 快捷搜索的placeholder |
| inline | `Boolean` | `true` | 细节搜索是否行内布局 |
| showSearchBtn | `Boolean` | `true` | 是否显示细节搜索的搜索按钮 |

### ts-search： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| on-search | 搜索点击事件 | 
| change | 表单值改变事件 | 
| 其它事件 | 请参考element的Form组件Form Methods | 

### ts-search：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 默认插槽 | 细节筛选内容 | 
| footer | 自定义尾部内容 | 


### ts-form-item：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| formType | `String` | `-` | 组件类型 |
| label | `String` | `-` | 查找父组件 |
| labelWidth | `String` | `-` | 表单域标签的的宽度 |
| field | `[String, Array]` | `-` | 表单字段name |
| defaultList | `String` | `-` | 当formType为default-select时，默认的选项key，详情参考buildInList.js |
| valueSeparator | `String` | `_或~` | 范围选择值得分隔符(formType为date-picker与range有效) |
| 其它属性参数 | `-` | `-` | 请参考element的el-select组件 |

### ts-form-item： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| change | value值改变事件 | 
| 其它事件 | 请参考element的el-form-item组件 | 

### ts-form-item：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 其它插槽 | 请参考element的el-form-item组件 | 

