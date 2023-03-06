/* Home screen of the application that is displayed on signing in.
 The function  getLikedEvents is used to show the events liked by the current user.
 Props are passed to the upcoming screen */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header} from 'react-native-elements';
import SearchBar from '../../components/SearchBar';
import MyTopTabs from '../../components/TopTabBarNav';
import {
  backDropColor,
  bgColor,
  statusbarColor,
  subtextColor,
} from '../../Constants';
import {AuthContext} from '../../Authentication/AuthProvider';
import axios from '../../controllers/axios';
import {heightToDp, widthToDp} from '../../Responsive';
import {PixelRatio} from 'react-native';
import Upcoming from './Upcoming';
import NetInfo from '@react-native-community/netinfo';
import NoInternetModal from '../../components/NoInternetModal';

const image = require('../../images/profile.jpg');

export function HomePage() {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);
  const [isOffline, setOfflineStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const getDefault = async () => {
    var res;
    try {
      res = await axios.get('/events');
      isOffline && setOfflineStatus(false);
    } catch (e) {
      console.log('Events:-' + e);
    }
    setData(res.data);
  };

  const getLikedEvents = async (callback) => {
    var res;
    try {
      res = await axios.get(`/get_liked_events/${currentUser.id}/`);
      isOffline && setOfflineStatus(false);
    } catch (e) {
      console.log('Liked Events:- ' + e);
    }
    if (likedEvents === res.data) {
      return;
    } else {
      setLikedEvents(res.data);
      if (callback) callback(res.data);
    }
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    getLikedEvents();
    getDefault();
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <SafeAreaProvider>
      <Header
        containerStyle={{height: heightToDp('2'), backgroundColor: bgColor}}
        statusBarProps={{backgroundColor: statusbarColor}}
      />
      <View style={styles.container}>
        <NoInternetModal
          show={isOffline}
          onRetry={getDefault}
          isRetrying={isLoading}
        />
        <View style={styles.upperRow}>
          <Text style={styles.title}>Hi, {currentUser.Name}</Text>
          <TouchableOpacity style={styles.profileImgContainer}>
            <Image source={image} style={styles.profileImg} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{currentUser.Username}</Text>
        <View style={styles.icon}>
          <SearchBar
            title={'Search for an event'}
            type={'event'}
            callback={setSearchedData}
          />
          <View style={{width: widthToDp('3')}} />
        </View>
      </View>
      <View
        style={{
          height: heightToDp('1%'),
          backgroundColor: bgColor,
        }}
      />
      {searchedData ? (
        <Upcoming
          d={searchedData}
          type={'searchEvent'}
          liked={likedEvents}
          callBack={setSearchedData}
          getLiked={getLikedEvents}
        />
      ) : (
        <MyTopTabs data={data} liked={likedEvents} getLiked={getLikedEvents} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: bgColor,
    paddingLeft: PixelRatio.get() * 9,
    paddingRight: PixelRatio.get() * 9,
  },
  upperRow: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    paddingTop: heightToDp('4%'),
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 25,
  },
  profileImgContainer: {
    height: heightToDp('10%'),
    width: widthToDp('10%'),
    borderRadius: 40,
    paddingRight: widthToDp('5%'),
    paddingLeft: widthToDp('15%'),
    paddingTop: heightToDp('3%'),
  },
  profileImg: {
    height: heightToDp('9%'),
    width: heightToDp('9%'),
    borderRadius: 50,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  sort: {
    backgroundColor: backDropColor,
    borderRadius: 50,
    width: widthToDp('12%'),
    height: widthToDp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingTop: heightToDp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
