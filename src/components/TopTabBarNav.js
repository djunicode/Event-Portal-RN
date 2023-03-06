/* Tab navigator used in home screen to navigate through upcoming,latest and following events */
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Upcoming from '../screens/HomePage3/Upcoming';
import {bgColor, subtextColor, textColor} from '../Constants';
import {heightToDp, widthToDp} from '../Responsive';
import {PixelRatio, ActivityIndicator} from 'react-native';

const TopTab = createMaterialTopTabNavigator();

export default MyTopTabs = ({data, liked, getLiked}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <ActivityIndicator
      style={{flex: 1, backgroundColor: bgColor}}
      color={textColor}
      size={'large'}
    />
  ) : (
    <TopTab.Navigator
      backBehavior="Upcoming"
      lazy={true}
      lazyPreloadDistance={0}
      lazyPlaceholder={() => (
        <ActivityIndicator
          style={{flex: 1, backgroundColor: bgColor}}
          color={textColor}
          size={'large'}
        />
      )}
      removeClippedSubviews={true}
      tabBarOptions={{
        indicatorStyle: {backgroundColor: textColor},
        labelStyle: {
          fontSize: PixelRatio.getFontScale() * 15,
          color: subtextColor,
          textTransform: 'none',
          fontFamily: 'OpenSans-Regular',
        },
        tabStyle: {width: widthToDp('33'), height: heightToDp('8')},
        style: {backgroundColor: bgColor},
      }}>
      <TopTab.Screen
        name="Upcoming"
        children={() => (
          <Upcoming
            d={data}
            type={'upcoming'}
            liked={liked}
            getLiked={getLiked}
          />
        )}
        options={{tabBarLabel: 'Upcoming'}}
      />
      <TopTab.Screen
        name="Latest"
        //component={Latest}
        children={() => (
          <Upcoming
            d={data}
            type={'latest'}
            liked={liked}
            getLiked={getLiked}
          />
        )}
        options={{tabBarLabel: 'Latest'}}
      />
      <TopTab.Screen
        name="Following"
        //component={Following}
        children={() => (
          <Upcoming
            d={data}
            type={'following'}
            liked={liked}
            getLiked={getLiked}
          />
        )}
        options={{tabBarLabel: 'Following'}}
      />
    </TopTab.Navigator>
  );
};
