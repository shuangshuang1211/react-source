import diff from "./diff"
export default function render (virtualDom, container, oldDom = container.firstChild) {
  diff(virtualDom, container, oldDom)
}