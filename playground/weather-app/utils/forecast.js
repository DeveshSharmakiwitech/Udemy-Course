const request=require('request')

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


module.exports=forecast;