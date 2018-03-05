import React, { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import styles from './styles';

class Header extends Component {
  render() {
    const { children, fontSize = 20, color } = this.props;

    const headerStyles = [styles.header];
    if (fontSize) {
      headerStyles.push({ fontSize });
    }
    if (color) {
      headerStyles.push({ color });
    }
    return <Text style={[headerStyles, { fontFamily: 'circular-bold' }]}>{children}</Text>;

    // return this.state.fontLoaded ? (
    //   <Text style={[headerStyles, { fontFamily: 'circular-black' }]}>{children}</Text>
    // ) : null;
  }
}

Header.propTypes = {
  children: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};
export default Header;
