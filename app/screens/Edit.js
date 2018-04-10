import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import { SQLite } from 'expo';

import moment from 'moment';

import { GiftedForm } from 'react-native-gifted-form';

// TODO: create a global index list for components
import Container from '../components/Container';

const db = SQLite.openDatabase('hourloop22.db');

class Add extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  state = {
    oldLesson: this.props.navigation.state.params.lesson,
    lesson: null,
  };

  handleSubmit = () => {
    const { id } = this.state.oldLesson;
    const {
      title, teacher, room, day, startsAt, endsAt,
    } = this.state.lesson;
    db.transaction((tx) => {
      tx.executeSql(
        'update lessons set title = ?, teacher = ?, room = ?, day = ?, startsAt = ?, endsAt = ? where id = ?;',
        [title, teacher, room, day, startsAt, endsAt, id],
        this.update,
        this.handleError,
      );
    });
    console.log(id);
  };
  handleValueChange = (values) => {
    this.setState({ lesson: values });
    console.log(values);
  };
  render() {
    const {
      title, teacher, room, day, startsAt, endsAt,
    } = this.state.oldLesson;

    return (
      <Container paddingHorizontal={0}>
        <StatusBar barStyle="light-content" />
        <GiftedForm
          formName="AddForm"
          onValueChange={this.handleValueChange}
          clearOnClose={false}
          defaults={{}}
          validators={{
            title: {
              title: 'Lesson Title',
              validate: [
                {
                  validator: 'isLength',
                  arguments: [1, 30],
                  message: '{TITLE} is required',
                },
              ],
            },
            teacher: {
              title: 'Teacher',
              validate: [
                {
                  validator: 'isLength',
                  arguments: [1, 30],
                  message: '{TITLE} is required',
                },
              ],
            },
            day: {
              title: 'Day',
              validate: [
                {
                  validator: 'isLength',
                  arguments: [1],
                  message: '{TITLE} is required',
                },
              ],
            },
            startsAt: {
              title: 'Start',
              validate: [
                {
                  validator: 'isLength',
                  arguments: [1],
                  message: '{TITLE} is required',
                },
              ],
            },
          }}
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.TextInputWidget
            name="title"
            title="Lesson Title"
            placeholder="Algebra"
            value={title}
          />
          <GiftedForm.TextInputWidget
            name="teacher"
            title="Teacher"
            placeholder="Danilova M V"
            value={teacher}
          />
          <GiftedForm.TextInputWidget
            name="room"
            title="Room"
            placeholder="302"
            keyboardType="numeric"
            value={`${room}`}
          />
          <GiftedForm.TextInputWidget name="day" title="Day" placeholder="Monday" value={day} />

          <GiftedForm.TextInputWidget
            name="startsAt"
            title="Start"
            placeholder="8:10 AM"
            value={startsAt}
          />
          <GiftedForm.TextInputWidget
            name="endsAt"
            title="End"
            placeholder="9:30 AM"
            value={endsAt}
          />

          <GiftedForm.ErrorsWidget />

          <GiftedForm.SubmitWidget
            title="Save"
            widgetStyles={{
              submitButton: {
                backgroundColor: '#3689E6',
              },
            }}
            onSubmit={(isValid) => {
              if (isValid === true) {
                this.handleSubmit();
                // this.props.navigation.navigate('Schedule', {
                //   activeDay: this.props.navigation.state.active,
                // });
                this.props.navigation.goBack();
              }
            }}
          />
        </GiftedForm>
      </Container>
    );
  }
}

export default Add;
