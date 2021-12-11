// 获取最外层container
const container = document.getElementById('root');
// 构建最外层rootFiber
const rootWorkInProgress = {
  stateNode: container,
  props: {
    children: [...] // React.CreateElement('typeName', {}, ...children)
  }
}

// 空闲时间执行Fiber对象的构建
requestIdleCallback(workLoop);


let nextUnitOfWork = rootWorkInProgress;

function workLoop (deadline) {
  // 构建Fiber，深度遍历优先
  while (nextUnitOfWork && deadline.timeRemaing() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // nextUnitOfWork 为null的时候则构建Fiber完成，进行Dom操作，即提交阶段
  if (!nextUnitOfWork) {
    commitRoot()
  }
}

function performUnitOfWork(workInProgress) {
  // 创建当前Fiber节点的DOM对象并保存在stateNode中
  // 构建子级Fiber对象
  // 构建向下阶段
  beginWork(workInProgress)
  if (workInProgress.child) {
    return workInProgress.child
  }

  // 构建向上阶段
  while (workInProgress) {
    // 构建Fiber链表
    commpleteUnitOfWork(workInProgress);

    // 有同级返回同级，没有同级则退回到父级，找父级的同级，...
    if (workInProgress.sibling) {
      return workInProgress.sibling;
    }
    workInProgress = workInProgress.return
}

function beginWork(workInProgress) {
  // 当前Fiber没有statNode则创建DOm节点
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createElement(workInProgress.type);
    for (let attr of props) {
      if (attr !== 'children') {
        workInProgress.stateNode[attr] = props[attr]
      }
    }
  }
  // 构建子级Fiber
  const workInProgressChildren = workInProgress.props.children
  if (Array.isArray(workInProgressChildren)) {
    let prevFiber = null;
    workInProgressChildren.forEach((child, index) => {
      const currChildFiber = {
        type: child.type,
        props: child.props,
        effectTag: 'PLACEMENT',
        return: workInProgress, // 当前子级的父级
      }
      if (index === 0) { // 第一个子是父的子
        workInProgress.child = currChildFiber;
      } else {
        prevFiber.sibling = currChildFiber;
      }
      prevFiber = currChildFiber;
    })
  }
}

function commpleteUnitOfWork(workInProgress) {
  // 开始创建Fiber链表
  let workParentFiber = workInProgress.return;
  if (workParentFiber) {
    // 链头上移
    if (!workParentFiber.firstEffect) {
      workParentFiber.firstEffect = workInProgress.firstEffect;
    }
    // lastEffect上移
    if (!workParentFiber.lastEffect) {
      workParentFiber.lastEffect = workInProgress.lastEffect;
    }

    // 构建链表
    if (workInProgress.effectTag) {
      if (workParentFiber.lastEffect) {
        workParentFiber.lastEffect.nextEffect = workInProgress;
      } else {
        // 第一次操作，即Fiber是在最左下的节点(c1)才执行这里
        workParentFiber.firstEffect = workInProgress;
      }
      workParentFiber.lastEffect = workInProgress;
    }
  }

}

function commitRoot() {
  // Fiber的工作的第二阶段，执行真实DOM操作
  let currFiberNode = rootWorkInProgress.firstEffect;
  while (currFiberNode) {
    currFiberNode.return.stateNode.appendChild(currFiberNode.stateNode)
    currFiberNode = currFiberNode.nextEffect
  }
}