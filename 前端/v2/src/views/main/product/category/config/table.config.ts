export const contentTableConfig = {
  header: {
    title: '商品分类列表',
    createBtn: '新建分类'
  },
  propList: [
    {
      prop: 'name',
      label: '分类名称',
      minWidth: '100'
    },
    {
      label: '创建时间',
      minWidth: '280',
      slotName: 'createAt'
    },
    {
      label: '更新时间',
      minWidth: '280',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
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
