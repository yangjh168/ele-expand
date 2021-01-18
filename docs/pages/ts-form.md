# ts-form

### 使用指南

```js
import { TsForm, TsFormItem } from '@/components/ts-form'
Vue.use(TsForm);
Vue.use(TsFormItem);
```

### 代码演示

```html
    <ts-form v-model="formData" inline>
      <ts-form-item form-type="text" field="name"/>
      <ts-form-item form-type="number" field="age"/>
      <ts-form-item :data="selectList" form-type="select" field="type" />
      <ts-form-item :value-map="['value','key']" form-type="default-select" field="defaultType" default-list="serveName"/>
      <ts-form-item label="值返回字符串" form-type="date-picker" field="date"/>
      <ts-form-item :field="['start', 'end']" label="值返回数组" form-type="date-picker"/>
      <ts-form-item :field="['min', 'max']" label="值返回数组" form-type="section"/>
    </ts-form>
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
| valueSeparator | `String` | `_或~` | 范围选择值得分隔符(formType为date-picker与section有效) |
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

