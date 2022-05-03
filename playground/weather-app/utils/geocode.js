const request= require('request')

const geocode=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=2&access_token=pk.eyJ1IjoiZGV2ZXNoLXNoYXJtYSIsImEiOiJjbDFrazc0cDQwMWwyM2pzOWpod3FmNnlvIn0.Aj9KeyyOB0V-L3CGMqyRpg&limit=1';

    request({ url:url, json:true }, (error,response) =>
    {
        if(error)
        {
            callback('Unable to connect to location server!', undefined);
        }
        else if(response.body.features.length ===0)
        {
            callback('Unable to find location. Try another search.',undefined);
        }
        else
        {
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })

}

module.exports=geocode