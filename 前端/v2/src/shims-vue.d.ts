/* eslint-disable */
// 声明.vue文件导出的都是 cDEfineComponet
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.json'
