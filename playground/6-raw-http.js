const https=require('https')
const url ='http://api.weatherstack.com/current?access_key=26d568441d6050749c7b128a286969b4&query=45,-75&units=f'

const request= https.request(url,(response)=>
{
    let data=''

    response.on('data',(chunk)=>
    {
        data=data+chunk.tostring()
    })

    response.on('end',()=>
    {
        const body=JSON.parse(data)
        console.log(body)
    })
})

request.on('error',(error)=>
{
    console.log('An error',error)
})

request.end();