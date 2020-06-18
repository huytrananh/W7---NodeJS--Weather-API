var express = require('express');
var router = express.Router();
const getGeocode = require("../ultis/getGeocode")
const getForecast = require("../ultis/getForecast")
const e = require('express');


/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    // get the city value 
    const {city} = req.query
    if(!city){
      return res.render('index', { title: 'Weather App' }); // ?????
    } 
    const location = await getGeocode(city)// get the coordinates from the city name
    // use the location coordinate to get the forecast
    // ANDDDD   get coordinate from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)

    const hourly = forecast.hourly.filter((hour, idx) => {
      if (idx % 2 == 0 && idx < 24){
        return hour
      }
    })

    let newSunsetObject = new Date(forecast.current.sunset * 1000)
    let newSunset = newSunsetObject.toLocaleString()
    forecast.current.sunset = newSunset

    let newSunriseObject = new Date(forecast.current.sunrise * 1000)
    let newSunrise = newSunriseObject.toLocaleString()
    forecast.current.sunrise = newSunrise

    const dtGetHour = forecast.hourly.map(item => {
      let newHour = new Date(item.dt * 1000)
      item.dt = newHour.getHours()
      return item.dt
    })

    return res.render('index', { 
      title: 'Weather',
      city: city.toUpperCase(),
      forecast: forecast.current,
      hourly: hourly
    });
  }catch(err){ // err is an Error object
    next(err)
  }
});

module.exports = router
