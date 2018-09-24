import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import Placeholder from 'rn-placeholder';

import Header from '../Text';
import styles from './styles';

import { Animations } from '../';
import { ScheduleConsumer } from '../ScheduleContext';

class LessonCard extends Component {
  static propTypes = {
    lesson: PropTypes.object,
    colors: PropTypes.arrayOf(PropTypes.string),
    onLongPressItem: PropTypes.func,
    onPressItem: PropTypes.func.isRequired,
    ongoing: PropTypes.bool,
    expired: PropTypes.bool,
    refreshing: PropTypes.bool,
  };

  static defaultProps = {
    colors: ['#FF9671', '#F9F871'],
  };

  state = {};

  _onPress = () => {
    this.props.onPressItem(this.props.lesson);
  };

  _onLongPress = () => {
    this.props.onLongPressItem(this.props.lesson);
  };

  render() {
    const {
      lesson, colors, ongoing, expired, refreshing,
    } = this.props;

    const containerStyles = [styles.container];

    if (expired) {
      containerStyles.push(styles.expired);
    }
    return (
      // <Placeholder.ImageContent
      //   size={95}
      //   animate="fade"
      //   lineNumber={5}
      //   lineSpacing={6}
      //   lastLineWidth="30%"
      //   onReady={!refreshing}
      // >
      <TouchableNativeFeedback
        onPress={this._onPress}
        onLongPress={this._onLongPress}
        // useForeground
        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3)', true)}
      >
        <View style={containerStyles}>
          <LinearGradient
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 0.0 }}
            colors={colors}
            style={styles.card}
          >
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <LessonTitle title={lesson.title} />
              {ongoing && <Animations.Beacon />}
              {/* <IsFavourite status={lesson.fav} /> */}
              {/* <Text>{lesson.day}</Text> */}
            </View>
            <LessonTeacher name={lesson.teacher} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <View>
                <LessonTime start={lesson.startsAt} end={lesson.endsAt} />
              </View>
              <LessonLocation place={lesson.room} />
            </View>
          </LinearGradient>
        </View>
      </TouchableNativeFeedback>
      // </Placeholder.ImageContent>
    );
  }
}

const LessonTitle = ({ title }) => (
  <Header fontSize={22} color="#fff">
    {title}
  </Header>
);

const LessonTeacher = ({ name }) => (
  <Text
    style={{
      color: '#fff',
      fontSize: 13,
      fontFamily: 'open-sans-light',
    }}
  >
    {name}
  </Text>
);

const IsFavourite = ({ status }) =>
  (status ? (
    <Ionicons name="md-heart" size={25} color="#fff" />
  ) : (
    <Ionicons name="md-heart-outline" size={25} color="#fff" />
  ));

const LessonTime = ({ start, end }) => (
  <Text
    style={{
      color: '#fff',
      fontSize: 13,
      fontFamily: 'open-sans-bold',
    }}
  >
    {start} - {end}
  </Text>
);

const LessonLocation = ({ place }) => (
  <View style={styles.row}>
    <Ionicons name="md-pin" size={15} color="#fff" />
    <Text
      style={{
        color: '#fff',
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        marginLeft: 3,
      }}
    >
      {place}
    </Text>
  </View>
);

LessonTitle.propTypes = {
  title: PropTypes.string,
};

LessonTeacher.propTypes = {
  name: PropTypes.string,
};

IsFavourite.propTypes = {
  status: PropTypes.number,
};

LessonTime.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};

LessonLocation.propTypes = {
  place: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default props => (
  <ScheduleConsumer>
    {({ refreshing }) => <LessonCard refreshing={refreshing} {...props} />}
  </ScheduleConsumer>
);

// export default LessonCard;
