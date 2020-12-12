const request = require("request")

const forecast=(latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=3ff99d42467cb5b511e54551e127a71d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({url,json:true},(error, {body})=>{
        if(error){
            callback("unable to connect to server",undefined)
        }else if(body.error){
            callback("enter proper locations",undefined)
        } else{
            callback(undefined,{
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            })
        }
    })
}

module.exports={
    forecast:forecast
}