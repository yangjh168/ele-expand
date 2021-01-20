import { TsForm, TsFormItem } from './ts-form/index'
import TsRange from './ts-range/index'
import { TsSearch } from './ts-search/index'
import TsSelect from './ts-select/index'

const components = [
  TsForm,
  TsFormItem,
  TsRange,
  TsSearch,
  TsSelect
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  TsForm,
  TsFormItem,
  TsRange,
  TsSearch,
  TsSelect,
  version: '0.0.1'
}
