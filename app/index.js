import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Schedule';

EStyleSheet.build({
  $white: '#fff',
  $gray: '#666',
  $darkGray: '#333',
});

const App = () => <Home />;

export default App;
