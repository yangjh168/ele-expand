module.exports = {
  title: '扩展Ele组件',
  description: '别怂，干就完了',
  dest: './dist',    // 设置输出目录
  base: '/', // 设置站点根路径
  themeConfig: {
    repo: 'https://github.com/yangjh168' ,
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
  }
}