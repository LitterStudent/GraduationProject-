import { formatUtcString } from '@/utils/date-format'
import { App } from 'vue'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formateDate(value: string) {
      return formatUtcString(value)
    }
  }
}
