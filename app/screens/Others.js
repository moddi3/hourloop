import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SQLite } from 'expo';
import { ScrollView, Text, RefreshControl, View, ViewPagerAndroid } from 'react-native';
import ActionButton from 'react-native-action-button';
import { List, ListItem } from 'react-native-elements';

import { Container } from '../components';

const db = SQLite.openDatabase('hourloop.db');

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
      if (this.props.type === 'subjects') {
        tx.executeSql('select distinct title from lessons;', [], (_, { rows: { _array } }) => {
          this.setState({ items: _array, refreshing: false });
          console.log(_array);
        });
      } else {
        tx.executeSql('select distinct teacher from lessons;', [], (_, { rows: { _array } }) => {
          this.setState({ items: _array, refreshing: false });
          console.log(_array);
        });
      }
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
    // console.log(items);
    const subjectsList =
      items.length > 0 ? (
        <List containerStyle={{ marginBottom: 20 }}>
          {items.map(item => (
            <ListItem
              key={item.title || item.teacher}
              title={item.title || item.teacher}
              subtitle={
                item.title && (
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingTop: 5,
                    }}
                  >
                    <Text style={{ fontFamily: 'open-sans', fontSize: 12, color: '#999' }}>
                      {item.teacher}
                    </Text>
                  </View>
                )
              }
              hideChevron
              fontFamily="open-sans"
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
          <Text style={{ fontFamily: '', color: '#333' }}>No {type}</Text>
        </View>
      );

    return (
      <Container paddingHorizontal={0}>
        <ActionButton
          buttonColor="#3689E6"
          position="center"
          style={{ zIndex: 1 }}
          fixNativeFeedbackRadius
          onPress={this.handleAdd}
          onLongPress={this.handleDrop}
        />
        <ViewPagerAndroid style={{ flex: 1 }} pageMargin={10} initialPage={1}>
          <View>
            <ScrollView
              contentContainerStyle={{ flexDirection: 'column', flexGrow: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            >
              {subjectsList}
            </ScrollView>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ flexDirection: 'column', flexGrow: 1 }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
            >
              {subjectsList}
            </ScrollView>
          </View>
        </ViewPagerAndroid>
      </Container>
    );
  }
}

export default Others;
