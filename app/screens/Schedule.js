import React, { Component } from 'react';
import { ScrollView, View, StatusBar } from 'react-native';

// TODO: create a global index list for components
import Container from '../components/Container';
import Header from '../components/Text';
import Date from '../components/Date';
import LessonCard from '../components/Card';

import scheduleData from '../data/schedule';

const colors = [
  '#7A36B1',
  '#C6262E',
  '#F37329',
  '#485A6C',
  '#f9c440',
  '#68b723',
  '#715344',
  '#abacae',
];

class Home extends Component {
  state = {
    lessons: null,
  };

  componentWillMount() {
    this.setState({ lessons: scheduleData });
  }
  render() {
    const { lessons } = this.state;

    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Date />
        <Header fontSize={34}>Schedule</Header>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginTop: 38,
            }}
          >
            {/* {lessons.map(item =>
              Object.keys(item).map(day => (
                <View key={day.toString()}>
                  {item[day].map((lesson, index) => (
                    <LessonCard key={lesson.id} lesson={lesson} color={colors[index]} />
                  ))}
                </View>
              )))} */}
            {lessons.map((item, index) => (
              <LessonCard key={item.id} lesson={item} color={colors[index]}>
                {item}
              </LessonCard>
            ))}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
