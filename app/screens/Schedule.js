import React, { Component } from 'react';
import { Alert, View, ViewPagerAndroid, Text, Linking, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { Linking as ExpoLinking } from 'expo';

import { Container, ActionSheet, Header, Day } from '../components';
import { ScheduleConsumer } from '../components/ScheduleContext';

const CANCEL_INDEX = 0;

const options = [
  <Text style={{ color: '#3689E6', fontFamily: 'open-sans-bold', fontSize: 18 }}>Cancel</Text>,
  <Text style={{ color: '#333', fontFamily: 'open-sans', fontSize: 18 }}>Edit</Text>,
  <Text style={{ color: '#ff3b30', fontFamily: 'open-sans', fontSize: 18 }}>Remove</Text>,
];

class ScheduleScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    removeLesson: PropTypes.func,
    dates: PropTypes.array,
    url: PropTypes.string,
    importLessons: PropTypes.func,
  };

  state = {
    activeDay: moment().format('e'),
    today: moment().weekday(),
    selected: null,
    now: moment(),
  };

  componentDidMount() {
    this.interval = setInterval(this.updateMoment, 3000);

    Linking.getInitialURL().then((url) => {
      this._handleUrl(url);
    });
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this._setParams(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    Linking.removeEventListener('url', this._handleUrl);
  }

  _setParams = (props) => {
    this.props.navigation.setParams({
      setDay: this._setDay,
      url: props.url || this.props.url,
      actionSheet: { show: this.showActionSheet },
    });
  };

  _handleUrl = (url) => {
    const URI = new Promise((resolve) => {
      resolve(ExpoLinking.parse(url));
    });
    URI.then(({ queryParams }) => {
      if (queryParams.lessons) {
        Alert.alert(
          'Import lessons',
          `Do you want to import ${queryParams.lessons.length} lessons?`,
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                this.props.importLessons(queryParams.lessons);
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
  };

  updateMoment = () => {
    this.setState({ now: moment() });
  };

  _setDay = (day) => {
    this.pageRef.current.setPage(parseInt(day, 10) || this.state.today);
  };

  pageRef = React.createRef();

  _onPageSelected = (e) => {
    this.setState({ activeDay: e.nativeEvent.position.toString() });
  };

  showActionSheet = (item) => {
    this.setState({ selected: item });
    this.actionSheet.show();
  };

  hideActionSheet = () => {
    this.actionSheet.hide();
  };

  handleOptionPress = (action) => {
    this.hideActionSheet();
    if (action === 2) {
      this.props.removeLesson(this.state.selected);
    } else if (action === 1) {
      this.props.navigation.navigate('Edit', {
        lesson: this.state.selected,
        ...this.props.navigation.state.params,
      });
    } else alert(action);
  };

  renderSchedule = () =>
    this.props.dates.map(day => (
      <View key={day.toString()}>
        <Day day={day} now={this.state.now} />
      </View>
    ));

  render() {
    // this.props.lessons.map(item => console.log(item));
    const { selected } = this.state;
    const title = selected && (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Header>{selected.title}</Header>
        </View>
        <Text style={{ color: '#333', fontFamily: 'open-sans-bold' }}>
          {selected.startsAt} - {selected.endsAt}
        </Text>
      </View>
    );

    return (
      <Container paddingHorizontal={0}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ActionButton
          buttonColor="#3689E6"
          style={{ zIndex: 1 }}
          offsetX={0}
          offsetY={15}
          renderIcon={() => <Feather name="plus" size={20} color="#fff" />}
          position="center"
          useNativeFeedback
          fixNativeFeedbackRadius
          onPress={() =>
            this.props.navigation.navigate('Add', {
              activeDay: this.state.activeDay,
              ...this.props.navigation.state.params,
            })
          }
          onLongPress={this.handleDrop}
        />
        <ActionSheet
          isVisible={this.state.isVisible === 'actionSheet'}
          title={title}
          ref={(c) => {
            this.actionSheet = c;
          }}
          options={options}
          cancelIndex={CANCEL_INDEX}
          onBackdropPress={this.hideActionSheet}
          onPress={this.handleOptionPress}
        />

        <ViewPagerAndroid
          style={{ flex: 1 }}
          pageMargin={10}
          initialPage={this.state.today}
          onPageSelected={this._onPageSelected}
          ref={this.pageRef}
        >
          {this.renderSchedule()}
        </ViewPagerAndroid>
      </Container>
    );
  }
}

export default props => (
  <ScheduleConsumer>{context => <ScheduleScreen {...context} {...props} />}</ScheduleConsumer>
);
