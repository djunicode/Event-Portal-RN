/* Event card is used to display all the events occurring in the college.
liker function is used to like or unlike events. */
import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
  ImageBackground,
  ToastAndroid,
  PixelRatio,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {backDropColor, baseURL, subtextColor, textColor} from '../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {AuthContext} from '../Authentication/AuthProvider';
import {heightToDp, widthToDp} from '../Responsive';

const image = require('../images/events.jpg');

const EventCard = ({
  id,
  name,
  summary,
  likes,
  committee,
  description,
  isLiked,
  getLiked,
  callback,
}) => {
  const [didLike, setdidLike] = useState(isLiked);
  const [notify, setNotify] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const [lks, setLks] = useState(likes);

  const LikeHandler = () => {
    if (didLike) {
      //RemoveFromLiked
      liker('dislike', 'delete');
      setdidLike(false);

      setLks((lks) => lks - 1);
    } else {
      //AddToLiked
      liker('like', 'post');
      setdidLike(true);
      setLks((lks) => lks + 1);
    }

    getLiked(callback);
  };

  const liker = (type, method) => {
    var config = {
      method: method,
      url: `${baseURL}/event_${type}/${id}/${currentUser.id}/`,
      headers: {
        Authorization: `Token ${currentUser.Token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.success === 'Event Liked') {
          ToastAndroid.show(`Event added to Liked`, 500);
        } else {
          ToastAndroid.show(`Event removed from Liked`, 500);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'https://djacm.co.in/events/' +
          '\n This is the event ' +
          name +
          ' hosted by ' +
          committee +
          '\n ' +
          description,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };
  const navigation = useNavigation();

  return (
    <Animatable.View
      style={styles.container}
      animation="slideInLeft"
      duration={2000}
      useNativeDriver={true}>
      <TouchableOpacity onPress={() => navigation.navigate('Event', {id: id})}>
        <ImageBackground
          source={image}
          style={{
            height: heightToDp('20'),
            width: widthToDp('95'),
          }}>
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 8,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: subtextColor,
                fontSize: PixelRatio.getFontScale() * 16,
                marginLeft: PixelRatio.getFontScale() * 5,
              }}>
              {lks} {lks == 1 ? 'like' : 'likes'}
            </Text>

            <Text
              style={{
                color: subtextColor,
                fontSize: PixelRatio.getFontScale() * 16,
                marginRight: PixelRatio.getFontScale() * 5,
              }}>
              {committee}
            </Text>
          </View>
          <Text style={styles.title}>{name}</Text>
        </ImageBackground>
        <Text style={styles.text}>{summary}</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        <TouchableOpacity>
          <Text style={styles.know}>KNOW MORE</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: PixelRatio.getFontScale() * 100,
            justifyContent: 'space-around',
          }}>
          <FontAwesome
            name={didLike ? 'heart' : 'heart-o'}
            color={didLike ? textColor : subtextColor}
            onPress={LikeHandler}
            size={20}
          />
          {/* <MaterialCommunityIcons
            name={notify ? 'bell-ring' : 'bell'}
            color={subtextColor}
            onPress={() => {
              notify ? setNotify(false) : setNotify(true);
            }}
            size={20}
          /> */}
          <FontAwesome
            name="share-alt"
            size={20}
            color={subtextColor}
            onPress={onShare}
          />
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: heightToDp('30'),
    width: widthToDp('95'),
    marginLeft: 0,
    backgroundColor: backDropColor,
  },
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 9,
    fontSize: 15,
    color: 'rgba(255,255,255,0.87)',
  },
  title: {
    color: subtextColor,
    paddingHorizontal: widthToDp('3'),
    paddingTop: PixelRatio.getFontScale() * 115,
    fontSize: PixelRatio.getFontScale() * 27,
    position: 'absolute',
    fontWeight: 'bold',
  },
  info: {
    flexDirection: 'row',
    paddingTop: PixelRatio.getFontScale() * 14,
    paddingHorizontal: widthToDp('4'),
    justifyContent: 'space-between',
  },
  know: {
    color: textColor,
    fontSize: PixelRatio.getFontScale() * 15,
  },
  committee: {
    color: textColor,
    fontSize: PixelRatio.getFontScale() * 15,
    paddingLeft: 10,
  },
});

export default EventCard;
