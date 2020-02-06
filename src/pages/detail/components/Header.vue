<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <div class="iconfont header-abs-back">&#xe624;</div>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to='/'>
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      showAbs: true, // 隐藏固定标题的标志
      opacityStyle: {
        opacity: 0 // 标题渐变值
      }
    }
  },
  activated () {
    window.addEventListener('scroll', this.handleScroll)
  },
  disactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      // 获取当前滑动距离顶部的距离
      const top = document.documentElement.scrollTop
      // 若滑动距离顶部的距离在60-140px之间，才显示固定标题
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = {opacity}
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header-abs
    position: absolute
    left: .2rem
    top: .2rem
    width: .8rem
    height: .8rem
    line-height: .8rem
    text-align: center
    border-radius: .4rem
    background: rgba(0, 0, 0, .8)
    .header-abs-back
      color: #ffffff
      font-size: .4rem
  .header-fixed
    z-index: 2
    overflow: hidden
    position: fixed
    left: 0
    right: 0
    top: 0
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    color: #fff
    background: $bgColor
    font-size: .32rem
    .header-fixed-back
      position: absolute
      width: .64rem
      text-align: center
      font-size: .4rem
      top: 0
      left: 0
      color: #fff
</style>
