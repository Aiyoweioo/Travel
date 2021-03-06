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
```js
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
### 点击字母进行跳转到对应的区域
- 调用better-scroll提供的scrollToElement方法
- 参数要求是DOM元素或者DOM选择器，即可直接跳转到对应的区域
- 先alphabet组件使用emit将点击的字母的值letter传给父组件city
- city再使用props属性传递给子组件list
- list监听letter变化
```js
this.$refs[this.letter]得到的是数组
const element = this.$refs[this.letter][0]
this.scroll.scrollToElement(element)
```
### 字母滑动到对应区域
- pageY、clientY、offsetY的区别
  1. 参考链接：https://blog.csdn.net/qq_34911465/article/details/82468652
  2. pageY：鼠标在页面上的位置,从页面左上角开始,即是以页面为参考点,不随滑动条移动而变化；
  3. clientY：鼠标在页面上可视区域的位置,从浏览器可视区域左上角开始,即是以浏览器滑动条此刻的滑动到的位置为参考点；
  4. offsetY：IE特有,鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值
- 获取对应的字母
  1. 获取A字母距离顶部的高度
  2. 获取滑动时距离顶部的高度
  3. 根据（滑动时距离顶部的高度-A字母距离顶部的高度）/单个字母的高度,计算当前具体是哪一个字母
```js
 const startY = this.$refs['A'][0].offsetTop
  // console.log(startY) // iphone6/7/8 74 iphone6/7/8plus 109，不同设备不一致，不带单位
  // clientY：鼠标在页面上可视区域的位置-(header组件的高度+search组件的高度，根据styls设置的rem算出不同设备是一致的)
  const touchY = e.touches[0].clientY - 79
  const index = Math.floor((touchY - startY) / 20)
  // console.log(index) // 0 1 2
  if (index >= 0 && this.letters.length) {
    this.$emit('change', this.letters[index]) // 获取到具体的字母传递给父组件city
  }
```
### 列表性能优化
- this.$refs['A'][0].offsetTop 
  1. value是固定的，一旦alphabet第一次渲染成功，就不会改变
  2. 若在methods，会造成每次渲染都会计算一次，性能低，改成在updated()生命周期和函数
- move节流
  1. 手指移动页面时move频率是非常高的，通过节流限制函数执行的频率
```js
// 设置一个刷新标志
if (this.timer) {
          clearTimeout(this.timer)
        }
        // 16ms再去执行
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          // console.log(index) // 0 1 2
          if (index >= 0 && this.letters.length) {
            this.$emit('change', this.letters[index]) // 获取到具体的字母传递给父组件city
          }
        }, 16)
```
### 搜索框功能实现
- 根据输入值显示搜索结果
- 解决搜索关键词为空，页面还存在搜索结果的问题
- 解决由于搜索出来的关键词过多，不能滚动的问题
- 若找不到匹配结果，则显示提示

### Vuex
- city页和首页数据通信
- 解决选中某个城市，下次再访问这个网站时，还是上次那个城市的问题-》》localStorage
- localStorage:在外层包裹一个try catch,在某些浏览器，若用户关闭localStorage或者使用隐身模式，使用localStorage会抛出异常

### detail页下的轮播图
- 当swiper的父元素或者自身发生变化时，需要自我刷新一次
- 需要设置swiper的observeParents和observer为true,，不然宽度会出现问题

### 对全局事件的解绑
- 对组件绑定window监听事件，需要在组件隐藏的时候解除绑定window监听事件
```js
  activated () {
    window.addEventListener('scroll', this.handleScroll)
  },
  disactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  },
```
### 递归组件实现detail-list
```
<div v-if="item.children" class="item-children">
  <detail-list :categoryList="item.children"/>
</div>
```
### component组件name的作用
- 递归组件
- keep-alive取消缓存的时候

### 拖动多个页面会相互影响
- 在vue-router设置scrollBehavior,每次路由切换的时候返回到页面顶部

### webpack通过IP地址的访问
webpack默认不能通过ip地址的访问，在package.json修改：脚本的"dev"里添加--host 0.0.0.0

### 在城市页上下拖动右侧字母出现上侧空白的bug
这是因为alphabet组件在计算移动时，没有阻止touchStart的默认行为，需要添加事件修饰符，touchstart.prevent

### babel-polyfill解决不能兼容promise的问题
- 某些浏览器没有promise特性，会造成屏幕白屏
- npm install babel-polyfill --save
- babel-polyfill自动检测若浏览器没有promise，则自动添加es6的新特性

### 异步组件实现按需加载
#### build打包后的文件
- app.js文件：各页面的逻辑代码，主要是异步组件
- map后缀文件: sourcemap文件，调试被压缩过的代码，如css.map, js.map
- manifest.js文件：webpack打包后的配置文件
- vendor.js文件： 各页面各组件公用的代码
#### 当访问某个页面的时候不需要加载另外一个页面的内容
- 当app.js很大达到几Mb时，才使用异步加载，进行多次axios，否则有可能多次axios的代价会更高
-  component: Home => import('@/pages/home/Home.vue')
