import React, { Component } from 'react';
import Tabs from './Components/Tabs';
import Gauge from './Components/Gauge';
import MoodCalculator from './Components/MoodCalculator';

import exampleApiResult from './exampleApiResult'
import './App.css';

class App extends Component {

  constructor(props)
  {
    super(props);

    this.state={
      cities:[
        {
          name:"Amsterdam",
          lastPullTime:-1,
          mood:0
        },
        {
          name:"Moscow",
          lastPullTime:-1,
          mood:0
        },
        {
          name:"New York",
          lastPullTime:-1,
          mood:0
        }
      ],
      updateInterval:1000*60*10,//10 minutes in miliseconds
      IntervalObject:null,
    }

    this.handleTabClick=this.handleTabClick.bind(this);
  }

  componentDidMount(){
    //Get the first tabs data and update the tab
    this.updateCity(this.state.cities[0]);
  }

  handleTabClick(index,tabElement){
      this.updateCity(tabElement);
  }

  updateCity(city){
    let now=new Date();
    if(now - city.lastPullTime>this.state.updateInterval)//only update if its been more than 10 minutes
    {
      console.log("FETCH HERE"+city.name)
      const fetchUrl=`http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&APPID=f5f4872d078b2223b2cf09237a0a427b`;
      fetch(fetchUrl)
      .then(response => response.json())
      .then(data=> 
        {
          clearInterval(this.state.IntervalObject);
          let interval=setInterval(()=>{this.updateCity(city);},this.state.updateInterval);//automatically update in 10 minutes
          this.setState({IntervalObject:interval});
    
          this.updateCityTab(city.name,data);//update the tab content
        });
    }
  }

  updateCityTab(cityName,cityData){
    let mood=MoodCalculator(cityData);

    let cities=this.state.cities;

    //find the right city and update its data with the new one
    cities.forEach(city => { 
      if(city.name===cityName){
        city.mood = mood;
        city.lastPullTime=new Date();
      }
    });
    this.setState(cities);
  }

  render() {
    return (
      <div className="App">
          <Tabs isReRenderOnClick={true} handleTabClick={this.handleTabClick}>
            {this.state.cities.map((city,index)=>{
              return <Gauge tabLabel={city.name} tabElement={city} mood={city.mood} key={index}/>;
            })}
          </Tabs>
      </div>
    );
  }
}

export default App;
