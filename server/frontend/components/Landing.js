// URL is /
// this view renders when a user hits the homepage
// its parent is ContentPage

// require our dependencies
import React, { PropTypes, Component }  from 'react';
import d3                               from 'd3';
import { Card, CardHeader, CardText, CardTitle, CardActions, Avatar, RaisedButton, FlatButton } from 'material-ui';
import Parallel                         from './Parallel.js'; 
import { Link }                         from 'react-router';

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
          <RaisedButton 
            style={{marginRight: "2%"}}
            secondary={true} 
            label="Search Companies">
            <Link to="/searchCompany"></Link>
          </RaisedButton>
          <RaisedButton
            secondary={true}
            label="Compare Offers">
            <Link to="/profile"></Link>
          </RaisedButton>
        </div>
      </section>

      </div>
    );
  }
}

