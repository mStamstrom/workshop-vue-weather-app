<template>
  <div v-if="forecast && forecast.city" :class="backgroundClass" class="weather-displayer">
    <h1>{{forecast.city.name}}</h1>
    <div class="selected-forecast">
      <div v-if="selectedForecast">
        {{ Math.round(selectedForecast.main.temp) }}°
      </div>
    </div>
    <div class="forecast-days">
      <WeatherListItem
        v-for="dayForecast in getForecastsByDay"
        :key="dayForecast.dateString"
        :dayForecast="dayForecast"
        @changeSelectedForecast="changeSelectedForecast"
      />
    </div>
  </div>
</template>

<script>
import {getBackgroundClassForSelectedForecast, getForecastsByDay} from '../util/WeatherDisplayerHelper';
import WeatherListItem from './WeatherListItem';

export default {
  name: 'Weather-displayer',
  data: () => ({
    selectedForecast: null, // TODO: kolla om ok
  }),
  components: {
    WeatherListItem,
  },
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
    height: calc(100% - 60px);
    width: 100%;
    color: white;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .selected-forecast {
    font-size: 40vh;
  }
  .forecast-days {
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
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
