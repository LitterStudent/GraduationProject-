import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallbackFn = (item?: any) => void
export function usePageModal(updateCb?: CallbackFn, createCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref<any>({})
  const handleUpdate = (item: any) => {
    // console.log(pageModalRef)
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
      defaultInfo.value = { ...item }
      // console.log(defaultInfo)
    }
    updateCb && updateCb(item)
  }
  const handleCreate = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    createCb && createCb()
  }
  return [pageModalRef, defaultInfo, handleCreate, handleUpdate]
}
