<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
}

pre {
    position: relative;
    border-radius: 4px;
    background-color: #1d1f21;
    padding: 0px;
    border-radius: 4px;
    font-size: 13px;
}
pre ul{
    padding: 0px 0px;
    text-align:right;
    top: -7px;
    list-style: none;
    position: absolute;
}
pre .language{
    position: absolute;
    z-index: 1;
    padding: 2px 10px;
    top: -1px;
    // display: none;
    right: 0px;
    border-radius: 4px;
    color: #fff;
    background-color: #2fd6067a;
    opacity: 0;
    transition: all .5s ease;
}
pre:hover .language{
    opacity: 1;
}

.hljs{
  margin: 0;
  max-height: none;
  line-height: 1.8;
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  -webkit-font-smoothing: auto;
  font-family: Microsoft Yahei,"微软雅黑","Helvetica Neue",Helvetica,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.hljs-keyword, .hljs-selector-tag {
    color: #ffb204c9;;
}
.hljs-string, .hljs-symbol, .hljs-bullet, .hljs-addition {
    color: #a7d57e94;
}
.hljs-comment, .hljs-quote {
    color: #9698969e;
}
</style>
