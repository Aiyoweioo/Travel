<template>
  <div>
    <div class="search">
        <input
          class="search-input"
          type="text"
          placeholder="输入城市名或拼音"
          v-model="keyword"/>
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          v-for="item of list"
          :key="item.id"
          class="search-item border-bottom"
        >
          {{item.name}}
        </li>
        <li
          class="search-item border-bottom" v-show="hasNoData"
        >
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '', // 搜索框里的词
      list: [], // 符合keyword的city数组
      timer: null // 节流值
    }
  },
  computed: {
    // 没有找到匹配数据才显示
    hasNoData () {
      return !this.list.length
    }
  },
  watch: {
    // 监听搜索框值改变
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 解决搜索关键词为空，页面还存在搜索结果的问题
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            // 如果能从spell或者name搜索到关键字
            if (value.spell.indexOf(this.keyword) > -1 ||
              value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    // 解决由于搜索出来的关键词过多，不能滚动的问题
    this.scroll = new Bscroll(this.$refs.search)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .search
    height: .72rem
    background: $bgColor
    padding: 0 .1rem
    .search-input
      box-sizing: border-box
      padding:0 .1rem
      width: 100%
      height: .62rem
      text-align: center
      line-height: .62rem
      border-radius: .06rem
      color: #666
  .search-content
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    background: #eee
    z-index: 1
    .search-item
      line-height: .62rem
      padding-left: .2rem
      color: #666
      background: #fff
</style>
