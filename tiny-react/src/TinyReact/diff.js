import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"
import unmountNode from "./unmountNode"

export default function diff (virtualDom, container, oldDom) {
  console.log('diff_virtualDom', virtualDom, oldDom)
  const oldVirtualDOM = oldDom && oldDom._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  if (!oldDom) {
    // 首次渲染挂载
    mountElement(virtualDom, container)
  } else {
    // 对比新旧节点并更新
    if (
      // 如果要比对的两个节点类型不相同
      virtualDom.type !== oldVirtualDOM.type &&
      // 并且节点的类型不是组件 因为组件要单独处理
      typeof virtualDom.type !== "function"
    ) {
      // 不需要对比
      // 使用新的 virtualDOM 对象生成真实 DOM 对象
      const newElement = createDOMElement(virtualDom)
      // 使用新的 DOM 对象替换旧的 DOM 对象
      oldDom.parentNode.replaceChild(newElement, oldDom)
    } else if (typeof virtualDom.type === 'function') {
      // 更新组件
    } else if (oldVirtualDOM && virtualDom.type === oldVirtualDOM.type) {
      if (virtualDom.type === "text") {
        // 更新内容
        updateTextNode(virtualDom, oldVirtualDOM, oldDom)
      } else {
        // 更新元素节点属性
        updateNodeElement(oldDom, virtualDom, oldVirtualDOM)
      }
    }
  }

  // 删除节点
  // 获取旧节点
  let oldChildNodes = oldDom.childNodes
  // 判断旧节点的数量
  if (oldChildNodes.length > virtualDom.children.length) {
    // 有节点需要被删除
    for (
      let i = oldChildNodes.length - 1;
      i > virtualDOM.children.length - 1;
      i--
    ) {
      unmountNode(oldChildNodes[i])
    }
  }
}