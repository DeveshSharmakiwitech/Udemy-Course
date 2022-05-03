// import { error } from 'console';
// import  request  from 'request';
const request= require('request')
const forecast = require('./playground/weather-app/utils/forecast')
const geocode = require('./playground/weather-app/utils/geocode')
// import  json  from 'stream/consumers';
// const { json } = require('stream/consumers')

// const url = "http://api.weatherstack.com/current?access_key=26d568441d6050749c7b128a286969b4&query=37.8267,-122.423"
// request({ url:url , json:true }, ( error, response )=>
// {
//     // console.log( response.body.current.temperature)
//     // console.log(response.body.request)
// //     const data = (response.body)
// //     console.log(data)
// }) 

// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?limit=2&access_token=pk.eyJ1IjoiZGV2ZXNoLXNoYXJtYSIsImEiOiJjbDFrazc0cDQwMWwyM2pzOWpod3FmNnlvIn0.Aj9KeyyOB0V-L3CGMqyRpg&limit=1"

// request({url: geocodeURL,json:true },(error,response)=>
// {
//     const longitude = response.body.feathers[0].center[0]
//     const latitude=response.body.feathers[0].center[1]
//     console.log(longitude,latitude);
// })

//  Handling error

// const url = "http://api.weatherstack.com/current?access_key=26d568441d6050749c7b128a286969b4&query=37.8267,-122.423"
// request({ url:url , json:true }, ( error, response )=>
// {
    
//     if(error)
//     {
//         console.log("unable to connect to weather service!");
//     }
//     else{
//         console.log( "The current temperature is "+response.body.current.temperature);
//     }
    // console.log(response.body.request)
// //     const data = (response.body)
// //     console.log(data)
// }) 


//callback abstraction 

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

// geocode('Bishrampur,Kagarol,Agra, Uttar Pradesh, India',(error,data)=>
// {
//     console.log('Error',error);
//     console.log('Date',data);
// })

//callback abstraction challenge

const forecast=(latitude, longitude, callback)=>
{
    console.log(latitude, longitude);
    const url='http://api.weatherstack.com/current?access_key=26d568441d6050749c7b128a286969b4&query='+latitude+','+longitude+'&unite=f'

    request({url: url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to connect to weather service!',undefined);
        }
        else if(response.body.error)
        {
            callback('unable to find location',undefined);
        }
        else{
            callback(undefined,response.body.location.name+' It is current '+response.body.current.temperature+' degress Out. There is a '+response.body.current.humidity+'% change of rain.');
        }
    })
}

// forecast(37.8267, -122.4235, (error,data)=>
// {
//     console.log('Error',error);
//     console.log('Data-: ',data);
// })


// Callback chaining


if (!address){
    console.log('please provide an address')
}
else{
    geocode(address,(error,data)=>
    {
        if(error){
            return console.log(error)
        }

        forecast(data.latitude,data.longitude,(error,forecastData)=>
        {
            if(error){
                return console.log(error)
            }

            console.log(data.location);
            console.log(forecastData)
        } )
    })
}