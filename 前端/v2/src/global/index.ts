import type { App } from 'vue'
import { registerElement } from './register-element'
import registerProperties from './register-properties'

export function GolbalRegister(app: App): void {
  registerElement(app)
  registerProperties(app)
  // registerOther
}
