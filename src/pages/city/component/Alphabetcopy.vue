<template>
  <ul class="list">
    <li
      class="item"
    >
     A 
    </li>
    <li
      class="item"
    >
     A 
    </li>
    <li
      class="item"
    >
     A 
    </li>
    <li
      class="item"
    >
     A 
    </li>
  </ul>

</template>

<script>
export default {
  name: 'CityAlphabetCopy',
  props: {
    cities: Object
  },
  data () {
    return {
      // touch标识位，只有在handleTochStart完成后才能完成handleTouchMove的内容
      touchStatus: false
    }
  },
  computed: {
    // 构建出一个字母数组
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters // ['A', 'B', 'C']
    }
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
    handleTouchMove () {
      if (this.touchStatus) {
        /*
          获取对应的字母
          1.获取A字母距离顶部的高度
          2.获取滑动时距离顶部的高度
          3.根据（滑动时距离顶部的高度-A字母距离顶部的高度）/单个字母的高度,计算当前具体是哪一个字母
        */
        const startY = this.$refs['A'][0].offsetTop
        console.log(startY)
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
