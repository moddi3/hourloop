import React from 'react';
import { StatusBar, Text } from 'react-native';

// TODO: create a global index list for components
import Container from '../components/Container';
import Header from '../components/Text';

const Home = () => (
  <Container>
    <StatusBar barStyle="light-content" />
    <Header fontSize={34}>Today</Header>
  </Container>
);

export default Home;
