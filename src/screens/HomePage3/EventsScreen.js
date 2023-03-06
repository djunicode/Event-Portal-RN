/* Event screen opens up on clicking the various event cards on the upcoming,latest and following pages.
 getEvent function is used to fetch and set relevant data about the event. */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  bgColor,
  statusbarColor,
  subtextColor,
  textColor,
  width,
} from '../../Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Header} from 'react-native-elements';
import Tabs from '../../components/HomePage/Tabs';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import axios from '../../controllers/axios';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';

const EventsScreen = ({route}) => {
  //const [about, setAbout] = useState();
  const [title, setTitle] = useState('');
  const [eventsdata, setEventsdata] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getEvent = async () => {
    let v = route.params.id.toString();
    try {
      await axios.get(`/events/${v}`).then((response) => {
        setEventsdata(response.data);
        setTitle(response.data.eventName);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor,
      }}>
      <ActivityIndicator size="large" color={textColor} />
    </View>
  ) : (
    <SafeAreaView style={{backgroundColor: bgColor, paddingBottom: 40}}>
      <ScrollView>
        <View>
          <Header
            statusBarProps={{backgroundColor: statusbarColor}}
            backgroundColor={bgColor}
            style={styles.Header}
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home');
                }}>
                <AntDesign name="left" style={styles.arrow} />
              </TouchableOpacity>
            }
            centerComponent={<Text style={styles.title}>{title}</Text>}
          />
          <Animatable.Image
            animation="flipInX"
            duration={2000}
            delay={1000}
            source={{
              uri:
                'https://cdn.octopix.in/uploads/company-logo/2019/04/22/digihunts-RQEK86REtocLMlz1UA481VYaAGxxwG2ZIQyvqHD5D5LgiT92BhymWV6aK665KkCo1kD74mMjYakzvWaU-350x350.jpg',
            }}
            style={styles.cover}
          />
        </View>
        <View style={{marginTop: 13}}>
          <Tabs data={eventsdata} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: PixelRatio.getFontScale() * 14,
    flexDirection: 'row',
    alignContent: 'center',
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: PixelRatio.getFontScale() * 26,
    fontWeight: '700',
    color: subtextColor,
    marginTop: PixelRatio.getFontScale() * 8,
    letterSpacing: PixelRatio.getFontScale() * 5,
  },
  arrow: {
    marginLeft: PixelRatio.getFontScale() * 18.51,
    marginTop: PixelRatio.getFontScale() * 10,
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 26,
  },
  tabStyle: {},
  cover: {
    height: width * 0.61,
    width: width * 0.61,
    marginTop: PixelRatio.getFontScale() * 11,
    alignSelf: 'center',
  },
  filler: {
    backgroundColor: bgColor,
    position: 'absolute',
    marginTop: PixelRatio.getFontScale() * 77,
    width: width,
    height: 1,
  },

  text: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: PixelRatio.getFontScale() * 16,
    color: subtextColor,
  },
  question: {
    color: textColor,
    fontSize: PixelRatio.getFontScale() * 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    marginLeft: PixelRatio.getFontScale() * 40,
  },
  paragraph: {
    fontSize: PixelRatio.getFontScale() * 13,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  contact: {
    marginTop: PixelRatio.getFontScale() * 17.33,
    marginLeft: PixelRatio.getFontScale() * 43,
    flexDirection: 'row',
    margin: PixelRatio.getFontScale() * 2,
  },
});

export default EventsScreen;
