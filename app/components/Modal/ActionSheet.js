import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

class ActionSheet extends Component {
  state = {
    isVisible: false,
  };

  show = () => {
    this.setState({ isVisible: true });
  };
  hide = () => {
    this.setState({ isVisible: false });
  };

  renderTitle = () => {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    if (React.isValidElement(title)) {
      return <View style={styles.title}>{title}</View>;
    }

    return (
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    );
  };

  renderButton(title, index) {
    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor="#e2e2e2"
        style={[styles.buttonWrapper]}
        onPress={() => {
          this.props.onPress ? this.props.onPress(index) : null;
        }}
      >
        <Text style={{}}>{title}</Text>
      </TouchableHighlight>
    );
  }

  renderCancelButton = () => {
    const { cancelIndex, options } = this.props;

    if (cancelIndex > -1 && options[cancelIndex]) {
      return (
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#e2e2e2"
          style={[styles.buttonWrapper, { marginTop: 6 }]}
          onPress={this.props.onBackdropPress}
        >
          <Text> {options[cancelIndex]}</Text>
        </TouchableHighlight>
      );
    }
    return null;
  };

  renderOptions = () => {
    const { options, cancelIndex } = this.props;
    return options.map((item, index) => index !== cancelIndex && this.renderButton(item, index));
  };

  render() {
    const { onBackdropPress, title } = this.props;
    const { isVisible } = this.state;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackdropPress}
        style={styles.container}
        title={title}
      >
        <View style={styles.modalContent}>
          {this.renderTitle()}
          {this.renderOptions()}
        </View>
        {this.renderCancelButton()}
      </Modal>
    );
  }
}

ActionSheet.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelIndex: PropTypes.number,
  onBackdropPress: PropTypes.func,
  onPress: PropTypes.func,
};

export default ActionSheet;
