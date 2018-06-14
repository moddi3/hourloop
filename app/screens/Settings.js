import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants, LinearGradient } from 'expo';
import PropTypes from 'prop-types';

import { Container, Header, Input, TimePicker } from '../components';
import { ScheduleConsumer } from '../components/ScheduleContext';

class Modify extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  state = {};

  render() {
    return (
      <Container paddingHorizontal={0}>
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={['#ABDCFF', '#0396FF']}
          style={{
            height: 160 + Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                position: 'absolute',
                top: 60,
                left: 20,
              }}
            >
              <View
                style={{
                  borderRadius: 24,
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="md-arrow-round-back" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            <Header fontSize={34} color="#fff">
              {this.props.navigation.state.params.lesson ? 'Edit lesson' : 'Add lesson'}
            </Header>
          </View>
        </LinearGradient>
        <ScrollView
          contentContainerStyle={{ flex: 1, padding: 8 }}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        />
      </Container>
    );
  }
}

export default props => (
  <ScheduleConsumer>{context => <Modify {...context} {...props} />}</ScheduleConsumer>
);
