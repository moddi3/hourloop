import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

const Header = ({ children, fontSize = 20 }) => {
  const headerStyles = [styles.header];
  if (fontSize) {
    headerStyles.push({ fontSize });
  }
  return <Text style={headerStyles}>{children}</Text>;
};

Header.propTypes = {
  children: PropTypes.string,
  fontSize: PropTypes.number,
};
export default Header;
