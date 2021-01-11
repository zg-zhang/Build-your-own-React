/**
 * react 的基本概念可以总结如下
 **/
// const element = <h1 title='foo'>Hello</h1>
// const container = document.getElementById('root')
// ReactDom.render(element, container)

/**
 * 现在我们将 JSX 格式的代码转为 react 方法的 js 格式
 **/
// const element = React.createElement(
// 	"h1", // tagName
// 	{ title: 'foo' }, // props
// 	"Hello" // children
// )

/**
 * 然后我们替换掉 react 部分的代码
 * 可以将 element 的值可以简单看作是一个拥有 type 和 props 的 key 的对象
 * 其他全部属性可以在这里查看：https://github.com/facebook/react/blob/f4cc45ce962adc9f307690e1d5cfa28a288418eb/packages/react/src/ReactElement.js#L111
 **/
// const element = {
// 	type: "h1", // tagName
// 	props: {
// 		title: 'foo',
// 		children: 'Hello'
// 	}, // props
// }

/**
 * 另外一个 react 相关代码需要替换的是 ReactDom.render
 * render 函数将 react 转换为 dom，现在我们自己来实现这个转换过程
 **/
// const node = document.createElement(element.type)
// node["title"] = element.props.title
//
// const text = document.createTextNode("")
// text["nodeValue"] = element.props.children
//
// node.appendChild(text)
// container.appendChild(node)

/**
 * 现在我们就有了一个去掉所有 react 相关代码，但是与刚开始功能一直的 demo 应用了
 **/
const element = {
	type: "h1", // tagName
	props: {
		title: 'foo',
			children: 'Hello'
	}, // props
}

const container = document.getElementById('root')

const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("")
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)
