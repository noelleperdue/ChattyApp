import React, {Component} from 'react';

class Bar extends Component{

  render() {
    return (
      <nav>
        <h1>Chatty</h1>
        <span>{this.props.usersOnline} users online!</span>
      </nav>
    )
  }
}

export default Bar;