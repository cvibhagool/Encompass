import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
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

  doD3(d3Node) {
    console.log('special', d3Node);
    // var pc = d3.parcoords()(d3Node)
    //   .data(this.state.data)
    //   .render()
    //   .ticks(3)
    //   .createAxes();
    
    d3.csv('nutrients.csv', function(data) {
      var colorgen = d3.scale.ordinal()
        .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
            "#cab2d6","#6a3d9a","#ffff99","#b15928"]);

      var color = function(d) { return colorgen(d.group); };

      console.log('length: ', data.length);

      var parcoords = d3.parcoords()(d3Node)
        .data(data)
        .hideAxis(["name"])
        .color(color)
        .alpha(0.25)
        .composite("darken")
        .margin({ top: 24, left: 150, bottom: 12, right: 0 })
        .mode("queue")
        .render()
        .brushMode("1D-axes");  // enable brushing

      parcoords.svg.selectAll("text")
        .style("font", "10px sans-serif");
      
    });

  }

  render() {

    var blue_to_brown = d3.scale.linear()
      .domain([9, 50]) 
      .range(['steelblue', 'brown'])
      .interpolate(d3.interpolateLab);

    var divStyle = {width: "1300px", height: "270px"};



    return (
      <div>
        "hellow parcords"
        <div style={divStyle} id="example" className="parcoords" ref={(ref) =>  this.doD3(ReactDOM.findDOMNode(ref))}></div>
        
      </div>
    )

  }


}
