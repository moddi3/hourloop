import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

const Header = ({ children, fontSize = 20, color }) => {
  const headerStyles = [styles.header];
  if (fontSize) {
    headerStyles.push({ fontSize });
  }
  if (color) {
    headerStyles.push({ color });
  }

  return <Text style={headerStyles}>{children}</Text>;
};

Header.propTypes = {
  children: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};
export default Header;
