// URL is /
// this view renders when a user hits the homepage
// its parent is ContentPage

// require our dependencies
import React, { PropTypes, Component }  from 'react';
import d3                               from 'd3';
import { Card, CardHeader, CardText, CardTitle, CardActions, Avatar, RaisedButton } from 'material-ui';
import Parallel                         from './Parallel.js'; 

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {data: [],
                  displayChart: false};

    this.setUpText = 'Encompass is the easiest place on the web to assess and compare your startup job offers.';
  }

  componentDidMount() {
    // Segment pageview call
    window.analytics.page();

  //   d3.csv('nutrients.csv', function(error, data) {
  //     if (error) console.log(error);

  //     this.setState({data: data});
  //     console.log('in Landing: ', data.length);
  //   }.bind(this));
  }

  displayChart() {
    this.setState({displayChart: true});
  }
    
  render() {
    return (
      <div>
      <section className = "container hero-landing">
        <div className = "col-xs-12 hero-content">
          <h1> <span className="word">Gauge</span> your future </h1>
          <p className = "lead"> Make better, more informed career decisions</p>
          <a href="/searchCompany" className= "btn btn-primary btn-lg">Search Companies</a>
          <a href="/profile" className= "btn btn-primary btn-lg">Compare Offers</a>
        </div>
      </section>
      <section className = "container parallel">
      </section>
      </div>
    );
  }
}

