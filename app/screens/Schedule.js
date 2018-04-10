import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  RefreshControl,
  Text,
  ViewPagerAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';

import moment from 'moment';
import { SQLite } from 'expo';

// TODO: create a global index list for components
import Container from '../components/Container';
import Header from '../components/Text';
import Date from '../components/Date';
import LessonCard from '../components/Card';
import { ActionSheet } from '../components/Modal';

const db = SQLite.openDatabase('hourloop22.db');

const CANCEL_INDEX = 0;

const options = [
  <Text style={{ color: '#3689E6', fontFamily: 'circular-bold', fontSize: 18 }}>Cancel</Text>,
  <Text style={{ color: '#333', fontFamily: 'circular-regular', fontSize: 18 }}>Edit</Text>,
  <Text style={{ color: '#ff3b30', fontFamily: 'circular-regular', fontSize: 18 }}>Remove</Text>,
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

db.transaction((tx) => {
  // tx.executeSql('drop table lessons');
  tx.executeSql(`create table if not exists lessons 
  (id integer primary key not null, title text, teacher text, room integer, day, startsAt text, endsAt text);`);
});

const colors = ['#7A36B1', '#C6262E', '#F37329', '#485A6C', '#f9c440', '#68b723', '#715344'];

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    // dispatch: PropTypes.func,
  };
  state = {
    lessons: [],
    refreshing: true,
    selected: null,
    activeDay: moment().isoWeekday(),
  };

  componentWillMount() {
    this.update();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.update();
  };

  setPage = (page) => {
    this.viewpager.setPage(page);
  };

  update = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from lessons;', [], (_, { rows: { _array } }) => {
        this.setState({ lessons: _array, refreshing: false });
      });
    });
  };

  handleError = (error) => {
    throw new Error(error);
  };

  handleAdd = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        'insert into lessons (title, teacher, room, day, startsAt, endsAt) values(?, ?, ?, ?, ?, ?);',
        [data.title, data.teacher, data.room, data.day, data.startsAt, data.endsAt],
        this.update,
        this.handleError,
      );
    });
    this.hideModal();
  };

  handleDrop = () => {
    db.transaction((tx) => {
      tx.executeSql('delete from lessons', [], this.update, this.handleError);
    });
  };

  handleRemove = (id) => {
    Alert.alert(
      `Remove "${this.state.selected.title}"`,
      'Do you really want to remove this lesson?',
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                'delete from lessons where id = ?;',
                [id],
                this.update,
                this.handleError,
              );
            });
            ToastAndroid.show(
              `Lesson "${this.state.selected.title}" successfully deleted`,
              ToastAndroid.SHORT,
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  showActionSheet = () => {
    this.actionSheet.show();
  };

  hideActionSheet = () => {
    this.actionSheet.hide();
  };

  showAddForm = () => {
    this.setState({ isVisible: 'addForm' });
  };

  hideModal = () => {
    this.setState({ isVisible: null });
  };

  handleLessonPress = (item) => {
    this.showActionSheet();
    this.setState({ selected: item });
    console.log(item);
  };

  handleLongLessonPress = (item) => {
    this.setState({ selected: item });
    this.handleRemove(item.id);
  };

  handleOptionPress = (action) => {
    this.hideActionSheet();
    if (action === 2) {
      this.handleRemove(this.state.selected.id);
    } else if (action === 1) {
      this.props.navigation.navigate('Edit', { lesson: this.state.selected });
    } else alert(action);
  };

  render() {
    const {
      lessons, refreshing, selected, activeDay,
    } = this.state;

    const title = selected && (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Header>{selected.title}</Header>
        </View>
        <Text style={{ color: '#333', fontFamily: 'circular-regular' }}>{selected.startsAt}</Text>
      </View>
    );

    const lessonsList = DAYS.map((page, index) => (
      <View key={page}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Header>{page}</Header>
            <Date day={activeDay} />
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              // marginTop: 38,
            }}
          >
            {lessons
              .filter(lesson => lesson.day === DAYS[index])
              .sort((a, b) => moment(a.startsAt, 'HH:mm').diff(moment(b.startsAt, 'HH:mm')))
              .map(item => (
                <LessonCard
                  key={item.id}
                  lesson={item}
                  color={colors[index]}
                  onPress={() => this.handleLessonPress(item)}
                  onLongPress={() => this.handleLongLessonPress(item)}
                >
                  {item}
                </LessonCard>
              ))}
          </View>
        </ScrollView>
      </View>
    ));

    return (
      <Container>
        <StatusBar barStyle={this.state.barStyle} />
        <ActionButton
          buttonColor="#3689E6"
          style={{ zIndex: 1 }}
          fixNativeFeedbackRadius
          onPress={() => this.props.navigation.navigate('Add', { activeDay })}
          onLongPress={this.handleDrop}
        />
        <ActionSheet
          isVisible={this.state.isVisible === 'actionSheet'}
          title={title}
          ref={(c) => {
            this.actionSheet = c;
          }}
          options={options}
          cancelIndex={CANCEL_INDEX}
          onBackdropPress={this.hideActionSheet}
          onPress={this.handleOptionPress}
        />

        <ViewPagerAndroid
          style={{
            flex: 1,
          }}
          pageMargin={10}
          initialPage={activeDay - 1}
          onPageSelected={(e) => {
            this.setState({ activeDay: e.nativeEvent.position + 1 }, () => {});
          }}
          ref={(c) => {
            this.viewpager = c;
          }}
        >
          {lessonsList}
        </ViewPagerAndroid>
      </Container>
    );
  }
}

export default Home;
