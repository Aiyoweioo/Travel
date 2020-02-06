<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="handleLetterClick"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>

</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      // touch标识位，只有在handleTochStart完成后才能完成handleTouchMove的内容
      touchStatus: false,
      startY: 0, // 获取A字母距离顶部的高度
      timer: null // 节流，减少handleTouchMove计算次数
    }
  },
  computed: {
    // 构建出一个字母数组
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      // console.log(letters)
      return letters // ['A', 'B', 'C']
    }
  },
  updated () {
    // value是固定的，一旦alphabet第一次渲染成功，就不会改变
    this.startY = this.$refs['A'][0].offsetTop // 不同设备不一致，不带单位
  },
  methods: {
    // 监听字母点击事件，向父组件传值
    handleLetterClick (e) {
      // console.log(e.target.innerText)
      this.$emit('change', e.target.innerText)
    },
    // 手指触碰开始
    handleTouchStart () {
      this.touchStatus = true
    },
    // 触碰事件处理
    handleTouchMove (e) {
      if (this.touchStatus) {
        /*
          获取对应的字母
          1.获取A字母距离顶部的高度
          2.获取滑动时距离顶部的高度
          3.根据（滑动时距离顶部的高度-A字母距离顶部的高度）/单个字母的高度,计算当前具体是哪一个字母
        */
        // console.log(this.$refs['A']) 得到[li.item][0]: li.item
        // const startY = this.$refs['A'][0].offsetTop 在这些会造成每次渲染都会计算一次，性能低
        // console.log(startY) // iphone6/7/8 74 iphone6/7/8plus 109，不同设备不一致，不带单位
        // clientY：鼠标在页面上可视区域的位置-(header组件的高度+search组件的高度，根据styls设置的rem算出不同设备是一致的)
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
      }
    },
    // 手指触碰结束
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .list
      display: flex
      flex-direction: column
      justify-content: center
      position: absolute
      top: 1.58rem
      right: 0
      bottom: 0
      width: .4rem
      .item
        text-align: center
        line-height: .4rem
        color: $bgColor
</style>
