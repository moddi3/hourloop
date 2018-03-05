import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import Container from '../components/Container';

class More extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    // dispatch: PropTypes.func,
  };
  state = {};

  render() {
    const list = [
      { title: 'Subjects', icon: 'book', quantity: 3 },
      { title: 'Teachers', icon: 'person', quantity: 4 },
    ];

    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <StatusBar barStyle="light-content" />
        <List containerStyle={{ marginBottom: 20 }}>
          {list.map(item => (
            <ListItem
              key={item.title}
              title={item.title}
              fontFamily="circular-regular"
              leftIcon={{ name: item.icon, color: '#999' }}
              badge={{
                value: item.quantity,
                textStyle: { fontFamily: 'circular-regular' },
                containerStyle: { backgroundColor: '#999' },
              }}
              onPress={() => this.props.navigation.navigate(item.title)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default More;
