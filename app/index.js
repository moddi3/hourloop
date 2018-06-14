import React, { Component } from 'react';
import { Font } from 'expo';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import localization from 'moment/locale/en-gb';

import Navigator from './config/routes';
import { ScheduleProvider } from './components/ScheduleContext';
import { Animations } from './components';

EStyleSheet.build({
  $white: '#ffffff',
  $border: '#e2e2e2',
  $lightGray: '#ededed',
  $gray: '#666666',
  $darkGray: '#333333',
});

moment().locale('en-gb', localization);

class App extends Component {
  state = {
    isReady: false,
  };

  componentWillMount() {
    this._preloadFonts();
  }

  _preloadFonts = async () => {
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-extrabold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    });
    this.setState({ isReady: true });
  };

  render() {
    return this.state.isReady ? (
      <Navigator />
    ) : (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animations.Loader />
      </View>
    );
  }
}

export default () => (
  <ScheduleProvider>
    <App />
  </ScheduleProvider>
);
