const MoodCalculator = (cityData)=>{
    let moodsTotal=0; 

    cityData.list.forEach(data=>{
       let temperaturePoint=getTemperaturePoint(data.main.temp);
       let weatherPoint=getWeatherPoint(data.weather);
       let windPoint=getWindPoint(data.wind.speed);

       let mood=temperaturePoint+windPoint+weatherPoint;
       
       if(mood>100)
       {
         mood=100;
       }
       else if(mood<0){
         mood=0;
       }
       moodsTotal+=mood;
    })
    return Math.round(moodsTotal/cityData.list.length);
}

const getTemperaturePoint = (temperature)=>
{
  // -30 degrees is 0 and our start point. +30 degrees is the best value and it is 90, the best contribution value that temperature can give to the mood. 
  if(temperature<-30)
  {
    temperature=0;
  }
  if(temperature>30){
    temperature=30;
  }

  temperature=temperature+30;
  return temperature*(90/60);
}

const getWindPoint = (speed) =>
{
  if(speed<3){
    return 5;
  }
  else if (speed >=3 && speed <6)
  {
    return 0;
  }
  else if(speed >= 6 && speed < 8)
  {
    return -5;
  }
  else if(speed >= 8 && speed < 10)
  {
    return -10;
  }
  else{
    return -20;
  }
}

const getWeatherPoint= (weather) => {
  if(weather && weather.length>0){
    let weatherCode=weather[0].id;
    if(weatherCode>199 && weatherCode<=299) //thunderstorm
    {
      return -10;
    }
    else if(weatherCode>299 && weatherCode<=399) //drizzle
    {
      return -5;
    }
    else if(weatherCode>499 && weatherCode<=599) //rain
    {
      return -7;
    }
    else if(weatherCode>599 && weatherCode<=699) //snow
    {
      return -10;
    }
    else if(weatherCode>699 && weatherCode<=799) //athmosphere
    {
      return -5;
    }
    else if(weatherCode>799 && weatherCode<=899) //clear&clouds
    {
      return 10;
    }
  }
  else{
    return 0;
  }
}

export default MoodCalculator;