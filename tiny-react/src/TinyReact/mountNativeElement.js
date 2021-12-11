import createDomElement from "./createDomElement";
import unmountNode from "./unmountNode";

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  let newElement = createDomElement(virtualDOM)
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }
  if (oldDOM) {
    unmountNode(oldDOM)
  }
}