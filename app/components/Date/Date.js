import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';

import styles from './styles';

const Date = class Date extends Component {
  state = {};
  render() {
    const day = this.props.day ? this.props.day : moment();
    const date = day.format('MMMM D');

    return <Text style={styles.text}>{date.toUpperCase()}</Text>;
  }
};

Date.propTypes = {
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};

export default Date;
