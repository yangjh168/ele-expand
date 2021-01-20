# ts-select


### 代码演示
#### 简单用法
::: demo 通过传入选择框数据data和v-model双向绑定选择框的值。
```html
<template>
    <div>
        <ts-select v-model="selectValue" :data="selectList"/>
    </div>
</template>
 
<script>
  export default {
    data () {
        return {
            selectValue: '',
            selectList: [{ label: '张三', value: 1 }, { label: '李四', value: 2 }, { label: '王五', value: 3 }, { label: '老六', value: 4 }]
        }
    }
  }
</script>
```
:::

#### 自动添加”全部“选项
> 通过传入need-all参数，开启插入”全部“选项
::: demo 通过传入need-all参数，开启插入”全部“选项
```html
<template>
  <div>
    <ts-select v-model="selectValue" :data="selectList" need-all/>
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            selectValue: '',
            selectList: [{ label: '张三', value: 1 }, { label: '李四', value: 2 }, { label: '王五', value: 3 }, { label: '老六', value: 4 }]
        }
    },
  }
</script>
```
:::

#### 异步请求数据
> 通过传入url参数（请求链接），自动请求获取数据，请求返回数据对象中要求包含label、value解析字段。（注意：url与data不能同时使用，如果同时使用url优先级大于data）
::: demo 
```html
<template>
  <div>
    <ts-select v-model="selectValue" url="/xxxxxxx" />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            selectValue: '',
        }
    }
  }
</script>
```
:::

#### 异步请求数据，自定义解析字段
> 通过传入value-map参数，进行自定义解析返回数据字段
::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div>
      <ts-select v-model="selectValue" url="/xxxxxxx" :value-map="['key', 'value']"/>
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            selectValue: '',
        }
    }
  }
</script>
```
:::
#### 其它element的el-select参数
> 比如：带有清空功能的选择框
::: demo 通过传入clearable参数进行开启清空功能
```html
<template>
  <div>
      <ts-select v-model="selectValue" :data="selectList" clearable/>
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            selectValue: '',
            selectList: [{ label: '张三', value: 1 }, { label: '李四', value: 2 }, { label: '王五', value: 3 }, { label: '老六', value: 4 }]
        }
    }
  }
</script>
```
:::

### 使用指南

```js
import TsSelect from '@/components/ts-select';
Vue.use(TsSelect);
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
