const request=require('request')

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGV2ZXNoLXNoYXJtYSIsImEiOiJjbDFrazc0cDQwMWwyM2pzOWpod3FmNnlvIn0.Aj9KeyyOB0V-L3CGMqyRpg&limit=1'


    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location servise',undefined)
        }
        else if(body.features.length===0){
            callback("unable to find location . try another search.",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode