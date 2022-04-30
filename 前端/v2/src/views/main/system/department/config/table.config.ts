export const contentTableConfig = {
  header: {
    title: '部门列表',
    createBtn: '新建部门'
  },
  propList: [
    {
      prop: 'name',
      label: '部门名称',
      minWidth: '100'
    },
    {
      prop: 'leader',
      label: '权限介绍',
      minWidth: '120'
    },
    {
      prop: 'parentId',
      label: '上级部门',
      minWidth: '120'
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
