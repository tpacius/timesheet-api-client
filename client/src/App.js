import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import SimpleTable from './TableData';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    } 
  }
  componentDidMount() {
    const API_URL = 'http://localhost:4000/projects/';
    axios.get(API_URL).then(response => response.data)
    .then((data) => {
      this.setState({ projects: data });
    })
  }


  render() {
    const { projects } = this.state;
    const hoursTracked = projects.reduce((sum, { hours }) => sum + parseFloat(hours), 0);
    const billableAmount = projects.filter((project) => project.billable === true).reduce((sum, { billable_amount }) => sum + parseFloat(billable_amount), 0);
    return (
      <Container>
        <Header hoursTracked={hoursTracked} billableAmount={billableAmount}/>
        <SimpleTable projects={projects}/>
      </Container>
    );
  }
}

export default App;
