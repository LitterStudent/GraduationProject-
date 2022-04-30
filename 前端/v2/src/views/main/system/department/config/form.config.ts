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
      label: '部门名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入部门名称'
    },
    {
      label: '部门领导',
      type: 'input',
      field: 'leader',
      placeholder: '请输入领导名称'
    }
  ],
  itemStyle: {
    padding: `10px 50px`
  }
}
