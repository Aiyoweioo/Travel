export default {
  // 修改城市名称
  changeCity (state, city) {
    state.city = city
    try {
      if (localStorage.city) {
        localStorage.city = city
      }
    } catch (e) {}
  }
}
