<template>
  <div class="">
    <template v-for="item in answerList" :key="item.user_name">
      <user-avatar :item="item"></user-avatar>
      <rich-content :item="item"></rich-content>
    </template>
  </div>
  <h2>this is recomment</h2>
</template>

<script>
import RichContent from '../cpns/rich_content.vue'
import UserAvatar from './cpns/user_avatar.vue'
export default {
  components: {
    RichContent,
    UserAvatar
  },
  setup() {
    const answerList = [
      {
        title: `2021年中国结婚人口763.6万对，再减少50万，接续会怎么办？`,
        user_name: '李博悌回答了该问题-1小时前',
        writer_name: '李博悌',
        writer_avatar_url:
          'https://pic1.zhimg.com/9478b8318b2d6cbc774144483b4ac13e_s.jpg?source=3af55fa1',
        writer_headline: '朝圣山下,知识所向',
        content:
          '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害...',
        favorite_num: '2499',
        comment_num: '344'
      },
      {
        title: '土耳其最有名的作家是谁？',
        user_name: '林空鹿饮溪：编写了文章-1小时前',
        writer_name: '林空鹿饮溪',
        writer_avatar_url:
          'https://pic3.zhimg.com/v2-b6a12971b65f882a30c0f0cd5217df51_xs.jpg?source=32738c0c',
        writer_headline: '朝圣山下,知识所向',
        content:
          '说到有名，沙法克和帕慕克当仁不让是最具人气的土耳其作家。这两位从小接受精英教育，外语流利，可以用英语写作、演讲、授课，在全球拥有大量读者。沙法克和帕慕克的部分作品已翻译成中文。不过，国内对这两位小说家的介绍还不是很多...',
        favorite_num: '2499',
        comment_num: '344',
        cover_url:
          'https://pic4.zhimg.com/80/v2-dcce2c71f6423e596a511e24c82c1e83_720w.jpg'
      },
      {
        title: '为什么美国新冠确诊几千万，国家还没崩掉？',
        user_name: '李博悌',
        content:
          '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
        favorite_num: '2499',
        comment_num: '344'
      },
      {
        title: '为什么美国新冠确诊几千万，国家还没崩掉？',
        user_name: '李博悌',
        content:
          '坚决支持汽车清零众所周知，车祸是全世界人员伤亡的很大一个原因，根据世界卫生组织统计，全球每年有大约135万人死于道路交通事故，俄罗斯乌克兰打仗两个月，死亡的军人加起来可能不到3万，而全世界每24秒就有人因交通事故丧命，还有2000万至5000万人受到非致命伤害。',
        favorite_num: '2499',
        comment_num: '344'
      },
      {
        title: '为什么有人认为新冠病毒是美国的生物战？',
        user_name: '小桥流水',
        content:
          '如果不能以最大的恶意揣测美国，那我们总有一天会死得很惨。      还记得03年非典吗？02年底发现第一例，03年初爆发，同年3月，第二次海湾战争爆发。这次让果子狸背了锅。    19年，中美贸易战白热化，武汉爆发新冠肺炎，这次又让蝙蝠背锅。   2022年，俄乌战争爆发，资本出逃欧洲，中美都是资本避险的首选。可巧合的是，香港上海这两座国际化程度高的城市相继大爆发。。',
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
      }
    ]
    return {
      answerList
    }
  }
}
</script>

<style></style>
