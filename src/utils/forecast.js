import request from 'postman-request'
import * as os from 'os'

export const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f4361b952a02bd8733f1ba68df30da1&query=' + latitude + ',' + longitude + '&units=m'
    const {EOL} = os

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, "Time zone: " + body.location.timezone_id + os.EOL + " Local time: " + body.location.localtime + body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' degrees C but it feels like ' + body.current.feelslike + '.')
        }
    })
}