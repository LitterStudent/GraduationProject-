<template>
  <div class="editor">
    <div :style="containerStyle">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <div :style="boxstyle">
        <Editor
          v-model="answerValueHtml"
          :style="editorStyle"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef, onMounted, computed, ref } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  components: { Editor, Toolbar },
  props: {
    containerStyle: { type: String, default: 'border: 1px solid #ccc' },
    placeholder: { type: String },
    height: { type: String, default: '90px' },
    boxstyle: { type: String, default: 'margin-left: 10px;width: 90%;' },
    toobarexclude: {
      type: Array,
      default: () => {
        return [
          'blockquote',
          'bgColor',
          'clearStyle',
          'todo',
          'justifyLeft',
          'justifyRight',
          'justifyCenter',
          'insertVideo',
          'insertTable',
          'codeBlock',
          'undo',
          'redo',
          'fullScreen'
        ]
      }
    },
    answerValue: { type: String, default: '<p>hello</p>' }
  },
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const editorStyle = computed(() => {
      return 'height: ' + props.height + '; overflow-y: hidden'
    })
    // 模拟 ajax 异步获取内容
    onMounted(() => {})
    const toolbarConfig = {
      excludeKeys: props.toobarexclude
    }
    const editorConfig = { MENU_CONF: {}, placeholder: props.placeholder }
    editorConfig.MENU_CONF['uploadImage'] = {
      // form-data fieldName ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file',
      server: '/api/upload',
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 10 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      headers: {
        Accept: 'text/x-json',
        otherKey: 'xxx'
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 5 * 1000 // 5 秒
    }
    // const onChange = (editor) => {
    //   const content = editor.getHtml()
    //     const contentStr = JSON.stringify(content)
    //   console.log(content)
    //   const container = document.querySelector('#content')
    //   container.innerHTML = content
    // }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const answerValueHtml = ref(props.answerValue)
    return {
      editorRef,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      editorStyle,
      answerValueHtml
      // onChange
    }
  }
}
</script>

<style scoped></style>
