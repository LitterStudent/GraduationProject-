<template>
  <div class="index">
    <div class="title">{{ me }}的动态</div>
    <div class="action-inco">
      赞同了回答 <span style="margin-left: 460px"> 2022-04-12 18:36</span>
    </div>
    <rich-content v-bind:item="answerList[0]" :user="user"></rich-content>
    <div class="action-inco">
      赞同了文章 <span style="margin-left: 460px"> 2022-04-11 12:30</span>
    </div>
    <rich-content v-bind:item="answerList[1]" :user="user"></rich-content>
  </div>
</template>

<script>
import RichContent from '../cpns/rich_content.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
  components: { RichContent },
  setup() {
    const store = useStore()
    const route = useRoute()
    const pageUserId = route.params.id
    const LoginUserId = store.state.login.userInfo.id
    const me = pageUserId == LoginUserId ? ref('我') : ref('他')

    const answerList = [
      {
        title: '我国芯片行业要多久才可以赶上美国？',
        user_name: '李博悌',
        content:
          '我就不匿了，没什么好隐藏的。 以前就职一家上海的日企，日本全资的企业，它主要销售日本以及美国的高端仪器，主打产品是镭射头（激光），他最常见的作用就是刻电脑版。 这东西一台超贵，精密度高的中国没有，需要进口，我们卖的是美国进口的。 当时我一入职就看到了两台，同事说这个东西美国对中国进行封锁，所以是不卖到中国的，涉及到国家机密，就算你是中国的外资企业也买不到，我们是通过特殊渠道引进的，好像是辗转日本、香港才弄到的...',
        favorite_num: '2499',
        comment_num: '344'
      },
      {
        title: '深圳有什么有特色好去处？',
        user_name: '小桥流水',
        content:
          '来深8年，去了很多地方，有的是故地重游，有的是意外收获。 现在，我把深圳最好玩、最有特色的24个地方整理出来，分享给大家。 万字长文，吐血整理，建议点赞收藏。 想找深圳周末好去处，看这一篇足够了。 一、4个绝美海滩 求求你，不要再去梅沙体验“煮饺子”了。 我就纳闷了...',
        favorite_num: '219',
        comment_num: '342'
      },
      {
        title: '体制内狗腿但又不聪明的人结局如何？',
        user_name: '灯芯道人',
        content:
          '县局单位有一名退役军人安置的事业编人员，三十多岁，脑满肥肠，已经完全看不出军人的样子了。 这人有点亲戚背景，所以被领导安排到了股长的位置上。',
        favorite_num: '149',
        comment_num: '38'
      },
      {
        title: `2021年中国结婚人口763.6万对，再减少50万，接续会怎么办？`,
        user_name: '李博悌',
        content:
          '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
        favorite_num: '2499',
        comment_num: '344'
      },
      {
        title: '2021年中国结婚人口763.6万对，再减少50万，接续会怎么办？',
        user_name: '林空鹿饮溪：',
        content:
          '后续会咋办? rev前夜快来了呗 最近走访了城市边缘的几个工地，鸽子笼已经盖到山脚下了，两三公里漂亮的硬化路面上，光大型商业综合体和星级酒店看见了好几个，唯一一处稍微有人气的地方就是学校，酒店闲着，购物中心闲着，大门紧锁了好几年了，只有工地仍在一往无前继续忙活，你要是问有没有人住',
        favorite_num: '2499',
        comment_num: '344',
        cover_url:
          'https://pica.zhimg.com/50/v2-089f95585185e9854768890cd8c50870_720w.jpg?source=1940ef5c'
      },
      {
        title: '为什么美国新冠确诊几千万，国家还没崩掉？',
        user_name: '李博悌',
        content:
          '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
        favorite_num: '2499',
        comment_num: '344'
      }
    ]
    const user = {
      avatar_url:
        'http://localhost:3000/uploads/upload_e011c7ac8235738d092a199fd4416164.jpg',
      name: 'Musician',
      line: '快来和我一起讨论吧'
    }
    return {
      answerList,
      user,
      me
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
.action-inco {
  margin-top: 20px;
  margin-left: 20px;
  color: #8590a6;
  font-size: 14px;
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
