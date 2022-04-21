<template>
  <div class="answer">
    <div class="title">{{ me }}的回答</div>
    <template v-if="answerList.length > 0">
      <rich-content
        v-for="item in answerList"
        :key="item.id"
        :item="item"
        :user="user"
        @click="handleClick(item)"
      ></rich-content
    ></template>
    <template v-else> <div class="none-box">还没有任何回答</div></template>
  </div>
</template>

<script>
import RichContent from '../cpns/rich_content.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import { getUserAllAnswer, getUserInfo } from '@/service/user/user'
export default {
  components: {
    RichContent
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')
    // const answerList1 = [
    //   {
    //     title: '为什么美国新冠确诊几千万，国家还没崩掉？',
    //     user_name: '李博悌',
    //     content:
    //       '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   },
    //   {
    //     title: '为什么有人认为新冠病毒是美国的生物战？',
    //     user_name: '小桥流水',
    //     content:
    //       '如果不能以最大的恶意揣测美国，那我们总有一天会死得很惨。      还记得03年非典吗？02年底发现第一例，03年初爆发，同年3月，第二次海湾战争爆发。这次让果子狸背了锅。    19年，中美贸易战白热化，武汉爆发新冠肺炎，这次又让蝙蝠背锅。   2022年，俄乌战争爆发，资本出逃欧洲，中美都是资本避险的首选。可巧合的是，香港上海这两座国际化程度高的城市相继大爆发。。',
    //     favorite_num: '219',
    //     comment_num: '342'
    //   },
    //   {
    //     title: '体制内狗腿但又不聪明的人结局如何？',
    //     user_name: '灯芯道人',
    //     content:
    //       '县局单位有一名退役军人安置的事业编人员，三十多岁，脑满肥肠，已经完全看不出军人的样子了。 这人有点亲戚背景，所以被领导安排到了股长的位置上。',
    //     favorite_num: '149',
    //     comment_num: '38'
    //   },
    //   {
    //     title: `2021年中国结婚人口763.6万对，再减少50万，接续会怎么办？`,
    //     user_name: '李博悌',
    //     content:
    //       '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   },
    //   {
    //     title: '2021年中国结婚人口763.6万对，再减少50万，接续会怎么办？',
    //     user_name: '林空鹿饮溪：',
    //     content:
    //       '后续会咋办? rev前夜快来了呗 最近走访了城市边缘的几个工地，鸽子笼已经盖到山脚下了，两三公里漂亮的硬化路面上，光大型商业综合体和星级酒店看见了好几个，唯一一处稍微有人气的地方就是学校，酒店闲着，购物中心闲着，大门紧锁了好几年了，只有工地仍在一往无前继续忙活，你要是问有没有人住',
    //     favorite_num: '2499',
    //     comment_num: '344',
    //     cover_url:
    //       'https://pica.zhimg.com/50/v2-089f95585185e9854768890cd8c50870_720w.jpg?source=1940ef5c'
    //   },
    //   {
    //     title: '为什么美国新冠确诊几千万，国家还没崩掉？',
    //     user_name: '李博悌',
    //     content:
    //       '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   }
    // ]
    const answerList = reactive([])
    const user = reactive({
      avatar_url: '',
      name: '',
      line: ''
    })
    getUserAllAnswer(pageUserId).then((res) => {
      res.forEach((item) => {
        answerList.push(item)
      })
    })
    getUserInfo(pageUserId).then((res) => {
      user.avatar_url = res.user.avatar_url
      user.name = res.user.username
      user.line = res.user.headline
    })
    const handleClick = (item) => {
      window.open(`/#/question/${item.question_id}/answer/${item.id}`)
    }
    return {
      answerList,
      user,
      me,
      handleClick
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  height: 50px;
  font-weight: 600;
  padding: 2px 20px 2px 20px;
  border-bottom-color: rgb(240, 242, 247);
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
.none-box {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(133, 144, 166);
  font-size: 16px;
}
</style>
