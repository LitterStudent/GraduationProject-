import { IForm } from '@/base-ui/from/type'
export const modalconfig: IForm = {
  itemStyle: {},
  colLayout: {
    span: 24
  },
  formItems: [
    {
      field: 'rank_num',
      type: 'input',
      label: '排行名次',
      placeholder: '请输入排行名次'
    },
    {
      label: '封面图片',
      slotName: 'picture',
      field: 'cover_url'
    },
    {
      field: 'question_name',
      type: 'select',
      label: '问题名称',
      placeholder: '请选择问题名称',
      options: []
    }
  ]
}
