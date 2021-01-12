/**
 * 这是 ReactDOM.render 方法
 **/
// ReactDOM.render(element, container)

/**
 * 现在我们开始改写 ReactDOM.render 方法
 * 现在我们只考虑往 document 上面添加元素，但不考虑更新或删除元素
 * 我们可以通过递归来完成所有子节点的添加
 **/
// function render(element, container) {
// 	const dom = document.createElement(element.type)
// 	element.props.children.forEach(child =>
// 		render(child, dom)
// 	)
// 	container.appendChild(dom)
// }

/**
 * 当然这里我们也需要单独处理基本类型的元素
 * 如果 type 为 TEXT_ELEMENT 我们需要单独为其创建一个文本节点
 **/
// function render(element, container) {
// 	const dom =
// 		element.type === 'TEXT_ELEMENT'
// 			? document.createTextNode('')
// 			: document.createElement(element.type)
// 	element.props.children.forEach(child =>
// 		render(child, dom)
// 	)
// 	container.appendChild(dom)
// }

/**
 * 最后我们需要把 react element 上的 props 同步到真实的 dom 元素上
 **/
function render(element, container) {
	const dom =
		element.type === 'TEXT_ELEMENT'
			? document.createTextNode('')
			: document.createElement(element.type)
	const isProperty = key => key !== 'children'
	Object.keys(element.props)
		.filter(isProperty)
		.forEach(name => {
			dom[name] = element.props[name]
		})
	element.props.children.forEach(child =>
		render(child, dom)
	)
	container.appendChild(dom)
}
