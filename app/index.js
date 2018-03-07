import React, { Component } from 'react';
import { Font } from 'expo';
import { ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Navigator from './config/routes';

EStyleSheet.build({
  $white: '#fff',
  $gray: '#666',
  $darkGray: '#333',
});

class App extends Component {
  state = {
    fontLoaded: false,
  };
  async componentWillMount() {
    await Font.loadAsync({
      'circular-regular': require('./assets/fonts/Circular-Book.otf'),
      'circular-medium': require('./assets/fonts/Circular-Medium.otf'),
      'circular-bold': require('./assets/fonts/Circular-Bold.otf'),
      'circular-black': require('./assets/fonts/Circular-Black.otf'),
      'arial-regular': require('./assets/fonts/arial.ttf'),
      'arial-bold': require('./assets/fonts/arialbd.ttf'),
      'arial-black': require('./assets/fonts/ariblk.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Navigator />
    ) : (
      <ActivityIndicator size="large" color="#3689E6" />
    );
  }
}

export default App;
