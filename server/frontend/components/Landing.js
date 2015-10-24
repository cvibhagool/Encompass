import React, { PropTypes, Component } from 'react';
import d3 from 'd3';
import { Card, CardHeader, CardText, CardTitle, Avatar } from 'material-ui';
import Parallel from './Parallel.js'; 




export default class Landing extends Component {
  constructor() {
    super();
    this.state = {data: []};

    this.setUpText = 'Encompass: it just makes sense. Don\'t think too hard about it.' +
      ' Just look at our pretty graphs.';
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
      <div style={{width:'95%', margin: 'auto'}}>  
      <h1>You Are Here</h1>
      <Card>  
        <CardHeader
          title="Encompass"
          subtitle="Insights"
          avatar={<Avatar style={{color:'black'}}>E</Avatar>}/>
        <CardText>
          {this.setUpText}
        </CardText>  
        <div>  
          <Parallel data={this.state.data} />
        </div>
      </Card> 
      </div>
    );
  }
}

