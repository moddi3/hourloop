import React, { Component } from 'react';

import { Container, Header, Date } from '../components';

class Home extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Date />
        <Header fontSize={34}>Today</Header>
      </Container>
    );
  }
}

export default Home;
