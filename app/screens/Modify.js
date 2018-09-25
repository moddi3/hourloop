import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, Picker, ToastAndroid, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Constants, LinearGradient } from 'expo';
import PropTypes from 'prop-types';

import { Container, Header, Input, TimePicker } from '../components';
import { ScheduleConsumer } from '../components/ScheduleContext';

class Modify extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dates: PropTypes.array,
    createLesson: PropTypes.func,
    editLesson: PropTypes.func,
  };

  state = {
    lesson: {
      title: null,
      teacher: null,
      room: null,
      day: this.props.navigation.state.params.activeDay,
      startsAt: null,
      endsAt: null,
    },
    error: {
      title: false,
      teacher: false,
      room: false,
      startsAt: false,
      endsAt: false,
    },
  };

  componentDidMount() {
    const lesson = this.props.navigation.getParam('lesson', null);
    lesson && this.setState({ lesson });
  }

  inputs = {};

  _handleInputChanges = (value, name) => {
    this.setState({ lesson: { ...this.state.lesson, [name]: value } });
    console.log(this.state);
  };

  _handlePickerChanges = day => this.setState({ lesson: { ...this.state.lesson, day } });

  isValid = () =>
    Object.entries(this.state.lesson).every((x) => {
      if (!x[1]) {
        this.setState({ error: { ...this.state.error, [x[0]]: true } });
        return false;
      }
      return true;
    });

  render() {
    const {
      title, teacher, room, day, startsAt, endsAt,
    } = this.state.lesson;
    const { error } = this.state;
    return (
      <Container paddingHorizontal={0}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <LinearGradient
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          colors={['#FF9671', '#F9F871']}
          style={{
            height: 160 + Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                position: 'absolute',
                top: 60,
                left: 20,
              }}
            >
              <View
                style={{
                  borderRadius: 24,
                  width: 48,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="md-arrow-round-back" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            <Header fontSize={34} color="#fff">
              {this.props.navigation.state.params.lesson ? 'Edit lesson' : 'Add lesson'}
            </Header>
          </View>
        </LinearGradient>
        <ScrollView
          contentContainerStyle={{ flex: 1, padding: 8 }}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
        >
          <View style={{ flexDirection: 'row' }}>
            <Input
              placeholder="Title"
              name="title"
              value={title}
              handleChanges={this._handleInputChanges}
              error={error.title}
            />
            <Input
              placeholder="Teacher"
              name="teacher"
              value={teacher}
              handleChanges={this._handleInputChanges}
              error={error.teacher}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Input
              placeholder="Room"
              name="room"
              value={`${room || ''}`}
              keyboardType="numeric"
              handleChanges={this._handleInputChanges}
              error={error.room}
              last
            />
            <View
              style={{
                flex: 2,
                borderRadius: 4,
                borderColor: '#eef0f2',
                backgroundColor: '#eef0f2',
                margin: 8,
              }}
            >
              <Picker
                mode="dropdown"
                selectedValue={day}
                style={{
                  height: 48,
                  color: '#333',
                }}
                onValueChange={this._handlePickerChanges}
              >
                {this.props.dates.map(date => (
                  <Picker.Item
                    key={date.toString()}
                    label={date.format('dddd')}
                    value={date.format('e')}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TimePicker
              name="startsAt"
              placeholder="Start"
              value={startsAt}
              onPress={this._handleInputChanges}
              error={error.startsAt}
            />
            <TimePicker
              name="endsAt"
              placeholder="End"
              value={endsAt}
              onPress={this._handleInputChanges}
              error={error.endsAt}
            />
          </View>
          <View
            style={{
              flex: 1,

              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                console.log(this.isValid());
                if (this.isValid()) {
                  this.props.navigation.state.params.lesson
                    ? this.props.editLesson(this.state.lesson)
                    : this.props.createLesson(this.state.lesson);
                  // console.log(this.props.navigation.state.params)
                  this.props.navigation.goBack();
                  this.props.navigation.state.params.setDay(this.state.lesson.day);
                } else {
                  ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
                }
              }}
              activeOpacity={0.5}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 8,
                height: 48,
                borderRadius: 4,
                borderColor: '#3689E6',
                backgroundColor: '#3689E6',
              }}
            >
              <Header color="#fff">
                {this.props.navigation.state.params.lesson ? 'Edit' : 'Add'}
              </Header>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default props => (
  <ScheduleConsumer>{context => <Modify {...context} {...props} />}</ScheduleConsumer>
);
