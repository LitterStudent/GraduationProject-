export const contentTableConfig = {
  header: {
    title: '话题列表',
    createBtn: '新建话题'
  },
  propList: [
    {
      prop: 'topic_name',
      label: '话题名称',
      minWidth: '100'
    },
    {
      prop: 'introduction',
      label: '话题介绍',
      minWidth: '120'
    },
    {
      prop: 'avatar_url',
      label: '话题图片',
      minWidth: '120',
      slotName: 'picture'
    },
    {
      prop: 'question_num',
      label: '问题数量',
      minWidth: '50'
    },
    {
      prop: 'article_num',
      label: '文章数量',
      minWidth: '50'
    },
    { prop: 'status', label: '状态', slotName: 'enable' },
    { prop: 'created_at', label: '创建时间', slotName: 'createAt' },
    { prop: 'updated_at', label: '更新时间', slotName: 'updateAt' },
    { label: '操作', minWidth: '160', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
  // childrenProps: {
  //   rowKey: 'id',
  //   treeProp: {
  //     children: 'children'
  //   }
  // },
  // showFooter: false
}
