import React from 'react';
import { StatusBar } from 'react-native';

// TODO: create a global index list for components
import Container from '../components/Container';
import Header from '../components/Text';
import Date from '../components/Date';

const Home = () => (
  <Container>
    <StatusBar barStyle="light-content" />
    <Date />
    <Header fontSize={34}>Today</Header>
  </Container>
);

export default Home;
