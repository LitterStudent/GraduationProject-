import { IForm } from '@/base-ui/from/type'
export const formconfig: IForm = {
  labelWidth: 120,
  formItems: [
    {
      label: 'id',
      type: 'input',
      field: 'id',
      placeholder: '请输入查询id'
    },
    {
      label: '分类名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入分类名称'
    }
  ],
  itemStyle: {
    padding: `10px 50px`
  }
}
