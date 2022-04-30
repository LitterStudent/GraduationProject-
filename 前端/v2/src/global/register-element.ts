import { App } from 'vue'
// import 'element-plus/lib/theme-chalk/base.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRadio,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElTree,
  ElCard
} from 'element-plus'
const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElOption,
  ElSelect,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElTree,
  ElCard
]
import {
  ArrowDown,
  Avatar,
  Calendar,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  CloseBold,
  Close,
  ChatLineSquare,
  Fold,
  Warning
} from '@element-plus/icons-vue'
export function registerElement(app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  app.component(ArrowDown.name, ArrowDown)
  app.component(Avatar.name, Avatar)
  app.component(Calendar.name, Calendar)
  app.component(Monitor.name, Monitor)
  app.component(Setting.name, Setting)
  app.component(Goods.name, Goods)
  app.component(ChatLineRound.name, ChatLineRound)
  app.component(Expand.name, Expand)
  app.component(CloseBold.namem, CloseBold)
  app.component(Close.name, Close)
  app.component(ChatLineSquare.name, ChatLineSquare)
  app.component(Fold.name, Fold)
  app.component(Warning.name, Warning)
}
