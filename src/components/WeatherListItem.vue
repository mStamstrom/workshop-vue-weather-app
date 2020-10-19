<template>
  <div>
    <span class="title">{{dayForecast.day}}</span>
    <div class="forecast-list">
      <button v-for="weather in dayForecast.list" :key="weather.dt" @click="onChangeSelectedForecast(weather)" class="forecast-button">
        <span>
          {{ weather.time }}
        </span>
        <span>
          {{ Math.round(weather.main.temp) }}°
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import {getForecastsByDay} from '../util/WeatherDisplayerHelper';

export default {
  name: 'Weather-list-item',
  props: {
    dayForecast: Object,
    changeSelectedForecast: Function,
    day: String,
  },
  computed: {
    getForecastsByDay() {
      return getForecastsByDay(this.forecast.list);
    },
  },
  methods: {
    onChangeSelectedForecast(selectedForecast) {
      this.$emit('changeSelectedForecast', selectedForecast);
    }
  }
}
</script>

<style scoped>
  button {
    cursor: pointer;
  }

  .forecast-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-right: 30px;
  }
  .title {
    color: white;
  }
</style>