 const request = require("request");

 const forecast = (latitude, longitude, callback) => {

  const url =
    "http://api.weatherstack.com/current?access_key=aa6c7a9587e738c96e2dd0cb07ece144&query=Delhi" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error,{body}) => {
    if (error) {
      callback("unable to connect to weather servise", undefined);
    } else if (body.error) {
      callback("unable to find location . try another search.", undefined);
    } 
    else{
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ", It is currently " +
        body.current.temperature +
          " F Temp out. it feels like " +
        body.current.feelslike +
          " F Temp out."
      );
    }
  });
};

module.exports = forecast;
