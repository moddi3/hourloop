import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View } from 'react-native';

class Input extends Component {
  state = {};

  _onChangeText = (value) => {
    this.props.handleChanges(value, this.props.name);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          {...this.props}
          autoCapitalize="words"
          underlineColorAndroid="transparent"
          style={styles.input}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.error ? '#ff8c82' : '#C7C7CD'}
          selectionColor="#A3BDF3"
          onChangeText={this._onChangeText}
          returnKeyType={this.props.last ? 'done' : 'next'}
          editable
        />
      </View>
    );
  }
}

export default Input;
Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleChanges: PropTypes.func,
  last: PropTypes.bool,
  error: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    borderRadius: 4,
    borderColor: '#eef0f2',
    backgroundColor: '#eef0f2',
    margin: 8,
  },
  input: {
    height: 48,
    paddingHorizontal: 10,
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#333',
  },
});
