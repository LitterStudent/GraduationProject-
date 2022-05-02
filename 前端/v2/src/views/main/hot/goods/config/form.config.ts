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
      label: '商品名称',
      type: 'input',
      field: 'name',
      placeholder: '请输入商品名称'
    },
    {
      label: '商品描述',
      type: 'input',
      field: 'description',
      placeholder: '请输入商品描述'
    },
    {
      label: '商品状态',
      type: 'select',
      field: 'status',
      placeholder: '请输入商品状态',
      options: [
        { label: '正常', value: '正常' },
        { label: '下架', value: '下架' }
      ]
    },
    {
      label: '地址',
      type: 'input',
      field: 'address',
      placeholder: '请输入地址'
    }
  ],
  itemStyle: {
    padding: `10px 50px`
  }
}
