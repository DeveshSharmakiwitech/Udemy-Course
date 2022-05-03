// const { response } = require('express');
// const request=require('request');

// const url='http://api.weatherstack.com/current?access_key=b893fcec327ad054c05728cea99dc52b&query=37.8267,-122.4233';

// request({url:url,json:true},(error,response)=>
// {
//     if(error){
//         console.log('unable to connect to weather service!');
//     }
//     else{
//         console.log(response.body.daily.data[0].summary+' It is currently '+response.body.current.temperature+'')
//     }
// })


// const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGV2ZXNoLXNoYXJtYSIsImEiOiJjbDFrazc0cDQwMWwyM2pzOWpod3FmNnlvIn0.Aj9KeyyOB0V-L3CGMqyRpg&limit=1';

// request({url:geocodeurl,json:true},(error,response)=>
// {
//     const latitude=response.body.features[0].center[1];
//     const longitude=response.body.features[0].center[0];
//     console.log(latitude,longitude)
// })

// console