const path = require('path')
// 内存中自动生成 html 文件
const htmlWebpackPlugin = require('html-webpack-plugin')


// 创建一个插件的实例对象
const htmlPlugin = new htmlWebpackPlugin({
	template: path.join(__dirname, "./src/index.html"), // 源文件
	filename: 'index.html' // 生成的内存中首页的名称
})

// 向外暴露一个打包的实例对象，因为webpack是基于Node构建的，所以webpack支持所有Node API和语法
// webpack 默认只能打包处理.js后缀名类型的文件，想.vue .png无法主动处理，所以要配置第三方的loader
module.exports = {
	mode: "development",
	plugins: [ htmlPlugin ],
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				use: "babel-loader",
				exclude: /node_modules/
			}
		]
	}
}
