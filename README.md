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