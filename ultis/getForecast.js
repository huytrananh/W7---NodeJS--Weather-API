const axios = require('axios')

const getForecast = async([lon,lat]) => {
    try{
        const token = process.env.OPEN_WEATHER_KEY
        // console.log(token)
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${token}&exclude={daily,minutely}&units=metric`
        const res = await axios.get(url)
        return res.data
    }catch(err){
        throw err
    }
}

module.exports = getForecast