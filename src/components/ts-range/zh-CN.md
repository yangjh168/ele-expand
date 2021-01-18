## ts-range 数字范围选择组件

### 使用指南

```js
import TsRange from '@/components/ts-range'
Vue.use(TsRange);
```

### 代码演示

```html
    <ts-range v-model="rangeValue" @change="changeValue"/>
```

### ts-range：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| value | `[String, Array]` | `-` | 输入框值 |
| disabled | `Array` | `[false, false]` | 是否禁用（长度为2的数组） |
| maxlength | `Array` | `-` | 最大输入长度（长度为2的数组） |
| rangeSeparator | `String` | `至` | 输入框分隔符 |
| valueSeparator | `String` | `_` | 值得分隔符 |
| placeholder | `Array` | `['最小值', '最大值']` | 输入框占位文本 |
| clearable | `Boolean` | `true` | 是否可清空 |

### ts-select： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| change | 在 Input 值改变时触发 | 

### ts-range：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 无 | 有待扩展 | 
