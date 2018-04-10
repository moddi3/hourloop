import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, ScrollView, RefreshControl } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { SQLite } from 'expo';
import Container from '../components/Container';

const db = SQLite.openDatabase('hourloop22.db');

class More extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    // dispatch: PropTypes.func,
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
        <ScrollView
          style={{ backgroundColor: '#fff' }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
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
      </Container>
    );
  }
}

export default More;
