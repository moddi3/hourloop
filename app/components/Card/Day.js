import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import { withNavigation } from 'react-navigation';

import { Date, Header } from '../';
import LessonsList from './LessonsList';
import { ScheduleConsumer } from '../ScheduleContext';

const colors = [
  ['#c6262e', '#FA742B'],
  ['#FA742B', '#f9c440'],
  ['#f9c440', '#FAD7A1'],
  ['#FAD7A1', '#FF9D6C'],
  ['#FF9D6C', '#E96D71'],
  ['#E96D71', '#FFA8A8'],
  ['#FFA8A8', '#c6262e'],
];

class Day extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    lessons: PropTypes.arrayOf(PropTypes.object),
    refreshing: PropTypes.bool,
    day: PropTypes.object,
    onRefresh: PropTypes.func,
    isExpired: PropTypes.func,
    isOngoing: PropTypes.func,
    removeLesson: PropTypes.func,
    now: PropTypes.object,
  };

  state = {};

  handleLessonPress = (item) => {
    const params = this.props.navigation.state.params || {};
    params.actionSheet.show(item);
  };

  handleLongLessonPress = (item) => {
    this.props.removeLesson(item);
  };

  sortTime = (a, b) =>
    moment(a.startsAt, 'HH:mm').diff(moment(b.startsAt, 'HH:mm')) &&
    moment(a.endsAt, 'HH:mm').diff(moment(b.endsAt, 'HH:mm'));

  filteredData = day =>
    this.props.lessons.filter(lesson => lesson.day === day.format('e')).sort(this.sortTime);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30,
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Header color="#666" fontSize={15}>
            {this.props.day.format('dddd')}
          </Header>
          <Date day={this.props.day} />
        </View>
        <LessonsList
          rowData={this.filteredData(this.props.day)}
          colors={colors[this.props.day.weekday()]}
          isLessonExpired={this.props.isExpired}
          isLessonOngoing={this.props.isOngoing}
          now={this.props.now}
          refreshing={this.props.refreshing}
          onRefresh={this.props.onRefresh}
          onLessonPress={this.handleLessonPress}
          onLongLessonPress={this.handleLongLessonPress}
        />
      </View>
    );
  }
}

const DayWithNav = withNavigation(Day);
export default props => (
  <ScheduleConsumer>{context => <DayWithNav {...context} {...props} />}</ScheduleConsumer>
);
