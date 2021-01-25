/**
 * 一旦我们开始 rendering，我们在整个 react element 树递归完成之前都不能停止
 * 如果元素树过于庞大，这个渲染过程将会占用主线程过长时间
 * 如果此时浏览器需要完成一些高响应操作，如用户输入或运行动画特效，将会在渲染完成前产生卡顿
 * 因此，我们把工作拆成一个个小的单元，每个单元工作完成后我们超看一下浏览器是否有更重要的工作，如果有那就打断当前的渲染循环
 **/
let nextUnitOfWork = null

function workLoop(deadline) {
	let shouldYield = false
	while (nextUnitOfWork && !shouldYield) {
		nextUnitOfWork = performUnitOfWork(
			nextUnitOfWork
		)
		shouldYield = deadline.timeRemaining() < 1
	}
}

/**
 * requestIdleCallback 浏览器api
 * 可以将其理解为近似于 setTimeout 类似的功能，指把任务放置在当前微任务最后
 * 但是不同的是 requestIdleCallback 会在浏览器主线程空闲的时候执行回调函数，而不是和 setTimeout 一样指定一个执行时间
 * react 不再使用 requestIdleCallback 它在 scheduler package 中实现了和 requestIdleCallback 一样的功能
 * requestIdleCallback 同时给我们提供了一个 deadline 参数，我们可以用它来确认在浏览器接管线程前我们到底有多少时间
 */
requestIdleCallback(workLoop)

/**
 * performUnitOfWork 函数除了执行一个小单元的工作外，还需要返回下一个需要被执行的单元工作
 */
function performUnitOfWork(nextUnitOfWork) {
	//TODO
}

