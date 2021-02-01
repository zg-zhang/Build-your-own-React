/**
 * 为了更好的实现单元工作 unit of work 我们需要引入名为 fiber 的数据解构
 * 每一个 react element 都将对应一个 fiber 结构，每一个 fiber 结构都对应一个单元的工作
 */

/**
 * 在 render 中我们需要创建 root fiber 根 fiber
 * 然后再 nextUnitOfWork 中设置它，剩下的工作将在 performUnitOfWork 函数中完成，我们将对每一个 fiber 节点做三件事
 * 1. 把 react element 渲染到 dom 上
 * 2. 给 react element 子节点创建 fiber 节点
 * 3. 选择下一个单元工作
 */

/**
 * fiber 结构的一个重要的目标是非常容易找到下一个单元工作，这也是为什么每一个 fiber 节点都有指向第一个节点和相邻节点以及父节点的链接
 * 当我们完成在 fiber 上面的工作后，fiber 拥有 child 属性可以直接指向下一个需要进行工作的 fiber 节点
 * 如果 fiber 节点没有子节点（即没有 child 属性）我们使用 sibling 属性（兄弟节点）作为下一个工作单元
 * 当 fiber 节点没有子节点也没有兄弟节点的时候，我们去找他的叔叔节点（父节点的兄弟节点）
 * 如果 fiber 的父节点也没有兄弟节点，我们继续往上找父节点直到根节点。
 * 当我们找到根节点的时候，也意味着在这一次 render 我们完成了所有的工作
 */

function createDom(fiber) {
	const dom =
		fiber.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(fiber.type)

	const isProperty = key => key !== "children"
	Object.keys(fiber.props)
		.filter(isProperty)
		.forEach(name => {
			dom[name] = fiber.props[name]
		})

	return dom
}

function render(element, container) {
	nextUnitOfWork = {
		dom: container,
		props: {
			children: [element]
		}
	}
}

let nextUnitOfWork = null

function workLoop(deadline) {
	let shouldYield = false
	while (nextUnitOfWork && !shouldYield) {
		nextUnitOfWork = performUnitOfWork(
			nextUnitOfWork
		)
		shouldYield = deadline.timeRemaining() < 1
	}
	requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDom(fiber)
	}

	if (fiber.parent) {
		fiber.parent.dom.appendChild(fiber.dom)
	}

	const elements = fiber.props.children
	let index = 0
	let prevSibling = null

	while (index < elements.length) {
		const element = elements[index]
		// 创建新 fiber
		const newFiber = {
			type: elements.type,
			props: elements.props,
			parent: fiber,
			dom: null,
		}
		// 根据是否为第一个节点，添加到对应的 child / sibling 上面
		if (index === 0) {
			fiber.child = newFiber
		} else {
			prevSibling.sibling = newFiber
		}

		prevSibling = newFiber
		index++
	}

	if (fiber.child) {
		return fiber.child
	}
	let nextFiber = fiber
	while (nextFiber) {
		if (nextFiber.sibling) {
			return newFiber.sibling
		}
		nextFiber = newFiber.parent
	}
}

