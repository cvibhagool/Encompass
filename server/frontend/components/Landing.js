import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
//import * as parcoords from './lib/d3.parcoords.js';
import Parallel from './Parallel.js'; 



export default class Landing extends Component {
  constructor() {
    super();
    this.state = {data: []}
  }

  // componentDidMount() {
  //   d3.csv('nutrients.csv', function(error, data) {
  //     if (error) console.log(error);

  //     this.setState({data: data});
  //     console.log('in Landing: ', data.length);
  //   }.bind(this));
  // }

  render() {
    return (
      <div>  
      <div>Landing Test</div>
      <Parallel data={this.state.data} />
      </div>
    );
  }
}

