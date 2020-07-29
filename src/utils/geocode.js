const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGlndXppbSIsImEiOiJja2QzNzJyOGEwd2dmMnJsNTA3dWl1a2U2In0.AymAykEx3IxS_2ujqiLN1w&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services.')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const feature = body.features[0]
            const location = feature.place_name
            const [longitude, latitude] = feature.center
            
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode
