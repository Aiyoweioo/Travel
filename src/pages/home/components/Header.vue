<template>
  <div class="header">
      <div class="header-left">
          <div class="iconfont back-icon">&#xe624;</div>
      </div>
      <div class="header-input">
          <span class="iconfont">&#xe632;</span>
          输入城市/景点/游玩主题
      </div>
      <router-link to='/city'>
        <div class="header-right">
          {{this.city}}
          <span class="iconfont arrow-icon">&#xe64a;</span>
        </div>
      </router-link>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'CityHeader',
  computed: {
    ...mapState(['city'])
  }
}
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .header
        line-height: $headerHeight
        display: flex
        background-color: $bgColor
        color: #fff
        .header-left
            width: .64rem
            float: left
            .back-icon
                text-align: center
                font-size: .4rem
        .header-input
            flex: 1
            background-color: #fff
            border-radius: .1rem
            margin-top: .12rem
            margin-left: .2rem
            line-height: .64rem
            height: .64rem
            color: #ccc
            padding-left: .2rem
        .header-right
            min-width: 1.04rem
            padding: 0 .1rem
            float: right
            text-align: center
            color: #fff
            .arrow-icon
                font-size: .24rem
                margin-left: -.04rem
</style>
