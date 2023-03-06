import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import EventCard from '../../components/EventCard';
import {bgColor, subtextColor, textColor} from '../../Constants';
import {PixelRatio} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from '../../controllers/axios';
import {AuthContext} from '../../Authentication/AuthProvider';
import {useNavigation} from '@react-navigation/native';

const Upcoming = ({d, type, callBack, getLiked, liked}) => {
  const [data, setData] = useState(d);
  const {currentUser} = useContext(AuthContext);
  const [liked1, setLiked1] = useState(liked);
  const navigation = useNavigation();

  const doByDefault = () => {
    if (type === 'upcoming') {
      getEvents('/sort_events_by_date');
    } else if (type === 'following') {
      getEvents(`/get_events_for_followed_committees/${currentUser.id}/`);
    }

    getLiked(setLiked1);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      doByDefault();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    doByDefault();
    console.log('This is ' + type + ' screen');
  }, [type]);

  const getEvents = async (request) => {
    try {
      const res = await axios.get(request);
      if (type === 'following') {
        var object = [];
        for (let i = 0; i < res.data.data.length; i++) {
          for (let j = 0; j < res.data.data[i].length; j++) {
            object.push(res.data.data[i][j]);
          }
        }
        setData(object);
      } else {
        setData(res.data);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return data === [] ? (
    <ActivityIndicator
      style={styles.container}
      color={textColor}
      size={'large'}
    />
  ) : (
    <View style={{backgroundColor: bgColor, flex: 1}}>
      <FlatList
        keyExtractor={(event, index) => index.toString()}
        data={data}
        extraData={liked1}
        renderItem={({item}) => {
          //console.log(liked.includes(item));
          const arr = liked1.find(({id}) => id === item.id);
          return (
            <View style={styles.container}>
              <EventCard
                name={item.eventName}
                id={item.id}
                summary={item.eventSummary}
                likes={arr ? arr.likes : item.likes}
                committee={item.organisingCommitteeName}
                description={item.eventDescription}
                isLiked={arr ? true : false}
                getLiked={getLiked}
                callback={setLiked1}
              />
            </View>
          );
        }}
      />
      {type === 'searchEvent' ? (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => callBack(null)}>
          <Entypo name="cross" size={40} color={subtextColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
    padding: PixelRatio.getFontScale() * 15,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    height: 60,
    backgroundColor: textColor,
    borderRadius: 30,
  },
});

export default Upcoming;
