# ts-range
一个数字范围选择组件

### 代码演示
#### 简单用法
> 通过v-model进行双向绑定，传入的值可以为字符串，也可以为数组
> 当传入的值为String时，则返回的值也是字符串，当传入的值为Array时，则返回的值也是Array
::: demo 通过v-model进行双向绑定，传入的值要求为数组对象。
```html
<template>
  <div>
    <div class="demo-item">
      <ts-range v-model="rangeValue" />
    </div>
    <div class="demo-item">
      <ts-range v-model="rangeValue2" />
    </div>
  </div>
</template>
<script>
  export default {
    data () {
        return {
            rangeValue: '',
            rangeValue2: []
        }
    }
  }
</script>
<style>
  .demo-item {
    margin-bottom: 10px;
  }
</style>
```
:::

#### 禁用输入框
> 通过传入disabled参数进行设置，参数为Boolean类型的值并且长度为2的数组
::: demo 通过传入disabled参数进行设置，参数为Boolean值并且长度为2的数组
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :disabled="rangeDisabled"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: '',
            rangeDisabled: [true, true]
        }
    }
  }
</script>
```
:::

#### 限制输入框最大输入长度
> 通过maxlength进行设置，参数为number类型的值并且长度为2的数组
::: demo 
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :maxlength="maxConfig"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: [],
            maxConfig: [10, 20]
        }
    }
  }
</script>
```
:::

#### 自定义输入框之间的分隔符
> 可通过range-separator参数设置分隔符
::: demo 
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :range-separator="separator"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: [],
            separator: '~'
        }
    }
  }
</script>
```
:::

#### 自定义值的分隔符
> 当v-model传入的是String时，可通过value-separator参数设置返回值的分隔符
::: demo 
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :value-separator="separator"
      @change="changeValue"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: '',
            separator: '~'
        }
    },
    methods: {
        changeValue(val) {
            console.log(val)
        }
    }
  }
</script>
```
:::

#### 自定义placeholder提示
::: demo 传入参数必须为String类型的值并且长度为2的数组
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :placeholder="placeholder"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: [],
            placeholder: ['开始', '结束']
        }
    }
  }
</script>
```
:::

#### 关闭清空功能
::: demo 通过clearable进行设置。
```html
<template>
  <div>
    <ts-range
      v-model="rangeValue"
      :clearable="false"
    />
  </div>
</template>
 
<script>
  export default {
    data () {
        return {
            rangeValue: []
        }
    }
  }
</script>
```
:::

### 使用指南

```js
import TsRange from '@/components/ts-range'
Vue.use(TsRange);
```

### ts-range：属性

| 名称 | 类型 | 默认值 | 说明 | 
|-----------|-----------|-----------|-------------|
| value | `[String, Array]` | `-` | 输入框值 |
| disabled | `Array` | `[false, false]` | 是否禁用（长度为2的数组） |
| maxlength | `Array` | `-` | 最大输入长度（长度为2的数组） |
| rangeSeparator | `String` | `至` | 输入框分隔符 |
| valueSeparator | `String` | `_` | 值的分隔符，当value为String时有效 |
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
