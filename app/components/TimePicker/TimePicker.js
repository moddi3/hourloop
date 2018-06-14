import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, TimePickerAndroid, TouchableOpacity, StyleSheet } from 'react-native';

class TimePicker extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
  };

  state = {
    time: null,
  };

  _timePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        is24Hour: true,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({ time: moment(`${hour}:${minute}`, 'H:m').format('HH:mm') });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  _onPress = () => {
    const { onPress, name } = this.props;
    this._timePicker().then(() => onPress && this.props.onPress(this.state.time, name));
  };
  render() {
    const placeholderStyles = [styles.placeholder];

    if (this.props.error) placeholderStyles.push({ color: '#ff8c82' });
    const title =
      this.state.time || this.props.value ? (
        <Text style={styles.text}>{this.state.time || this.props.value}</Text>
      ) : (
        <Text style={[styles.text, placeholderStyles]}>{this.props.placeholder}</Text>
      );
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.button}>
        {title}
      </TouchableOpacity>
    );
  }
}

export default TimePicker;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#eef0f2',
    backgroundColor: '#eef0f2',
  },
  text: {
    fontFamily: 'open-sans',
    color: '#333',
    fontSize: 16,
  },
  placeholder: {
    color: '#C7C7CD',
  },
});
