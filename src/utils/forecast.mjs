import request from 'postman-request'

export const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f4361b952a02bd8733f1ba68df30da1&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' degrees but it feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}