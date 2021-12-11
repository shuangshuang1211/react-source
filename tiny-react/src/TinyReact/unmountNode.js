export default function unmountNode (nodeDom) {
  // 获取节点的 _virtualDOM 对象
  const virtualDOM = nodeDom._virtualDOM
  // 1. 文本节点可以直接删除
  if (virtualDOM.type === "text") {
    // 删除直接
    nodeDom.remove()
    // 阻止程序向下执行
    return
  }

  // 4. 看一下节点的属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === "on") {
      const eventName = propName.toLowerCase().slice(0, 2)
      const eventHandler = virtualDOM.props[propName]
      nodeDom.removeEventListener(eventName, eventHandler)
    }
  })

  // 5. 递归删除子节点
  if (nodeDom.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }
  // 删除节点
  nodeDom.remove()
}