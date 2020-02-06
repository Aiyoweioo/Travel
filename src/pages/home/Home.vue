<template>
  <div>
    <home-header/>
    <home-swiper :swiperList="swiperList"/>
    <home-icons :iconList="iconList"/>
    <home-recommend :recommendList="recommendList"/>
    <home-weekend :weekendList="weekendList"/>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  mounted () {
    console.log('mounted')
    this.getHomeInfo()
  },
  data () {
    return {
      // city: '', 存储在store
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: [],
      lastCity: '' // 上一次的城市名称
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getHomeInfo () {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      console.log(res)
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  activated () {
    console.log('activated')
    // 如果上次的城市名称与修改的城市名称不一致，则发送axios请求
    if (this.lastCity !== this.city) {
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>
<style>
</style>
