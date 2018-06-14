import React, { Component } from 'react';
import { View } from 'react-native';
import { DangerZone } from 'expo';

import beacon from '../../assets/animations/search.json';

const { Lottie } = DangerZone;

class Beacon extends Component {
  componentDidMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View>
        <Lottie
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 30,
            height: 30,
            // backgroundColor: '#eee',
          }}
          source={beacon}
        />
      </View>
    );
  }
}

export default Beacon;
