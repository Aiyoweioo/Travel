# travel

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# css文件
- reset.css 解决所有客户端浏览一致问题
- border.css 解决移动端像素边框的问题，不同设备的物理像素和逻辑像素的比例关系不一致
- 移动端三百毫秒延迟的问题 npm install --save fastclick 在main.js进行绑定
- stylus编写css代码 npm install stylus-loader  stylus --save
- reset: 1 rem = html font-size = 50px ,.header设置height: 43px则stylus应该设置为.86rem
- 设置stylus变量，保存全局背景色, 在alias写css时import需要加~
## 首页轮播图
 - npm install --save vue-awesome-swiper@2.6.7
 - 防止页面图片还没出现， 出现抖动， 需要根据图片设置宽高比 width: 100%; height: 0;padding-bottom: 31.25%;设置31.25%是因为图片640*200， 宽高比就是31.25%，不能直接设置高度， 因为height是根据父容器的高度
## ajax
- 实现本地测试，方便未来线上接口转换
```
proxyTable: {
      '/api': {
        target: 'http://localhost: 8080',
        pathRewrite: {
          '^api': '/static/mock'
        }
      }
```
## 城市列表布局
### better-scroll
- npm install better-scroll --save
- 问题：解决滚动List中常见的滚动
  + 外层list不自动扩充content内容区高度问题
    - 解决1：将当前外层list包裹的内容固定处理，在外层添加样式：使用absolution绝对定位好原先的布局结构，再使用hidden不显示不包裹的内容 === 此时页面动不了说明达到效果了
    - 解决2：用npm安装better-scroll插件,首先需要用到的页面导入BS,然后在外层list引入一个ref='名字',其次使用mounted监听挂载页面，最后在mounted内部获取列表
  + 报错点：引用BS时页面仍然无法滚动
    - 解决：注意BS插件的对象要求，最外层假设为wrapper，内层就是很多列表，这些列表就应该统一被一个content的div包裹,即可解决
