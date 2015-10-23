import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import * as parcoords from './lib/d3.parcoords.js';

export default class Parallel extends Component {
  constructor() {
    super();
    this.state = {}
  }

  summarize(apiData) {
    var intermediate = {};

    for (var i = 0; i < apiData.length; i++) {
      var company = apiData[i];
      var industries = company.Industries;
      for (var j = 0; j < industries.length; j++) {
        intermediate[industries[j]] = intermediate[industries[j]] || {
          employees_mom: {count:0, sum: 0}, 
          employees: {count:0, sum: 0}, 
          total_funding: {count: 0, sum: 0}
        };
        var industry = intermediate[industries[j]];
        if (company['employees_mom'] !== null) {
          var emom = company['employees_mom'];
          industry['employees_mom'].count++;
          industry['employees_mom'].sum += emom;
        }
        if (company['employees'] !== null) {
          var emp = company['employees'];
          industry['employees'].count++;
          industry['employees'].sum += emp;
        }
        if (company['total_funding'] !== null) {
          var funding = company['total_funding'];
          industry['total_funding'].count++;
          industry['total_funding'].sum += funding;
        }
        
      }
    }
    
    var out = [];
    for (var industry in intermediate) {
      var summary = {};
      summary['Industry'] = industry;
      summary['Funding'] = intermediate[industry]['total_funding'].sum / intermediate[industry]['total_funding'].count;
      summary['Employees_MoM'] = intermediate[industry]['employees_mom'].sum / intermediate[industry]['employees_mom'].count;
      summary['Employees'] = intermediate[industry]['employees'].sum / intermediate[industry]['employees'].count;      
      out.push(summary);
    }

    console.log('inter ', intermediate);
    return out;
  }

  doD3(d3Node) {
    console.log('special', d3Node);
        
    d3.json('http://localhost:3000/data/company?industry=all&fields[]=employees_mom&fields[]=employees&fields[]=total_funding', function(data) {
      var colorgen = d3.scale.ordinal()
        .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c",
            "#fb9a99","#e31a1c","#fdbf6f","#ff7f00",
            "#cab2d6","#6a3d9a","#ffff99","#b15928"]);
      
      var summaryData = this.summarize(data);

      var color = function(d) { return colorgen(d.Industry); };

      console.log('length: ', summaryData.length);
      console.log(data[0]);

      var parcoords = d3.parcoords()(d3Node)
        .data(summaryData)
        //.hideAxis(["name"])
        .color(color)
        .alpha(0.25)
        .composite("darken")
        .margin({ top: 24, left: 150, bottom: 12, right: 0 })
        .mode("queue")
        .render()
        .brushMode("1D-axes");  // enable brushing

      parcoords.svg.selectAll("text")
        .style("font", "10px sans-serif");
      
    }.bind(this));

  }

  render() {

    
    var divStyle = {width: "1300px", height: "1080px"};



    return (
      <div>
        "hellow parcords"
        <div style={divStyle} id="example" className="parcoords" ref={(ref) =>  this.doD3(ReactDOM.findDOMNode(ref))}></div>
        
      </div>
    )

  }


}
