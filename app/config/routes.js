import React from 'react';
import { TouchableNativeFeedback, View, Share } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Feather } from '@expo/vector-icons';

// import Home from '../screens/Home';
import Modify from '../screens/Modify';
import Settings from '../screens/Settings';
import Schedule from '../screens/Schedule';
import More from '../screens/More';
import Others from '../screens/Others';
// import Add from '../screens/Add';
// import Edit from '../screens/Edit';
import { Header } from '../components';

const headerStyle = {
  paddingLeft: 10,
  paddingRight: 5,
};

const headerTitle = title => <Header fontSize={28}>{title}</Header>;

const ScheduleStack = createStackNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: ({ navigation }) => {
      const params = navigation.state.params || {};
      return {
        headerTitle: headerTitle(navigation.state.routeName),
        headerStyle,
        headerRight: (
          <View style={{ flexDirection: 'row' }}>
            <TouchableNativeFeedback
              onPress={() => params.setDay()}
              background={TouchableNativeFeedback.Ripple('#3333', true)}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 36,
                  height: 36,
                }}
              >
                <Feather name="eye" size={24} color="#3689E6" />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                Share.share(
                  {
                    title: 'Share schedule',
                    message: params.url,
                    url: params.url,
                  },
                  { dialogTitle: 'Share schedule' },
                )
              }
              background={TouchableNativeFeedback.Ripple('#3333', true)}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 36,
                  height: 36,
                }}
              >
                <Feather name="share" size={24} color="#333" />
              </View>
            </TouchableNativeFeedback>
          </View>
        ),
      };
    },
  },
  Add: { screen: Modify, navigationOptions: { header: null } },
  Edit: { screen: Modify, navigationOptions: { header: null } },
});

const MoreStack = createStackNavigator(
  {
    More: {
      screen: More,
      navigationOptions: {
        header: null,
      },
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

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    More: MoreStack,
    Settings,
    // Home: { screen: Home },
    // Modify: { screen: Others },
  },
  {
    shifting: true,
    // labeled: false,
    activeTintColor: '#3689E6',
    inactiveTintColor: '#999',
    barStyle: { backgroundColor: '#fff' },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Schedule':
            iconName = 'calendar';
            // iconName = 'clock';
            break;
          case 'More':
            iconName = 'inbox';
            // iconName = 'file-text';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
          default:
            iconName = 'layers';
            break;
        }
        return <Feather name={iconName} size={24} color={tintColor} />;
      },
    }),
  },
);

export default createStackNavigator(
  {
    TabNavigator,
  },
  {
    navigationOptions: { header: null },
  },
);

// export default createStackNavigator(
//   { Settings },
//   {
//     navigationOptions: { header: null },
//   },
// );
