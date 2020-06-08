const express = require('express') //express 服务
const bodyParser = require('body-parser') // 处理请求过来的body内容
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware') // webpack dev中间件
const webpackHotMiddleware = require('webpack-hot-middleware') // webpack 热加载中间件
const webpackConfig = require('./webpack.config') // 获取webpack 配置

const app = express();
const compiler = webpack(webpackConfig);

// 把webpack运行的结果放到express中运行
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
// 热加载
app.use(webpackHotMiddleware(compiler))
// 设置静态文件目录
app.use(express.static(__dirname))
// 用来解析json格式的中间件
app.use(bodyParser.json())
// 用来解析body中的urlencoded字符中间件，只支持utf-8的编码的字符
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

///simple/get请求
router.get('/simple/get',function(req,res){
    res.json({msg:'hello world'}); // 返回体内容为json格式的字符串
})

app.use(router)

//获取端口，并启动服务
const port = process.env.PORT || 8080;
module.exports = app.listen(port,()=>{
    console.log(`服务已启动，地址 http://localhost:${port}`)
});