import updateNodeElement from "./updateNodeElement"
import mountElement from "./mountElement"

export default function createDomElement (virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 普通元素节点
    newElement = document.createElement(virtualDOM.type)
    // 更新节点属性等
    updateNodeElement(newElement, virtualDOM)
  }

  newElement._virtualDom = virtualDOM

  // 递归创建子节点
  if (virtualDOM.children) {
    virtualDOM.children.forEach(child => {
      mountElement(child, newElement)
    })
  }


  return newElement
}