<template>
  <div class="question-header">
    <el-card class="box-card">
      <template #>
        <div class="question-header-content">
          <div class="question-header-main">
            <div class="question-header-tag">
              <span>俄罗斯</span>
            </div>
            <h1 class="question-header-title">
              如何评价俄罗斯黑海舰队旗舰「莫斯科号」导弹巡洋舰，在拖拽过程中沉没？
            </h1>
            <div class="question-header-text">
              <span id="spantext">
                当地时间14日，俄罗斯国防部表示，俄黑海舰队“莫斯科”号导弹巡洋舰在被拖往目的地港口的过程中，船身失去稳定性，在狂风大浪中沉没。俄罗斯国防部此前证实，…
              </span>
              <button
                v-if="!isShowAll"
                class="question-header-button"
                @click="handleShowAll"
              >
                显示全部
              </button>
            </div>
          </div>
          <div class="question-header-side">
            <div class="question-header-follow">
              <div class="question-header-follower">关注者</div>
              <strong class="question-header-follow-num">1555</strong>
            </div>
            <div class="question-header-browse">
              <div class="question-header-follower">被浏览</div>
              <strong class="question-header-follow-num">4,159,852</strong>
            </div>
          </div>
        </div>
        <div class="question-hader-footer">
          <el-button type="primary">关注问题</el-button>
          <el-button type="primary" plain>
            <el-icon style="margin-right: 5px"><edit-pen /></el-icon>写回答
          </el-button>
          <button
            v-if="isShowAll"
            class="question-header-button"
            @click="handleShowPart"
          >
            收起
          </button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import { EditPen } from '@element-plus/icons-vue'
import { ref } from '@vue/reactivity'
export default {
  components: {
    EditPen
  },
  setup() {
    const isShowAll = ref(false)
    const formatStr =
      '当地时间14日，俄罗斯国防部表示，俄黑海舰队“莫斯科”号导弹巡洋舰在被拖往目的地港口的过程中，船身失去稳定性，在狂风大浪中沉没。俄罗斯国防部此前证实，…'
    const str =
      '<p data-first-child="">据央视新闻消息，4月14日，江苏苏州市召开新冠肺炎疫情防控新闻发布会。苏州市委常委、市政府常务副市长顾海东通报：<br><br>张家港近期突发聚集性疫情，塘桥镇一家家具厂出现了员工及其家属之间的扩散传播，姑苏、相城、工业园区等地陆续在社会面筛查中发现阳性感染者，尤其是姑苏区火车站周边地区，外省市来苏州的暂留人群中出现了多例阳性感染者，隐匿传播风险较大。<br><br>鉴于上述情况，为有效阻断疫情蔓延，迅速切断传播链条，降低疫情传播风险，切实保障广大人民群众生命安全和身体健康，苏州市及时调整升级了一些管控措施，部分地区严格实施分类分区的差异化静态管理，鼓励有条件的企业和社会组织居家办公，除了保障市民生活和城市基本运行之外的所有聚集活动一律取消，并全力保障居民生活物资供应。这些举措的目的，就是要进一步让城市慢下来、静下来、停下来，尽快遏制疫情扩散蔓延。</p>'
    const handleShowAll = () => {
      const span = document.querySelector('#spantext')
      span.innerHTML = str
      isShowAll.value = true
    }
    const handleShowPart = () => {
      const span = document.querySelector('#spantext')
      span.innerHTML = formatStr
      isShowAll.value = false
    }
    return {
      handleShowAll,
      isShowAll,
      handleShowPart
    }
  }
}
</script>

<style scoped>
.question-header-content {
  display: flex;
  justify-content: flex-start;
  padding-left: 220px;
}
.question-hader-footer {
  margin-top: 10px;
  padding-left: 240px;
}
.question-header-tag {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #06f;
  border-radius: 100px;
  background-color: rgba(0, 102, 255, 0.1);
  padding: 0 12px;
}
.question-header-main {
  width: 694px;
  padding-left: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.question-header-title {
  margin-top: 12px;
  margin-bottom: 4px;
}
.question-header-text {
  cursor: pointer;
}
.question-header-button {
  cursor: pointer;
  border: none;
  border-radius: 0%;
  background-color: transparent;
  color: #8590a6;
}
.QuestionHeader-side {
  width: 285px;
  flex-grow: 1;
}
.question-header-side {
  display: flex;
  margin-left: 100px;
}
.question-header-follow {
  padding-right: 25px;
  height: 50px;
  border-right: 1px solid #ebebeb;
  text-align: center;
  cursor: pointer;
}
.question-header-browse {
  padding-left: 25px;
  text-align: center;
}
.question-header-follower {
  font-size: 14px;
  color: #8590a6;
}
.question-header-follow-num {
  font-size: 18px;
  color: #121212;
  font-weight: 600;
}
.footer-follow {
  margin: 0 8px;
  color: #fff;
  background-color: #06f;
}
</style>
