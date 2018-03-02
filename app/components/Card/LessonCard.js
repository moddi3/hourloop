import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from '../Text';
import styles from './styles';

class LessonCard extends Component {
  state = {};

  handlePress = (data) => {
    const lesson = `
      Title: ${data.title}
      Teacher: ${data.teacher},
      Room: ${data.room},
      StartsAt: '${data.startsAt}',
      Fav: ${data.fav},
      Tasks:,
    `;
    alert(lesson);
  };

  render() {
    const { lesson, color = '#abacae' } = this.props;

    const cardStyles = [styles.card];

    if (color) cardStyles.push({ backgroundColor: color });

    return (
      <TouchableHighlight onPress={() => this.handlePress(lesson)} style={styles.container}>
        <View style={cardStyles}>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <LessonTitle title={lesson.title} />
            <IsFavourite status={lesson.fav} />
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
              {/* <Text style={{ color: '#fff', fontSize: 8 }}>
                You have {lesson.tasks.length} tasks
              </Text> */}
              <LessonStart time={lesson.startsAt} />
            </View>
            <LessonLocation place="302" />
          </View>
        </View>
      </TouchableHighlight>
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
      fontWeight: '100',
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

const LessonStart = ({ time }) => (
  <Text
    style={{
      color: '#fff',
      fontSize: 13,
      fontWeight: '700',
    }}
  >
    {time}
  </Text>
);

const LessonLocation = ({ place }) => (
  <View style={styles.row}>
    <Ionicons name="md-pin" size={15} color="#fff" />
    <Text
      style={{
        color: '#fff',
        fontSize: 15,
        fontWeight: '200',
        marginLeft: 3,
      }}
    >
      {place}
    </Text>
  </View>
);

LessonCard.propTypes = {
  lesson: PropTypes.object,
  color: PropTypes.string,
};

LessonTitle.propTypes = {
  title: PropTypes.string,
};

LessonTeacher.propTypes = {
  name: PropTypes.string,
};

IsFavourite.propTypes = {
  status: PropTypes.number,
};

LessonStart.propTypes = {
  time: PropTypes.string,
};

LessonLocation.propTypes = {
  place: PropTypes.string,
};

export default LessonCard;
