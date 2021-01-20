# ts-form


### 代码演示
#### 简单用法
> 包括各种表单项，比如输入框、数字输入框、单选框、内置选择框、时间范围选择、数值范围选择等
::: demo 通过ts-form-item组件的field属性，进行绑定属性对象
```html
<template>
  <div>
    <ts-form v-model="formData" @change="changeForm" label-width="100px">
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" type="date" field="birthday"/>
      <ts-form-item label="在校日期：" form-type="datePicker" field="inSchoolTime"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
    </ts-form>
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
      }
    }
  }
</script>
```
:::

#### 行内表单
> 当垂直方向空间受限且表单较简单时，可以在一行内放置表单。
::: demo 设置 inline 属性可以让表单域变为行内的表单域
```html
<template>
  <div>
    <ts-form v-model="formData" @change="changeForm" inline>
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" field="birthday"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
    </ts-form>
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
      }
    }
  }
</script>
```
:::

#### 各种日期类型组件
> datePicker默认的type为daterange， 同时支持其它类型：year/month/date/dates/week/datetime/datetimerange/daterange/monthrange
::: demo 通过ts-form-item组件的type属性，进行设置
```html
<template>
  <div>
    <ts-form v-model="formData" @change="changeForm" label-width="100px">
      <ts-form-item label="daterange：" form-type="datePicker" field="daterange"/>
      <ts-form-item label="date：" form-type="datePicker" type="date" field="date"/>
      <ts-form-item label="year：" form-type="datePicker" type="year" field="year" value-format="yyyy"/>
      <ts-form-item label="month：" form-type="datePicker" type="month" field="month" value-format="yyyy-MM"/>
      <ts-form-item label="dates：" form-type="datePicker" type="dates" field="dates"/>
      <ts-form-item label="week：" form-type="datePicker" type="week" field="week" format="yyyy 第 WW 周" />
      <ts-form-item label="datetime：" form-type="datePicker" type="datetime" field="datetime"/>
      <ts-form-item label="datetimerange：" form-type="datePicker" type="datetimerange" field="datetimerange"/>
      <ts-form-item label="datetimerange：" form-type="datePicker" type="datetimerange" :field="['startTime', 'endTime']"/>
      <ts-form-item label="monthrange：" form-type="datePicker" type="monthrange" field="monthrange"/>
    </ts-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formData: {}
      }
    },
    methods: {
      changeForm (val) {
        console.log(val)
      }
    }
  }
</script>
```
:::

#### 表单验证
> 同时支持ele-form的表单验证
::: demo 设置 inline 属性可以让表单域变为行内的表单域
```html
<template>
  <div>
    <ts-form v-model="formData" ref="ruleForm" @change="changeForm" label-width="100px" :rules="rules">
      <ts-form-item label="姓名：" form-type="text" field="name"/>
      <ts-form-item label="年龄：" form-type="number" field="age"/>
      <ts-form-item label="班别：" form-type="select" :data="selectList" field="className" />
      <ts-form-item label="类型：" form-type="defaultSelect" field="type" default-list="serveName" :value-map="['value','key']" />
      <ts-form-item label="生日：" form-type="datePicker" field="birthday"/>
      <ts-form-item label="在校日期：" form-type="datePicker" :field="['start', 'end']"/>
      <ts-form-item label="金额：" form-type="range" :field="['min', 'max']"/>
      <ts-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </ts-form-item>
    </ts-form>
  </div>
</template>
 
<script>
  export default {
    data () {
      return {
        selectList: [{ label: '1班', value: 1 }, { label: '2班', value: 2 }, { label: '3班', value: 3 }, { label: '4班', value: 4 }],
        formData: {},
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
            { min: 0, max: 150, message: '请输入0~150的数值', trigger: 'blur' }
          ],
          className: [
            { required: true, message: '请选择班别', trigger: 'change' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择生日', trigger: 'change' }
          ],
          'start-end': [
            { required: true, message: '请输入在校日期', trigger: 'change' }
          ],
          'min-max': [
            { required: true, message: '请输入金额', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      changeForm (val) {
        // console.log(val)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
```
:::


### 使用指南

```js
import { TsForm, TsFormItem } from '@/components/ts-form'
Vue.use(TsForm);
Vue.use(TsFormItem);
```

### ts-form：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| value | `Object` | `-` | v-module双向绑定 |

### ts-form： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| change | 表单值改变事件 | 
| 其它事件 | 请参考element的Form组件Form Methods | 

### ts-form：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 其它插槽 | 请参考element的el-select组件 | 


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

