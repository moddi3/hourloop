import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Schedule from '../screens/Schedule';

export default TabNavigator(
  {
    Home: { screen: Home },
    Schedule: { screen: Schedule },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          // iconName = `md-home${focused ? '' : '-outline'}`;
          iconName = 'md-home';
        } else if (routeName === 'Schedule') {
          iconName = 'md-calendar';
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    swipeEnabled: false,
    lazy: false,
    tabBarOptions: {
      activeTintColor: '#3689E6',
      inactiveTintColor: '#666',
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
