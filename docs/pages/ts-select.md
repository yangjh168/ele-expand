# ts-select

### 使用指南

```js
import TsSelect from '@/components/ts-select';
Vue.use(TsSelect);
```

### 代码演示

```html
    <ts-select v-model="selectValue" :data="selectList" need-all clearable/>
```

### ts-select：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| value | `[Number, String]` | `-` | 选择框的值 |
| url | `String` | `-` | 异步数据请求接口，优先级大于data |
| parseData | `Function` | `(res) => res` | 数据格式解析的回调函数，例子：parseData:function(res){ //res 即为原始返回的数据return res.data //返回数据列表} |
| data | `Array` | `[]` | 本地数据 |
| valueMap | `Array` | `['label', 'value']` | 数据解析字段（长度必须为2） |
| needAll | `Boolean` | `false` | 是否自动添加全部选项 |
| emptyNeedAll | `Boolean` | `false` | 选项为空时是否也需要全部选项 |
| allValue | `[Boolean, Number, String]` | `-` | 全部选项的值 |
| 其它属性参数 | `-` | `-` | 请参考element的el-select组件 |

### ts-select： 事件

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 其它事件 | 请参考element的el-select组件 | 

### ts-select：slot 

| 名称 | 说明 |
|-----------|-----------|-----------|-------------|
| 其它插槽 | 请参考element的el-select组件 | 
