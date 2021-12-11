export default function updateNodeElement (newElement, virtualDom, oldVirtualDom = {}) {
  const newProps = virtualDom.props || {}
  const oldProps = oldVirtualDom.props|| {}
  Object.keys(newProps).forEach((propName) => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    if (newPropValue !== oldPropValue) {
      // 事件属性 onChange -> change
      if (propName.slice(0,2) === 'on') {
        const eventName = propName.slice(2).toLowerCase()
        // 为新元素添加新的事件
        newElement.addEventListener(eventName, newPropValue)
        if (oldPropValue) {
          // 删除原有的事件
          newElement.removeEventListener(eventName, oldPropValue)
        }
      } else if (propName === "value" || propName === "checked") {
        // checked \ value
        newElement[propName] = newPropValue
      } else if (propName !== "children") { // 排除children属性
        if (propName === "className") {  // className
          newElement.setAttribute("class", newPropValue)
        } else {
          newElement.setAttribute(propName, newPropValue)
        }
      }
    }
  })

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach((propName) => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    if (!newPropValue) {
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}