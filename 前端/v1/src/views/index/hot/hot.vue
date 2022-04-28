<template>
  <!-- <h2>this is hot</h2> -->
  <div class="hot">
    <div class="hot-item" v-for="item in list" :key="item.sort">
      <div class="item-sort">{{ item.sort }}</div>
      <div class="item-content">
        <h2 class="content-title">{{ item.title }}</h2>
        <p class="content-description">{{ item.description }}</p>
      </div>
      <div class="item-cover">
        <img
          style="width: 100%; height: 100%; border-radius: 4px"
          :src="item.cover_url"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const list = [
      {
        sort: '1',
        title:
          '外交部回应卡拉奇大学孔子学院班车遭遇恐怖袭击，「中国人的血不能白流」，后续有哪些信息值得关注？袭击，「中国人的血不能白流」，后续有哪些信息值得关注？袭击，「中国人的血不能白流」，后续有哪些信息值得关注？',
        description:
          '外交部发言人就卡拉奇大学孔子学院班车遭遇恐怖袭击答记者问：据报道，卡拉奇大学孔子学院班车遭遇自杀式恐怖袭击，请你介绍有关情况和中方采取的应对措施。',
        cover_url:
          'https://pica.zhimg.com/80/v2-ae34d717076b85783f4ab9ff9109090f_400x224.png'
      },
      {
        sort: '2',
        title:
          '4 月 26 日上海新增本土「1606+11956」，死亡 48 例，目前疫情情况如何？',
        description:
          '上海市卫健委今早（27 日）通报：2022 年 4 月 26 日 0—24 时，新增本土新冠肺炎确诊病例 1606 例和无症状感染者 11956 例，其中 1253 例确诊病例为此前无症状感染者转归，340 例确诊病例和 11798 例无症状感染者在隔离管控中发现，其余在相关风险人群排查中发现。',
        cover_url:
          'https://pic3.zhimg.com/80/v2-01306cfbbb78a527ee0be2567aad7cd8_400x224.png'
      },
      {
        sort: '3',
        title:
          '11  岁女儿不肯读书，爸爸带她烈日下挖 4 小时藕体验父辈日常劳作。你支持这种教育方式吗？',
        description:
          '4 月 24 日，湖北咸宁，当事人叶先生称，孩子 11 岁在叛逆期不肯读书，就烈日当头时候带她河里去挖藕尖，让她体验她父亲和爷爷的日常劳作，足足晒了 4 个小时，脸都晒脱皮了。',
        cover_url:
          'https://pic3.zhimg.com/80/v2-ef3f1f520a6052481c3f2822a70bf94c_400x224.png'
      },
      {
        sort: '4',
        title:
          '东部战区新闻发言人就美 「桑普森」号导弹驱逐舰过航台湾海峡发表谈话，还有哪些信息值得关注？',
        description:
          '东部战区新闻发言人就美「桑普森」号导弹驱逐舰过航台湾海峡发表谈话 东部战区新闻发言人施毅陆军大校表示，4 月 26 日，美「桑普森」号导弹驱逐舰过航台湾海峡并公开炒作。中国人民解放军东部战区组织兵力全程跟监警戒。美频频实施此类挑衅行径，向「台独」势力发出错误信号，蓄意破坏台海和平稳定',
        cover_url:
          'https://pic3.zhimg.com/80/v2-38f348ad606516dd193c90c2ae7cacbf_400x224.png'
      },
      {
        sort: '5',
        title: '如何看待网易云音乐诉腾讯音乐不正当竞争？胜诉的概率有多大？',
        description:
          ' 月 27 日，网易云音乐宣布就腾讯音乐不正当竞争行为正式提起司法诉讼程序，起诉腾讯音乐通过非法盗播歌曲、批量化冒名洗歌等一系列措施实行不正当竞争的行为。 ​​ 网易云说：国内在线音乐已艰难至此，就不要把功夫下在邪道上了',
        cover_url:
          'https://pic2.zhimg.com/80/v2-1902420b2680435f076cfd46fb6f4839_400x224.png  '
      },
      {
        sort: '6',
        title: '美媒炒作「推特被马斯克收购后会受中国操纵」，如何看待这种说法？',
        description:
          '自美国特斯拉公司 CEO 马斯克以 440 亿美元的价格收购社交媒体公司推特的消息传出后，他会对推特公司带来哪些改变就成了美国网民、媒体和名人重点关注的话题。然而，一些靠蹭中国热度在美国网络上赚取关注的人，却把这件本来与中国没有任何关联的事情，又强行和中国扯到了一起。 如下图所示，《纽约时报》报道中国话题的记者傅才德（Mike Forsythe）在 26 日',
        cover_url:
          'https://pic3.zhimg.com/80/v2-5c5d0ca1c1f28df48c40d3b925eec8d4_400x224.jpg?source=1940ef5c'
      }
    ]
    return {
      list
    }
  }
}
</script>

<style scoped>
.hot-item {
  width: 100%;
  min-height: 120px;
  padding: 16px 16px 0 0;
  display: flex;
  border-bottom: rgb(235, 235, 235) solid 1px;
}
.item-sort {
  padding: 0 17px;
  color: rgb(255, 163, 143);
  font-size: 18px;
  font-weight: 600;
}
.content-title {
  font-size: 18px;
  line-height: 28px;
  max-height: 56px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 600;
}
.content-description {
  padding: 5px 0;
  line-height: 25px;
  margin-top: 2px;
  min-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-content {
  width: 640px;
  padding-right: 10px;
}
.item-cover {
  width: 190px;
  height: 105px;
}
</style>
