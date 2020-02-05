<template>
  <div>
    <city-header/>
    <city-search :cities="cities"/>
    <city-list
    :hotCities="hotCities"
    :cities="cities"
    :letter="letter"/>
    <city-alphabet
    :cities="cities"
    @change="this.handleLetterChange"/>
  </div>
</template>

<script>
import CityHeader from './component/Header'
import CitySearch from './component/Search'
import CityList from './component/List'
import CityAlphabet from './component/Alphabet'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      hotCities: [],
      cities: {},
      letter: ''
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  mounted () {
    this.getCityInfo()
  },
  methods: {
    // 获取城市数据事件
    getCityInfo () {
      axios.get('/static/mock/city.json')
        .then(this.handleGetCityInfoSucc)
    },
    // 成功获取数据事件
    handleGetCityInfoSucc (res) {
      console.log(res)
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
        this.cities = data.cities
      }
    },
    // 监听点击右侧字母事件
    handleLetterChange (letter) {
      // console.log(letter)
      this.letter = letter
    }
  }
}
</script>
<style>
</style>
