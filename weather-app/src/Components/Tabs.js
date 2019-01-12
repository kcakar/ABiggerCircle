import React, { Component } from 'react';
import Tab from './Tab';

class Tabs extends Component {
  constructor(props)
  {
      super(props);
      
      this.state={
          activeTab:0,
      }

  }

  handleTabClick(index,tabElement){
    this.setState({activeTab:index});
    this.props.handleTabClick(index,tabElement);
  }


  render() {
    const children=this.props.children;
    return (
      <div className="tabs">
        <ul className="tabs__headers">
          {children.map((child,index)=>{
            return(
                <li key={index}
                  className={this.state.activeTab===index?"active":""}
                  onClick={e=>{this.handleTabClick(index,child.props.tabElement)}}
                >{child.props.tabLabel}
                </li>
            )  
          })}
        </ul>

        {children.map((child,index)=>{
          if(this.state.activeTab===index || !this.props.isReRenderOnClick)
          {
            return(
              <Tab key={index}
                className={this.state.activeTab===index?"active":""}
              >
                {child}
              </Tab>
            )  
          }
          else{
            return "";
          }
        })}
      </div>
    );
  }
}

export default Tabs;
