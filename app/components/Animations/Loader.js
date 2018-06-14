import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { DangerZone } from 'expo';

import loader from '../../assets/animations/loader.json';

const { Lottie } = DangerZone;
class Loader extends Component {
  componentDidMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Lottie
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: Dimensions.get('window').width / 1.4,
            height: Dimensions.get('window').height / 2,
            // height: 200,
            // backgroundColor: '#eee',
          }}
          source={loader}
        />
      </View>
    );
  }
}

export default Loader;
