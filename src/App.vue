<template>
  <div id="app">
    <WeatherInput @search="searchForWeather" />
    <WeatherDisplayer :forecast="forecast" />
  </div>
</template>

<script>
import {getCurrentWeather, getWeatherForecast} from './util/Api';
import WeatherInput from './components/WeatherInput.vue'
import WeatherDisplayer from './components/WeatherDisplayer.vue'

export default {
  name: 'App',
  data: () => ({
    forecast: {},
  }),
  components: {
    WeatherInput,
    WeatherDisplayer,
  },
  mounted() {
    // fetch forecast for position
  },
  methods: {
    async searchForWeather(city) {
      const currentWeatherResponse = await getCurrentWeather(city);
      const forecastResponse = await getWeatherForecast(currentWeatherResponse.id)
      this.forecast = forecastResponse;
    },
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*, *:before, *:after {
  box-sizing: border-box;
}
</style>
