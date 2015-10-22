import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import * as parcoords from './lib/d3.parcoords.js';

export default class Parallel extends Component {
  constructor() {
    super();
    this.state = {data: [
      [0,-0,0,0,0,3 ],
      [1,-1,1,2,1,6 ],
      [2,-2,4,4,0.5,2],
      [3,-3,9,6,0.33,4],
      [4,-4,16,8,0.25,9]
    ]}
  }

  render() {

    var blue_to_brown = d3.scale.linear()
      .domain([9, 50]) 
      .range(['steelblue', 'brown'])
      .interpolate(d3.interpolateLab);



    return (
      <div id="example">
        "hellow parcords"
      </div>
    )

    

  }


}
