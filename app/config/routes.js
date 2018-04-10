import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

// import Home from '../screens/Home';
import Schedule from '../screens/Schedule';
import More from '../screens/More';
import Others from '../screens/Others';
import Add from '../screens/Add';
import Edit from '../screens/Edit';

import Header from '../components/Text';

const headerStyle = { paddingLeft: 10 };

const headerTitle = title => <Header fontSize={28}>{title}</Header>;

const MoreStack = StackNavigator(
  {
    More: {
      screen: More,
    },
    Subjects: {
      screen: props => <Others {...props} type="subjects" />,
    },
    Teachers: {
      screen: props => <Others {...props} type="teachers" />,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: headerTitle(navigation.state.routeName),
      headerStyle,
    }),
  },
);

const ScheduleStack = StackNavigator(
  { Schedule: { screen: Schedule }, Add: { screen: Add }, Edit: { screen: Edit } },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: headerTitle(navigation.state.routeName),
      headerStyle,
    }),
  },
);

const Tabs = TabNavigator(
  {
    Schedule: {
      screen: ScheduleStack,
      navigationOptions: {
        header: null,
      },
    },
    // Home: { screen: Home },
    More: {
      screen: MoreStack,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: headerTitle(navigation.state.routeName),
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'md-home';
            break;
          case 'Schedule':
            iconName = 'md-calendar';
            break;
          case 'More':
            iconName = 'md-list-box';
            break;
          default:
            iconName = 'logo-android';
            break;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#3689E6',
      inactiveTintColor: '#999',
      pressColor: 'rgba(54, 137, 230, 0.2)',
      style: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        elevation: 12,
      },
      labelStyle: {
        fontSize: 10,
        marginBottom: 5,
      },
    },
  },
);

export default StackNavigator(
  {
    screen: Tabs,
  },
  {
    navigationOptions: {
      headerStyle,
    },
  },
);
