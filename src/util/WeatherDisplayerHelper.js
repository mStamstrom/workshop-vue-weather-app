import {formatDate, getDayFromDateString} from './DateHelper';

export function getForecastsByDay(forecastList) {
  const sortedWeather = [];
  for(const forecast of forecastList) {
    const dateString = forecast.dt_txt.split(' ')[0];

    const dayObject = sortedWeather.find(x => x.dateString === dateString);

    const weatherWithTime = forecast;
    weatherWithTime.time = formatDate(forecast.dt);
    if (dayObject) {
      dayObject.list.push(forecast);
    } else {
      const day = getDayFromDateString(forecast.dt);
      sortedWeather.push({ day, dateString, list: [forecast]});
    }
  }
  return sortedWeather;

}

export function getBackgroundClassForSelectedForecast(selectedForecast) {
  const date = new Date(selectedForecast.dt*1000);
  if (19 < date.getHours() || date.getHours() < 6) {
    return 'city-handler--night';
  }
  if (selectedForecast.weather && selectedForecast.weather.length > 0) {
    if (selectedForecast.weather[0].main === 'Sun') {
      return 'city-handler--sun';
    }
    if (selectedForecast.weather[0].main === 'Clear') {
      return 'city-handler--sun';
    }
    if (selectedForecast.weather[0].main === 'Rain') {
      return 'city-handler--rain';
    }
    if (selectedForecast.weather[0].main === 'Snow') {
      return 'city-handler--snow';
    }
    if (selectedForecast.weather[0].main === 'Clouds') {
      return 'city-handler--clouds';
    }
    return 'city-handler--clouds';

  }
  return 'city-handler--clouds';
}