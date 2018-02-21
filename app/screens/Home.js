import React from 'react';
import { StatusBar, Text } from 'react-native';
import Container from '../components/Container';

const Home = () => (
  <Container>
    <StatusBar barStyle="light-content" />
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </Container>
);

export default Home;
