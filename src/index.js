// import React from 'react'
// import ReactDOM from 'react-dom'

// 用于生成元素，将 html 标签转为 对象
function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child =>
				typeof child === "object"
					? child
					: createTextElement(child)
			)
		}
	}
}

// 当元素的 children 是基本类型的时候，将其 type 设置为常量 TEXT_ELEMENT
function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: []
		}
	}
}

function createDom(fiber) {
	const dom =
		element.type === 'TEXT_ELEMENT' // 判断是否是基础类型
			? document.createTextNode('')
			: document.createElement(element.type)

	const isProperty = key => key !== 'children' // 取出 props 中不是 children 的部分
	Object.keys(element.props) // 将 props 中除了 children 的部分同步到真实的 dom 上
		.filter(isProperty)
		.forEach(name => {
			dom[name] = element.props[name]
		})

	return dom
}

// 用于将 createElement 生成的对象变成 dom 并渲染到 container 里
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
	while (nextUnitOfWork && !shouldYield) { // 有下一个工作单元且不需要生产
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

const Didact = {
	createElement,
	render,
}

/** @jsx Didact.createElement */
const element = (
	<div id='foo'>
		<a>bar</a>
		<b />
	</div>
)

const container = document.getElementById('root')
Didact.render(element, container)

