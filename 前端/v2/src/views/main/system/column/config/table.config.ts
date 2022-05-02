export const tableconfig = {
  header: {
    title: '专栏列表',
    createBtn: '新建回答'
  },
  propList: [
    { prop: 'title', label: '专栏标题', minWidth: '100' },
    { prop: 'username', label: '所属用户昵称', minWidth: '60' },
    {
      prop: 'description',
      label: '专栏内容',
      minWidth: '100'
    },
    { prop: 'follow_num', label: '关注人数', minWidth: '50' },
    { prop: 'article_num', label: '文章数量', minWidth: '50' },
    { prop: 'favorite_num', label: '点赞数量', minWidth: '50' },
    { prop: 'status', label: '状态', slotName: 'enable' },
    { prop: 'created_at', label: '创建时间', slotName: 'createAt' },
    { prop: 'updated_at', label: '更新时间', slotName: 'updateAt' },
    { label: '操作', minWidth: '170', slotName: 'handler' }
  ],
  showIndexColumn: true,
  // showSelectColumn: true,
  showFooter: true
}
