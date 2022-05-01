export const tableconfig = {
  header: {
    title: '文章列表',
    createBtn: '新建文章'
  },
  propList: [
    { prop: 'title', label: '文章标题', minWidth: '100' },
    { prop: 'username', label: '用户昵称', minWidth: '60' },
    { prop: 'topic_name', label: '所属话题', minWidth: '60' },
    {
      prop: 'content',
      label: '回答内容',
      minWidth: '100',
      slotName: 'content'
    },
    { prop: 'pageviews', label: '浏览量', minWidth: '50' },
    { prop: 'comment_num', label: '评论数量', minWidth: '50' },
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
