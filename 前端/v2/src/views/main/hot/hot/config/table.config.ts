export const contentTableConfig = {
  header: {
    title: '问题排行榜',
    createBtn: '新增排行'
  },
  propList: [
    {
      prop: 'rank_num',
      label: '排行名次',
      minWidth: '100'
    },
    {
      prop: 'cover_url',
      label: '封面',
      minWidth: '200',
      slotName: 'cover'
    },
    {
      prop: 'question_name',
      label: '问题名称',
      minWidth: '200'
    },
    {
      label: '创建时间',
      minWidth: '180',
      slotName: 'createAt'
    },
    {
      label: '更新时间',
      minWidth: '180',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
