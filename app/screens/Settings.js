import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Clipboard, FlatList, View, Alert } from 'react-native';
import { Constants, LinearGradient, Linking as ExpoLinking } from 'expo';

import { Container, Header, List } from '../components';
import { ScheduleConsumer } from '../components/ScheduleContext';

class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    importLessons: PropTypes.func,
    removeAll: PropTypes.func,
    lessons: PropTypes.arrayOf(PropTypes.object),
  };

  state = {};

  _handleUrl = (url) => {
    const URI = new Promise((resolve) => {
      resolve(ExpoLinking.parse(url));
    });
    URI.then(({ queryParams }) => {
      if (url !== undefined && url !== '' && queryParams.lessons) {
        Alert.alert(
          'Import lessons',
          `Do you want to import ${queryParams.lessons.length} lessons?`,
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                this.props.importLessons(queryParams.lessons);
              },
            },
          ],
          { cancelable: false },
        );
      } else {
        Alert.alert('Cannot be imported!', 'Data is corrupted or not found :(', [{ text: 'OK' }]);
      }
    });
  };

  _handleImport = async () => {
    const url = await Clipboard.getString();

    this._handleUrl(url);
  };

  _handleStream = () => {
    fetch('http://192.168.1.26:3000/link/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessons: this.props.lessons,
      }),
    });
  };

  render() {
    const settings = [
      { text: 'Import Schedule from Clipboard', onPress: this._handleImport },
      { text: 'Clear Schedule', onPress: this.props.removeAll },
      { text: 'Send to Desktop', onPress: this._handleStream },
    ];
    return (
      <Container paddingHorizontal={0}>
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={['#0396FF', '#ABDCFF']}
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
            <Header fontSize={34} color="#fff">
              {/* Settings */}
              {this.props.navigation.state.routeName}
            </Header>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            // paddingVertical: 16,
          }}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        >
          <FlatList
            data={settings}
            renderItem={({ item }) => <List.Item text={item.text} onPress={item.onPress} />}
            keyExtractor={item => item.text}
            ItemSeparatorComponent={List.Separator}
          />
        </View>
      </Container>
    );
  }
}

export default props => (
  <ScheduleConsumer>{context => <Settings {...context} {...props} />}</ScheduleConsumer>
);
