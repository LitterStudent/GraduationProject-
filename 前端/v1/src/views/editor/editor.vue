<template>
  <div class="editor" style="margin-top: 60px">
    <div class="editor-box">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="margin-left: 200px"
      />
      <div class="title-box">
        <input
          v-model="artitleTitle"
          placeholder="请输入标题(最多一百个字)"
          type="text"
          class="inpu-title"
        />
      </div>
      <div class="box">
        <Editor
          @onChange="onChange"
          style="padding: 20px; height: 700px; overflow-y: hidden"
          :defaultConfig="editorConfig"
          :mode="mode"
          v-model="htmlValue"
          @onCreated="handleCreated"
        />
      </div>
      <div class="footer">
        <h2 class="footer-title">发布设置</h2>
        <div class="upload-cover">
          <span style="margin: 0 20px">添加封面图片</span>
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="topic">
          <span style="margin: 0 50px 0 20px">文章话题</span>
          <div class="change-topic-input">
            <el-autocomplete
              v-model="topic_name"
              :fetch-suggestions="querySearch"
              popper-class="my-autocomplete"
              placeholder="请输入话题"
              style="width: 100%"
            >
              <template #default="{ item }">
                <div class="value">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <div class="column-collect">
          <span style="margin: 0 50px 0 20px">专栏收录</span>
          <el-radio v-model="isColumn" :label="1" size="large"
            >发布到专栏</el-radio
          >
          <el-radio v-model="isColumn" :label="0" size="large"
            >不发布到专栏</el-radio
          >
          <div style="margin-left: 130px" v-if="isColumn">
            <el-select
              v-model="chooseColumn"
              class="m-2"
              placeholder="请选择专栏"
              size="large"
            >
              <el-option
                v-for="item in columnList"
                :key="item.value"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </div>
        </div>
        <div class="commit">
          <button class="commit-button" @click="handleClick">发布</button>
        </div>
      </div>
      <div class="clear-box"></div>
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { DomEditor } from '@wangeditor/editor'
import {
  onBeforeMount,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  reactive
} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Plus } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getAllTopicRequest,
  getUserAllColumn,
  createArticle,
  getUserArticle,
  updateArticle
} from '@/service/user/user'
import { useStore } from 'vuex'
export default {
  components: { Editor, Toolbar, Plus },
  props: ['placeholder'],
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const article_id = route.params.id
    const userId = store.state.login.userInfo.id
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        const toolbar = DomEditor.getToolbar(editorRef.value)
        console.log(editorRef.value)
        console.log(toolbar.getConfig())
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
      const toolbar = DomEditor.getToolbar(editorRef.value)
      console.log(editorRef.value)
      console.log(toolbar)
    })
    const toolbarConfig = {
      excludeKeys: []
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
    const onChange = () => {
      // const content = editor.getHtml()
      // //   const contentStr = JSON.stringify(content)
      // console.log(content)
      // const container = document.querySelector('#content')
      // container.innerHTML = content
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const imageUrl = ref('')
    const handleCoverSuccess = (res) => {
      console.log(res)
      imageUrl.value = res.data.url
    }

    const topic_name = ref('')
    let topicList = null
    onBeforeMount(async () => {
      const res = await getAllTopicRequest()
      topicList = res.map((item) => {
        return { id: item.id, value: item.topic_name }
      })
      // 如果是编辑文章
      if (article_id) {
        getUserArticle(article_id).then((res) => {
          console.log(res)
          artitleTitle.value = res.title
          htmlValue.value = res.content
          imageUrl.value = res.cover_url
          const topic_id = res.topic_id
          console.log(topicList)
          const topicName = topicList.find((item) => item.id == topic_id)
          topic_name.value = topicName.value
          if (res.column_id) {
            chooseColumn.value = res.column_id
          }
        })
      }
    })
    const querySearch = async (queryString, cb) => {
      let res = topicList
      if (queryString) {
        res = topicList.filter((item) => item.value.includes(queryString))
      }
      cb(res)
    }

    const isColumn = ref('')
    const column_id = ref('')
    const columnList = reactive([])
    const chooseColumn = ref('')
    console.log(userId)
    getUserAllColumn(userId).then((res) => {
      res.forEach((item) => {
        columnList.push(item)
      })
    })
    const artitleTitle = ref('')
    const handleClick = async () => {
      const title = artitleTitle.value
      const content = editorRef.value.getHtml()
      const cover_url = imageUrl.value
      const to = topicList.find((item) => item.value == topic_name.value)
      const topic_id = to.id + ''
      const column_id = chooseColumn.value + ''
      if (!article_id) {
        // 新建文章
        const res = await createArticle({
          title,
          content,
          topic_id,
          cover_url,
          column_id
        })
        router.push(`/article/${res.id}`)
      } else {
        // 更新文章
        const res = await updateArticle(article_id, {
          title,
          content,
          topic_id,
          cover_url,
          column_id
        })
        console.log(res)
        router.push(`/article/${article_id}`)
      }
    }

    const htmlValue = ref('')

    return {
      editorRef,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      onChange,
      handleCoverSuccess,
      imageUrl,
      querySearch,
      topic_name,
      isColumn,
      column_id,
      columnList,
      chooseColumn,
      artitleTitle,
      handleClick,
      htmlValue
    }
  }
}
</script>

<style scoped>
.editor-box {
  position: relative;
}
.box {
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  border-bottom: 1px solid rgba(18, 18, 18, 0.08);
  width: 70%;
  margin-left: 210px;
  background-color: white;
}
.title-box {
  margin-left: 210px;
}
.inpu-title {
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  margin-top: 10px;
  box-sizing: border-box;
  width: 82%;
  height: 50px;
  font-size: 30px;
  font-weight: 700;
  outline: none;
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgba(18, 18, 18, 0.08);
}
.footer {
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  box-sizing: border-box;
  padding: 20px;
  height: 450px;
  width: 70%;
  margin-left: 210px;
  background-color: white;
}
.footer-title {
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
}

.upload-cover {
  display: flex;
  align-items: center;
  /* width: 178px; */
  height: 178px;
  margin-bottom: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.topic {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.commit {
  display: flex;
  justify-content: flex-end;
}
.commit-button {
  margin-right: 20px;
  display: inline-block;
  padding: 0 46px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-radius: 3px;
  color: #fff;
  background-color: #06f;
}
.clear-box {
  height: 100px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed grey;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 1s;
}

.avatar-uploader .el-upload:hover {
  border-color: skyblue;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
