<template>
  <div class="recommend">
    <template v-for="item in answerList" :key="item.user_name">
      <rich-content :item="item" @click="handleClick(item)"></rich-content>
    </template>
  </div>
</template>

<script>
import RichContent from '../cpns/rich_content.vue'
import { getIndexRecomment } from '@/service/user/user'
import { reactive } from 'vue-demi'
export default {
  components: {
    RichContent
  },
  setup() {
    // const answerList = [
    //   {
    //     title:
    //       '如何看待沪指跌超 5% 失守 3000 点，760 多只个股跌停？受哪些因素影响？',
    //     user_name: 'Bruce761',
    //     content:
    //       '宝剑锋从磨砺出，梅花香自苦寒来。经历过次贷危机、熔断后的A股更加成熟、稳健。党的十八大以来，中国特色社会主义发展进入新阶段。为适应新时代新要求，A股推行全面注册制改革，支持长线资金入市，引导价值投资理念...',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   },
    //   {
    //     title:
    //       '山东舰副舰长说航母会向公众开放，如果有机会参观，你会以怎样的心情登上山东舰？',
    //     user_name: '时生',
    //     content:
    //       '我不是军迷。比小白还小白。 为了避免上去以后只会说：好漂亮！好牛逼！好厉害！ ……等等以上无脑的话，我争取在上去之前恶补一下相关知识。 求题主普及相关知识…',
    //     favorite_num: '219',
    //     comment_num: '342'
    //   },
    //   {
    //     title: '古代人晚上的生活是怎样的？',
    //     user_name: '灯芯道人',
    //     content:
    //       '说说我六十年前十岁前后的经历。 冬天，五点多天黑，大人也收工回来了。北方农村那时侯以农田基本建设为主，六四年后学大寨更无冬闲，就春节前后十…',
    //     favorite_num: '149',
    //     comment_num: '38'
    //   },
    //   {
    //     title: `上海官宣封城已经大半个月了，身在上海的你现在是什么心态了？`,
    //     user_name: '李博悌',
    //     content:
    //       ' 非常乐观，甚至期待烟花绽放的状态。个人比较希望可以封更久一点，比如1-2年。因为这可能是95后和00后为数不多的翻身机会。 大家不困惑吗，社…',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   },
    //   {
    //     title: '中国有哪些引以为傲的发明？',
    //     user_name: '道朗马泰尔:',
    //     content:
    //       '没有负面词语的新时代简中语言。 从此再没有衰退，萎缩，下降，低迷，停滞，颓势这类不好听，灭自己威风的说法。 负增长就是增长的一种情况，只要在…',
    //     favorite_num: '2499',
    //     comment_num: '344',
    //     cover_url:
    //       'https://pica.zhimg.com/50/v2-089f95585185e9854768890cd8c50870_720w.jpg?source=1940ef5c'
    //   },
    //   {
    //     title: '如何应对明年全球范围的粮食危机?',
    //     user_name: '阿砍:',
    //     content:
    //       '关于粮食，很早之前我就预言过一定会出现粮食危机，粮食一定会成为好的投机标的 但这个粮食危机，并不是因为缺少粮食总量 而是一群掌控媒体的邪恶国家和种…',
    //     favorite_num: '2499',
    //     comment_num: '344'
    //   }
    // ]
    const answerList = reactive([])
    getIndexRecomment(1).then((res) => {
      res.forEach((item) => {
        answerList.push(item)
      })
    })
    const handleClick = (item) => {
      if (item.cover_url) {
        // 文章
        window.open(`/#/article/${item.id}`)
      } else {
        // 回答
        window.open(`/#/question/${item.question_id}/answer/${item.id}`)
      }
    }
    return {
      answerList,
      handleClick
    }
  }
}
</script>

<style scoped></style>
