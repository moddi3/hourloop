import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SQLite } from 'expo';
import { ScrollView, Text, RefreshControl, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { Container } from '../components';

const db = SQLite.openDatabase('hourloop.db');

class Others extends Component {
  static propTypes = {
    type: PropTypes.string,
  };

  state = {
    items: [],
    refreshing: true,
  };

  componentWillMount() {
    this.update();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.update();
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

  handlePress = (item) => {
    alert(JSON.stringify(item));
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
                  <View>
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
