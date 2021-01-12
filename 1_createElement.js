/**
 * 这是 JSX 格式
 **/
// const element = (
// 	<div id='foo'>
// 		<a>bar</a>
// 		<b />
// 	</div>
// )
// const container = document.getElementById('root')
// ReactDOM.render(element, container)

/**
 * 用 createElement 函数替换 JSX
 **/
// const element = React.createElement(
// 	'div', // tagName
// 	{ id: 'foo' }, // props
// 	React.createElement('a', null, 'bar'), // children
// 	React.createElement('b')
// )

/**
 * react element 实际上可以简单看作是一个拥有 type 和 props 属性的对象
 * 所以，我们 createElement 函数中唯一需要的就是创建这个对象
 **/
// function createElement(type, props, ...children) {
// 	return {
// 		type,
// 		props: {
// 			...props,
// 			children
// 		}
// 	}
// }

/**
 * children 数组除了 dom 元素之外，还可以包括一些基本类型的值
 * 我们用一个特殊类型 TEXT_ELEMENT 来把这些不是对象子节点给包装成对象类型
 * 其实在 react 代码中是不会去把这些基本类型或者空节点包装成对象的，这里这样做只是为了简化后续代码
 **/
// function createElement(type, props, ...children) {
// 	return {
// 		type,
// 		props: {
// 			...props,
// 			children: children.map(child =>
// 				typeof child === 'object'
// 					? child
// 					: createTextElement(child)
// 			)
// 		}
// 	}
// }
//
// function createTextElement(text) {
// 	return {
// 		type: 'TEXT_ELEMENT',
// 		props: {
// 			nodeValue: text,
// 			children: []
// 		}
// 	}
// }

/**
 * 最后我们使用我们自己的 createElement 方法替换 React.createElement 方法
 * 并将自己的库名命为 Didact
 **/
// function createElement(type, props, ...children) {
// 	return {
// 		type,
// 		props: {
// 			...props,
// 			children: children.map(child =>
// 				typeof child === "object"
// 					? child
// 					: createTextElement(child)
// 			)
// 		}
// 	}
// }
//
// function createTextElement(text) {
// 	return {
// 		type: 'TEXT_ELEMENT',
// 		props: {
// 			nodeValue: text,
// 			children: []
// 		}
// 	}
// }
//
// const Didact = {
// 	createElement,
// }
//
// const element = Didact.createElement(
// 	'div',
// 	{ id: 'foo' },
// 	Didact.createElement('a', null, 'bar'),
// 	Didact.createElement('b')
// )
// const container = document.getElementById('root')
// ReactDOM.render(element, container)

/**
 * 如果告诉编译器使用 Didact.createElement 来代替 React.createElement，我们只需要加上下面的注释
 **/
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

function createTextElement(text) {
	return {
		type: 'TEXT_ELEMENT',
		props: {
			nodeValue: text,
			children: []
		}
	}
}

const Didact = {
	createElement,
}

/** @jsx Didact.createElement */
const element = (
	<div id='foo'>
		<a>bar</a>
		<b />
	</div>
)
const container = document.getElementById('root')
ReactDOM.render(element, container)
