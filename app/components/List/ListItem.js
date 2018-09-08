import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ListItem = ({ onPress, text }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#c4c4c4">
    <View style={styles.row}>
      <Text style={styles.text}>{text}</Text>
      <Feather name="chevron-right" size={24} color="#3689E6" />
    </View>
  </TouchableHighlight>
);

ListItem.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'open-sans-semibold',
    color: '#333',
  },
});
