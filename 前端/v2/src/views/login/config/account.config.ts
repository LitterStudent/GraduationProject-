export const rules = {
  email: [
    {
      required: true,
      message: '用户名是必填的',
      trigger: 'blur'
    }
    // },
    // {
    //   pattern: /^[a-z0-9]{5,10}$/,
    //   msssage: '用户名必须5到10数字或字母',
    //   trigger: 'blur'
    // }
  ],
  password: [
    {
      required: true,
      message: '密码是必填的',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      msssage: '密码必须5到10数字或字母',
      trigger: 'blur'
    }
  ]
}
