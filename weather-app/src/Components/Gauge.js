import React, { Component } from 'react';

class Gauge extends Component {
  constructor(props){
    super(props);

    this.state={
      mood:0
    }
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.mood!==this.props.mood){
      setTimeout(x=>this.setState({mood:this.props.mood}),10);//for the animation effect
    }
  }

  componentDidMount(){
    setTimeout(x=>this.setState({mood:this.props.mood}),10);//for the animation effect
  }

  render() {
    
    const moodStyle={
      height:100-this.state.mood+"%"
    };
    return (

      <div className="gauge">
          <div className="curtain" style={moodStyle}></div>
      </div>
    );
  }
}

export default Gauge;
