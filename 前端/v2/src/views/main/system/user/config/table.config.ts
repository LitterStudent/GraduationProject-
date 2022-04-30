export const tableconfig = {
  header: {
    createBtn: '新建用户',
    title: '用户列表'
  },
  propList: [
    { prop: 'username', label: '用户昵称' },
    { prop: 'gender', label: '用户性别', slotName: 'gender' },
    { prop: 'phone', label: '手机号码' },
    { prop: 'email', label: '邮箱地址' },
    { prop: 'business', label: '所处行业' },
    { prop: 'location', label: '居住地' },
    { prop: 'status', label: '状态', slotName: 'enable' },
    { prop: 'created_at', label: '创建时间', slotName: 'createAt' },
    { prop: 'updated_at', label: '更新时间', slotName: 'updateAt' },
    { label: '操作', slotName: 'handler', minWidth: '150' }
  ],
  showSelectColumn: true,
  showIndexColumn: true
}
