const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=deabe54d4b3ff481f40458e1036ea79d&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.error) {
            callback('Unable to find weather for this location')
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current
            const message = `${weather_descriptions[0]}. The temperature is ${temperature}. It feels like ${feelslike}.`
            callback(undefined, message)
        }
    })
}

module.exports = forecast
