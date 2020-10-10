<template>
  <div v-if="forecast && forecast.city" :class="backgroundClass" class="weather-displayer">
    <h1>{{forecast.city.name}}</h1>
    <div class="selected-forecast">
      <div v-if="selectedForecast">
        {{ Math.round(selectedForecast.main.temp) }}°
      </div>
    </div>
    <div class="forecast-days">
      <div v-for="dayForecast in getForecastsByDay" :key="dayForecast.dateString">
        <span>{{dayForecast.day}}</span>
        <div class="forecast-list">
          <button v-for="weather in dayForecast.list" :key="weather.dt" @click="changeSelectedForecast(weather)" class="forecast-button">
            <span>
              {{ weather.time }}
            </span>
            <span>
              {{ Math.round(weather.main.temp) }}°
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getForecastsByDay, getBackgroundClassForSelectedForecast} from '../util/WeatherListHelper';


export default {
  name: 'Weather-displayer',
  data: () => ({
    selectedForecast: undefined, // TODO: kolla om ok
  }),
  props: {
    forecast: Object,
  },
  watch: {
    forecast() {
      this.selectedForecast = this.forecast.list[0];
    }
  },
  computed: {
    backgroundClass() {
      return getBackgroundClassForSelectedForecast(this.selectedForecast)

    },
    getForecastsByDay() {
      return getForecastsByDay(this.forecast.list);
    },
  },
  methods: {
    changeSelectedForecast(forecast) {
      this.selectedForecast = forecast;
    }
  }
}
</script>

<style scoped>
  .weather-displayer {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .selected-forecast {
    font-size: 40vh;
  }
  .forecast-days {
    /* grid-column-start: 2;
    grid-column-end: 2;
    grid-row: 3; */
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
  }

  .forecast-list {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-right: 30px;
  }
  body::after{
  /* preload background images*/
  position:absolute; width:0; height:0; overflow:hidden; z-index:-1;
  content:url('../assets/sunny.jpg') url('../assets/rain.jpg') url('../assets/snow.jpg') url('../assets/clouds.jpg') url('../assets/night.jpg');
}

.city-handler--sun {
  background-image: url('../assets/sunny.jpg');
}
.city-handler--rain {
  background-image: url('../assets/rain.jpg');
}
.city-handler--snow {
  background-image: url('../assets/snow.jpg');
}
.city-handler--clouds {
  background-image: url('../assets/clouds.jpg');
}
.city-handler--night {
  background-image: url('../assets/night.jpg');
}
</style>
