export const contentTableConfig = {
  header: {
    title: '问题列表',
    createBtn: '新建问题'
  },
  propList: [
    { prop: 'question_name', label: '问题名称', minWidth: '100' },
    { prop: 'description', label: '描述', minWidth: '60' },
    { prop: 'username', label: '创建用户', minWidth: '100' },
    { prop: 'topic_name', label: '所属话题', minWidth: '100' },
    { prop: 'answer_number', label: '回答数量', minWidth: '100' },
    { prop: 'follow_number', label: '用户关注数量', minWidth: '100' },
    { prop: 'pageviews', label: '浏览数量', minWidth: '100' },
    { prop: 'status', label: '状态', slotName: 'enable' },
    { prop: 'created_at', label: '创建时间', slotName: 'createAt' },
    { prop: 'updated_at', label: '更新时间', slotName: 'updateAt' },
    { label: '操作', slotName: 'handler', minWidth: '150' }
  ],
  showIndexColumn: true,
  // showSelectColumn: true,
  showFooter: true
}
