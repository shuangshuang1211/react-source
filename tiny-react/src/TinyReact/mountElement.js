import mountComponent from "./mountComponent"
import mountNativeElement from "./mountNativeElement"

export function isFunction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === "function"
}
export default function mountElement (virtualDom, container, oldDom) {
  if (isFunction(virtualDom) ) {
    // 是组件的虚拟dom
    mountComponent(virtualDom, container, oldDom)
  } else {
    // 原生的html标签
    mountNativeElement(virtualDom, container, oldDom)
  }
}