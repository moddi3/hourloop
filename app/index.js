import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';

EStyleSheet.build({
  $white: '#fff',
  $gray: '#666',
  $darkGray: '#333',
});

const App = () => <Navigator />;

export default App;
