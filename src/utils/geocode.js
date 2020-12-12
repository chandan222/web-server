const request = require('request')
const geocode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hhbmRhbjIyIiwiYSI6ImNraWNtbXU2NTFhbHQyeWxiY2FjcG92eWIifQ.zLyHV9NbPY5h6AmTMuj2qQ'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to server", undefined)
        }else if( body.features.length == 0){
            callback("no data found", undefined)
        }else{
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}

module.exports={
    geocode:geocode
}