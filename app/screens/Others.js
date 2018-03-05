import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SQLite } from 'expo';
import { StatusBar, ScrollView, Text, RefreshControl, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { List, ListItem } from 'react-native-elements';

import Container from '../components/Container';

const db = SQLite.openDatabase('hourloop22.db');

// db.transaction(
//   (tx) => {
//     tx.executeSql(
//       "SELECT name  FROM sqlite_master WHERE type='table';",
//       [],
//       (_, { rows: { _array } }) => {
//         alert(JSON.stringify(_array));
//       },
//     );
//   },
//   this.handleError,
//   null,
// );
class Others extends Component {
  static propTypes = {
    type: PropTypes.string,
  };

  state = {
    items: [],
    refreshing: true,
  };

  componentWillMount() {
    this.initializeDB();
    this.update();
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.update();
  };

  initializeDB = () => {
    db.transaction((tx) => {
      if (this.props.type === 'subjects') {
        tx.executeSql('create table if not exists subjects (id integer primary key not null, title text, teacher text);');
      } else {
        tx.executeSql('create table if not exists teachers (id integer primary key not null, name text);');
      }
    });
  };

  update = () => {
    db.transaction((tx) => {
      tx.executeSql(`select * from ${this.props.type};`, [], (_, { rows: { _array } }) => {
        this.setState({ items: _array, refreshing: false });
        console.log(_array);
      });
    });
  };

  handleError = (error) => {
    throw new Error(error);
  };

  handleAdd = () => {
    db.transaction(
      (tx) => {
        if (this.props.type === 'subjects') {
          tx.executeSql('insert into subjects (title, teacher) values(?, ?);', [
            'Algebra',
            'Danilova',
          ]);
        } else {
          tx.executeSql('insert into teachers (name) values(?);', ['Danilova']);
        }
      },
      this.handleError,
      this.update,
    );
  };

  handleDrop = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('delete from subjects');
      },
      this.handleError,
      this.update,
    );
  };

  handlePress = (item) => {
    alert(JSON.stringify(item));
  };

  handleLongPress = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from ${this.props.type} where id = ?;`, [id]);
      },
      this.handleError,
      this.update,
    );
  };

  render() {
    const { type } = this.props;
    const { items, refreshing } = this.state;

    const subjectsList =
      items.length > 0 ? (
        <List containerStyle={{ marginBottom: 20 }}>
          {items.map(item => (
            <ListItem
              key={item.id}
              title={item.title || item.name}
              subtitle={
                item.title && (
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}
                  >
                    <Text style={{ fontFamily: 'circular-regular', fontSize: 12, color: '#999' }}>
                      {item.teacher}
                    </Text>
                  </View>
                )
              }
              hideChevron
              fontFamily="circular-regular"
              onPress={() => this.handlePress(item)}
              onLongPress={() => this.handleLongPress(item.id)}
            />
          ))}
        </List>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'circular-bold', color: '#333' }}>No {type}</Text>
        </View>
      );

    return (
      <Container paddingHorizontal={0}>
        <StatusBar barStyle="light-content" />
        <ActionButton
          buttonColor="#3689E6"
          style={{ zIndex: 1 }}
          fixNativeFeedbackRadius
          onPress={this.handleAdd}
          onLongPress={this.handleDrop}
        />

        <ScrollView
          contentContainerStyle={{ flexDirection: 'column', flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
          {subjectsList}
        </ScrollView>
      </Container>
    );
  }
}

export default Others;
