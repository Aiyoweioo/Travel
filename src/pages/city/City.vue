<template>
  <div>
    <city-header/>
    <city-search/>
    <city-list/>
    <city-alphabet/>
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
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  }
}
</script>
<style>
</style>
