<template>
  <div>
    <city-header/>
    <city-search/>
  </div>
</template>

<script>
import CityHeader from './component/Header'
import CitySearch from './component/Search'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    CityHeader,
    CitySearch
  }
}
</script>
<style>
</style>
