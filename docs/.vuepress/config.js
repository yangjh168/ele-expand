module.exports = {
  title: '二次封装ele组件',
  description: '别怂，看就完了',
  dest: './dist',    // 设置输出目录
  base: '/', // 设置站点根路径
  themeConfig: {
    repo: 'https://github.com/yangjh168/ele-expand' ,
    nav: [
      { text: '首页', link: '/' },
      { text: 'Element', link: 'https://element.eleme.cn/#/zh-CN' },
    ],
    sidebar:  {
      '/pages/': [{
	      title: '指南',
	      collapsable: false,
	      children: [
	        '',
          'ts-select',
          'ts-range',
          'ts-form',
          'ts-search'
        ]
	    }]
    }
  }, //themeConfig
  configureWebpack: {
    resolve: {
      alias: {
        '@img': 'images'
      }
    }
  },
  // 注册自定义组件
  // https://vuepress.vuejs.org/zh/plugin/official/plugin-register-components.html#%E5%AE%89%E8%A3%85
  plugins: [
    [
      'demo-container'
    ]
  ]
}