var d3 = require('d3');

var ChartFrame = React.createClass({
  getInitialState: function() {
    var height = 500;
    var width = 500;
    return {
      svgHeight: height,
      svgWidth: width
    }
  },

  render: function() {
    var svgStyle = {border: "2px solid black"};

    return (
        <svg style={svgStyle} 
          height={this.state.svgHeight}
          width={this.state.svgWidth}></svg>
    )
          
  }
});



var Landing = React.createClass({
  getInitialState: function() {
    return {
      data: [1, 2, 3, 4]
    }   
  },

  drawCharts: function() {
    var charts = this.state.data.map(function(datum) {
      return (<ChartFrame />);
    });
    return charts;
  },

  render: function() {
    var svgStyle = {border: "2px solid black"}
    return (
      <div>
        <div><h1>Placeholder Charts</h1></div>
          {this.drawCharts()}
        </div>
    )
  }
});

module.exports = Landing;
