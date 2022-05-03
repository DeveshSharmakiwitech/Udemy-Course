const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



// geocode('B9, Amaltash Marg, Block B, Sector 3, Noida, Uttar Pradesh 201301',(error,data)=>
// {
//     console.log('Error',error);
//     console.log('Data',data);
// })

// forcast('37.8267, -122.4235',(error,data)=>
// {
//     console.log('Error',error);
//     console.log('Date',data);
// })

// callback chaining

// const address=process.argv[2]


// if (!address){
//     console.log('please provide an address')
// }
// else{
//     geocode(address,(error,data)=>
//     {
//         if(error){
//             return console.log(error)
//         }

//         forecast(data.latitude,data.longitude,(error,forecastData)=>
//         {
//             if(error){
//                 return console.log(error)
//             }

//             console.log(data.location);
//             console.log(forecastData)
//         } )
//     })
// }

//destructing and property shorthand channely

const address=process.argv[2]


if (!address){
    console.log('please provide an address')
}
else{
    geocode(address,(error,{ latitude,longitude, location})=>
    {
        if(error){
            return console.log(error)
        }

        forecast(latitude, longitude,(error,forecastData)=>
        {
            if(error){
                return console.log(error)
            }

            console.log(location);
            console.log(forecastData)
        } )
    })
}