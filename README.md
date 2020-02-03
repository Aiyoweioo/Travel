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