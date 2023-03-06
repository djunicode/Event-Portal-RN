/* Custom Tab navigator for event contents */
import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {About, Contact, Register, Gallery} from '../HomePage/EventContents.js';
import {bgColor, subtextColor, textColor, width} from '../../Constants';

const Tabs = ({data}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <View>
      <Tab.Navigator
        swipeEnabled={true}
        lazy={true}
        lazyPreloadDistance={0}
        lazyPlaceholder={() => (
          <ActivityIndicator
            style={{flex: 1, backgroundColor: bgColor}}
            color={textColor}
            size={'large'}
          />
        )}
        tabBarOptions={{
          labelStyle: styles.textLabel,
          indicatorStyle: styles.indicator,
          style: styles.tabBar,
        }}
        initialRouteName="About">
        <Tab.Screen
          name="About"
          children={() => <About about={data.eventDescription} />}
        />
        <Tab.Screen name="Gallery" children={() => <Gallery />} />
        <Tab.Screen
          name="Register"
          children={() => <Register register={data.registrationLink} />}
        />
        <Tab.Screen
          name="Contact"
          children={() => <Contact contact={data} />}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: 14,
    color: subtextColor,
    textTransform: 'none',
  },
  indicator: {
    borderColor: textColor,
    borderWidth: 1,
    alignContent: 'center',
  },
  tabBar: {
    width: (width * 6) / 7,
    alignSelf: 'center',
    elevation: 0,
    backgroundColor: bgColor,
  },
});

export default Tabs;
