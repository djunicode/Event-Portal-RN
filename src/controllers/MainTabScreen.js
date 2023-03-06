import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {statusbarColor, textColor} from '../Constants';
import {HomePage} from '../screens/HomePage3/HomePage';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import Committee from '../screens/Committeescreen/CommitteeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import EventsScreen from '../screens/HomePage3/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen/Profile';
import ReferralCount from '../screens/ProfileScreen/ReferralCount';
import AssignTask from '../screens/ProfileScreen/AssignTask';
import ViewTask from '../screens/ProfileScreen/ViewTask';


const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => {
  const BottomTab = createMaterialBottomTabNavigator();
  return (
    <BottomTab.Navigator
      labeled={true}
      shifting={true}
      tabBarOptions={{
        style: {height: 50},
      }}
      initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarColor: statusbarColor,
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={textColor}
              size={26}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarColor: statusbarColor,
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'md-search-sharp' : 'md-search-outline'}
              color={textColor}
              size={27}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarColor: statusbarColor,
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={textColor}
              size={26}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomePage} />
      <HomeStack.Screen name="Event" component={EventsScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerShown: false,
      }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Committee" component={Committee} />
    </SearchStack.Navigator>
  );
};
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ReferralCount" component={ReferralCount} /> 
      <ProfileStack.Screen name="AssignTask" component={AssignTask} />
      <ProfileStack.Screen name="ViewTask" component={ViewTask} />
    </ProfileStack.Navigator>
  );
};

export default MainTabScreen;
