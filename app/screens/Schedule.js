import React, { Component } from 'react';
import { ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import { SQLite } from 'expo';

// TODO: create a global index list for components
import Container from '../components/Container';
import Header from '../components/Text';
import Date from '../components/Date';
import LessonCard from '../components/Card';

const db = SQLite.openDatabase('hourloop22.db');

db.transaction((tx) => {
  tx.executeSql(`create table if not exists lessons 
  (lesson_id integer primary key not null, title text, teacher text, room integer, startsAt text, fav integer);`);
});

const colors = ['#7A36B1', '#C6262E', '#F37329', '#485A6C', '#f9c440', '#68b723', '#715344'];

class Home extends Component {
  state = {
    lessons: [],
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
      tx.executeSql('select * from lessons;', [], (_, { rows: { _array } }) => {
        this.setState({ lessons: _array, refreshing: false });
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
        tx.executeSql(
          'insert into lessons (title, teacher, room, startsAt, fav) values(?, ?, ?, ?, ?);',
          ['Algebra', 'Danilova', 302, '8:30 AM', 1],
        );
      },
      this.handleError,
      this.update,
    );
  };

  handleDrop = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('delete from lessons');
      },
      this.handleError,
      this.update,
    );
  };

  render() {
    const { lessons, refreshing } = this.state;
    const date = moment().format('dddd');

    const lessonsList = lessons.map((item, index) => (
      <LessonCard key={item.lesson_id} lesson={item} color={colors[index]}>
        {item}
      </LessonCard>
    ));

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ActionButton
          buttonColor="#3689E6"
          style={{ zIndex: 1 }}
          // position="center"
          fixNativeFeedbackRadius
          onPress={this.handleAdd}
          onLongPress={this.handleDrop}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Header>{date}</Header>
            <Date />
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              // marginTop: 38,
            }}
          >
            {lessonsList}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
