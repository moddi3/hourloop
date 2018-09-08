import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Constants, LinearGradient, SQLite } from 'expo';

import { Container, Header } from '../components';

const db = SQLite.openDatabase('hourloop.db');

class More extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  state = {
    subjects: 0,
    teachers: 0,
    refreshing: true,
  };
  componentDidMount = () => {
    this.update();
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.update();
  };

  update = () => {
    db.transaction((tx) => {
      tx.executeSql('select count(distinct title) from lessons;', [], (_, { rows: { _array } }) => {
        this.setState({ subjects: _array[0]['count(distinct title)'] });
      });
      tx.executeSql(
        'select count(distinct teacher) from lessons;',
        [],
        (_, { rows: { _array } }) => {
          this.setState({ teachers: _array[0]['count(distinct teacher)'], refreshing: false });
        },
      );
    });
  };

  render() {
    const { subjects, teachers, refreshing } = this.state;

    const list = [
      { title: 'Subjects', icon: 'book', quantity: subjects },
      { title: 'Teachers', icon: 'person', quantity: teachers },
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
              {this.props.navigation.state.routeName}
            </Header>
          </View>
        </LinearGradient>
        <ScrollView
          style={{ backgroundColor: '#fff' }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
          <List containerStyle={{}}>
            {list.map(item => (
              <ListItem
                key={item.title}
                title={item.title}
                fontFamily="open-sans"
                leftIcon={{ name: item.icon, color: '#999' }}
                badge={{
                  value: item.quantity,
                  textStyle: { fontFamily: 'open-sans' },
                  containerStyle: { backgroundColor: '#999' },
                }}
                onPress={() => this.props.navigation.navigate(item.title)}
              />
            ))}
          </List>
        </ScrollView>
      </Container>
    );
  }
}

export default More;
