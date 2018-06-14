import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Alert, ToastAndroid } from 'react-native';
import { SQLite, Linking } from 'expo';

const db = SQLite.openDatabase('hourloop.db');

db.transaction((tx) => {
  tx.executeSql(`create table if not exists lessons 
  (id integer primary key not null, title text, teacher text, room integer, day, startsAt text, endsAt text);`);
});

const ScheduleContext = React.createContext({
  lessons: [],
  url: null,
  dates: [],
  refreshing: true,
  onRefresh: () => null,
  isExpired: () => null,
  isOngoing: () => null,
  updateLessons: () => null,
  createLesson: () => null,
  importLessons: () => null,
  editLesson: () => null,
  removeLesson: () => null,
});

export const ScheduleConsumer = ScheduleContext.Consumer;
export class ScheduleProvider extends React.Component {
  state = {
    lessons: [],
    imported: 0,
    url: null,
    refreshing: true,
    dates: Array.from(new Array(7), (val, index) => index).map(dow => moment().weekday(dow)),
  };

  componentWillMount() {
    this.updateLessons();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.updateLessons();
  };
  s;

  updateLessons = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from lessons;', [], (_, { rows: { _array } }) => {
        this.setState({
          lessons: _array,
          refreshing: false,
          url: Linking.makeUrl('Schedule', { lessons: _array }),
        });
      });
    });
  };

  createLesson = ({
    title, teacher, room, day, startsAt, endsAt,
  }) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into lessons (title, teacher, room, day, startsAt, endsAt) values(?, ?, ?, ?, ?, ?);',
          [title, teacher, room, day, startsAt, endsAt],
        );
      },
      null,
      () => {
        this.updateLessons();
        ToastAndroid.show(`Lesson "${title}" successfully created`, ToastAndroid.SHORT);
      },
    );
  };

  importLessons = (lessons) => {
    db.transaction(
      (tx) => {
        lessons.forEach(({
          id, title, teacher, room, day, startsAt, endsAt,
        }) => {
          tx.executeSql(
            'insert or ignore into lessons (id, title, teacher, room, day, startsAt, endsAt) values(?, ?, ?, ?, ?, ?, ?);',
            [id, title, teacher, room, day, startsAt, endsAt],
            (_, { insertId }) => {
              if (insertId !== -1) {
                this.setState({ imported: this.state.imported + 1 });
              }
            },
          );
        });
      },
      null,
      () => {
        this.updateLessons();
        ToastAndroid.show(
          `${this.state.imported} lessons successfully imported`,
          ToastAndroid.SHORT,
        );
      },
    );
  };

  editLesson = ({
    title, teacher, room, day, startsAt, endsAt, id,
  }) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'update lessons set title = ?, teacher = ?, room = ?, day = ?, startsAt = ?, endsAt = ? where id = ?;',
          [title, teacher, room, day, startsAt, endsAt, id],
        );
      },
      null,
      this.updateLessons,
    );
  };

  removeLesson = ({ id, title }) => {
    Alert.alert(
      `Remove "${title}"`,
      'Do you really want to remove this lesson?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            db.transaction(
              (tx) => {
                tx.executeSql('delete from lessons where id = ?;', [id]);
              },
              null,
              () => {
                this.updateLessons();
                ToastAndroid.show(`Lesson "${title}" successfully deleted`, ToastAndroid.SHORT);
              },
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  isExpired = (lesson, now) => {
    if (
      (moment(lesson.endsAt, 'H:mm').isBefore(now) && lesson.day === moment().format('e')) ||
      moment(lesson.day, 'e').isBefore(moment().startOf('day'))
    ) {
      return true;
    }
    return false;
  };

  isOngoing = (lesson, now) => {
    if (
      moment(lesson.startsAt, 'H:mm').isBefore(now) &&
      moment(lesson.endsAt, 'H:mm').isAfter(now) &&
      lesson.day === moment().format('e')
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <ScheduleContext.Provider
        value={{
          lessons: this.state.lessons,
          url: this.state.url,
          dates: this.state.dates,
          refreshing: this.state.refreshing,
          onRefresh: this.onRefresh,
          isExpired: this.isExpired,
          isOngoing: this.isOngoing,
          updateLessons: this.updateLessons,
          createLesson: this.createLesson,
          importLessons: this.importLessons,
          editLesson: this.editLesson,
          removeLesson: this.removeLesson,
        }}
      >
        {this.props.children}
      </ScheduleContext.Provider>
    );
  }
}

ScheduleProvider.propTypes = {
  children: PropTypes.any,
};
