import React, { Component } from 'react';
import { Text } from 'react-native';
import moment from 'moment';

import styles from './styles';

const Date = class Date extends Component {
  state = {
    date: null,
  };

  componentWillMount() {
    const date = moment().format('MMMM D');
    this.setState({ date });
  }

  render() {
    const { date } = this.state;
    return <Text style={styles.text}>{date.toUpperCase()}</Text>;
  }
};

export default Date;
