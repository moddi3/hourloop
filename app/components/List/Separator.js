import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => <View style={styles.separator} />;

export default Separator;

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    // height: StyleSheet.hairlineWidth,
    height: 1,
  },
});
