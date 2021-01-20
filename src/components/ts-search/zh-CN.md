## ts-search、ts-form-item 表单控件组件

### 使用指南

```js
import { TsSearch, TsFormItem } from '@/components/ts-search'
Vue.use(TsSearch);
Vue.use(TsFormItem);
```

### 代码演示

```html
    <ts-search v-model="formData" inline>
      <ts-form-item form-type="text" field="name"/>
      <ts-form-item form-type="number" field="age"/>
      <ts-form-item :data="selectList" form-type="select" field="type" />
      <ts-form-item :value-map="['value','key']" form-type="default-select" field="defaultType" default-list="serveName"/>
      <ts-form-item label="值返回字符串" form-type="date-picker" field="date"/>
      <ts-form-item :field="['start', 'end']" label="值返回数组" form-type="date-picker"/>
      <ts-form-item :field="['min', 'max']" label="值返回数组" form-type="range"/>
    </ts-search>
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
| 其它属性参数 | `-` | `-` | 请参考element的el-form |

### ts-form-item： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| change | value值改变事件 | 
| 其它事件 | 请参考element的el-form-item组件 | 

### ts-form-item：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 其它插槽 | 请参考element的el-form-item组件 | 
