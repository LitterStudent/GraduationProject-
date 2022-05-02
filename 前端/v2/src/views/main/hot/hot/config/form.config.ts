import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 120,
  formItems: [
    {
      label: '问题名词',
      type: 'input',
      field: 'question_name',
      placeholder: '请输入问题名词'
    },
    {
      label: '排行名次',
      type: 'input',
      field: 'rank_num',
      placeholder: '请输入排行名次'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请输入状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ],
  itemStyle: {
    padding: `10px 50px`
  }
}
