import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

class Header extends Component {
  render() {
    const {
      children, fontSize = 20, color, style,
    } = this.props;

    const headerStyles = [styles.header];
    if (fontSize) {
      headerStyles.push({ fontSize });
    }
    if (color) {
      headerStyles.push({ color });
    }
    return (
      <Text style={[headerStyles, { fontFamily: 'open-sans-extrabold' }, { ...style }]}>
        {children}
      </Text>
    );
  }
}

Header.propTypes = {
  children: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
};
export default Header;
