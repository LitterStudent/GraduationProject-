<template>
  <div class="hdform">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.value">
          <el-col v-bind="colLayout" v-if="!item.isHidden" :style="itemStyle">
            <el-form-item :label="item.label" :rules="item.rules">
              <template v-if="item.type === 'input'">
                <el-input
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelModel($event, item.field)"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  show-password
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelModel($event, item.field)"
                  v-bind="item.otherOptions"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelModel($event, item.field)"
                  v-bind="item.otherOptions"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'dateselect'">
                <el-date-picker
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handelModel($event, item.field)"
                  type="datetime"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                >
                </el-date-picker>
              </template>
              <template v-else-if="item.slotName == 'picture'">
                <el-upload
                  action="/api/upload"
                  :show-file-list="false"
                  :on-success="handleCoverSuccess"
                >
                  <el-image
                    style="width: 70px; height: 70px"
                    :src="modelValue[`${item.field}`]"
                  ></el-image>
                </el-upload>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IFormItem } from '../type'
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      // 默认是响应式
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(prop, { emit }) {
    const handelModel = (value: string, field: string) => {
      emit(`update:modelValue`, { ...prop.modelValue, [field]: value })
    }
    const handleCoverSuccess = (res: any) => {
      console.log(res)
      emit(`update:modelValue`, {
        ...prop.modelValue,
        avatar_url: res.data.url
      })
    }
    return { handelModel, handleCoverSuccess }
  }
})
</script>

<style lang="less" scoped>
.hdform {
  background-color: #fff;
  padding: 20px;
}
</style>
