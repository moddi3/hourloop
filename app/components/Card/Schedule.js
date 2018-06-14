// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withNavigation } from 'react-navigation';
// import moment from 'moment';

// import { View, ViewPagerAndroid } from 'react-native';

// import LessonsList from './LessonsList';
// import { ScheduleConsumer } from '../ScheduleContext';

// class Schedule extends Component {
//   state = {
//     selected: null,
//   };

//   getDates = () =>
//     Array.from(new Array(7), (val, index) => index).map(dow => moment().weekday(dow));

//   filteredData = day =>
//     this.props.lessons
//       .filter(lesson => lesson.day === day.format('dddd') || lesson.day == day.format('e'))
//       .sort((a, b) => moment(a.startsAt, 'HH:mm').diff(moment(b.startsAt, 'HH:mm')));

//   handleLessonPress = (item) => {
//     this.setState({ selected: item });

//     this.props.navigation.navigate('Edit', { lesson: this.state.selected });
//   };

//   handleLongLessonPress = (item) => {
//     this.props.removeLesson(item);
//   };
//   render() {
//     const dates = this.getDates();
//     return (
//       <View style={{ flex: 3 }}>
//         <ViewPagerAndroid style={{ flex: 1 }}>
//           {dates.map((day, index) => (
//             <View key={index.toString()} style={{ flex: 1 }}>
//               <LessonsList
//                 rowData={this.filteredData(day)}
//                 isExpired={this.props.isExpired}
//                 isOngoing={this.props.isOngoing}
//                 refreshing={this.props.refreshing}
//                 onRefresh={this.props.onRefresh}
//                 onLessonPress={this.handleLessonPress}
//                 onLongLessonPress={this.handleLongLessonPress}
//               />
//             </View>
//           ))}
//         </ViewPagerAndroid>
//       </View>
//     );
//   }
// }

// Schedule.propTypes = {
//   lessons: PropTypes.arrayOf(PropTypes.object),
//   isExpired: PropTypes.func,
//   isOngoing: PropTypes.func,
//   refreshing: PropTypes.bool,
//   onRefresh: PropTypes.func,
//   navigation: PropTypes.object,
// };

// const ScheduleWithNav = withNavigation(Schedule);
// export default props => (
//   <ScheduleConsumer>{context => <ScheduleWithNav {...context} {...props} />}</ScheduleConsumer>
// );
