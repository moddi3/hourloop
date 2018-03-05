import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';

const Container = ({ children, paddingHorizontal = 10 }) => {
  const containerStyles = [styles.container];
  if (paddingHorizontal) {
    containerStyles.push({ paddingHorizontal });
  }
  return <View style={containerStyles}>{children}</View>;
};

Container.propTypes = {
  children: PropTypes.any,
  paddingHorizontal: PropTypes.number,
};

export default Container;
