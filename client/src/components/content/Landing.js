var d3 = require('d3');

var ChartFrame = React.createClass({
  getInitialState: function() {
    var height = 499;
    var width = 1094;
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
          width={this.state.svgWidth}
          dangerouslySetInnerHTML={{__html: "<image height=" + this.state.svgHeight + 
            " width=" + this.state.svgWidth + " xlink:href=" + this.props.source + " />"}}>
        </svg>
    )
  }
});


var Landing = React.createClass({
  getInitialState: function() {
    return {
      sources: ['images/mom-employees.png', 'images/funding-employee-funding.png', 'images/funding-employee-growth.png']
    }   
  },

  drawCharts: function() {
    var charts = this.state.sources.map(function(source) {
      return (<ChartFrame source={source}/>);
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
