import React, { Component } from 'react';

class Tab extends Component {
  render() {
    const children=this.props.children;
    return (
      <div className={this.props.className+" tab"}>
          {children}
      </div>
    );
  }
}

export default Tab;
