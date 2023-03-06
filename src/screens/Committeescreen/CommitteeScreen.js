/* Committee screen displays the details about the committee and the faulty and core members of the committee.
fetchCommittee function is used to get and set data about the faculty members,events,core members of the committee*/
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Faccard from '../../components/CommitteeScreen/FaceCard';
import Profilecard from '../../components/CommitteeScreen/Profilecard';
import About from '../../components/CommitteeScreen/AboutComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  bgColor,
  statusbarColor,
  textColor,
  backDropColor,
  subtextColor,
  height,
} from '../../Constants';
import axios from '../../controllers/axios';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';

const Committee = ({route, navigation}) => {
  const [notify, setNotify] = useState(false);
  const [data, setData] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [events, setEvents] = useState([]);
  const [core, setCore] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const fetchCommitteeData = async () => {
    let v = route.params.id.toString();
    setIsLoading(true);
    try {
      await axios.get(`/committee_detail/${v}/`).then((json) => {
        setData(json.data);
        setEvents(json.data.events);
        setFaculty(json.data.facultyMembers);
        setCore(json.data.coreCommitteeMembers);
        setIsLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCommitteeData();
  }, []);
  if (isloading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgColor,
        }}>
        <ActivityIndicator size="large" color={textColor} />
      </View>
    );
  }
  return (
    <>
      <StatusBar backgroundColor={statusbarColor} />
      <SafeAreaView style={styles.body}>
        <ScrollView>
          <View style={styles.header}>
            <Ionicons
              name="chevron-back-outline"
              size={40}
              style={{
                color: subtextColor,
                marginHorizontal: PixelRatio.getFontScale() * 8,
              }}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.heading}>{data.committeeName}</Text>
            {notify ? (
              <MaterialCommunityIcons
                name="bell-ring"
                style={styles.icon}
                size={30}
                onPress={() => {
                  setNotify(false);
                }}
              />
            ) : (
              <MaterialCommunityIcons
                name="bell"
                style={styles.icon}
                size={30}
                onPress={() => {
                  setNotify(true);
                }}
              />
            )}
          </View>
          <About about={data.committeeDescription} />
          <View>
            <View
              style={{
                margin: PixelRatio.getFontScale() * 3,
                flexDirection: 'row',
              }}>
              <Text style={{color: textColor, fontSize: 18}}>
                Events related to this committee
              </Text>
            </View>
            <FlatList
              contentContainerStyle={{
                marginVertical: PixelRatio.getFontScale() * 2,
              }}
              keyExtractor={(event) => event.id.toString()}
              data={events}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <Faccard
                    name={item.eventName}
                    committee={data.committeeName}
                  />
                );
              }}
            />
            <View
              style={{
                margin: PixelRatio.getFontScale() * 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: textColor,
                  fontSize: PixelRatio.getFontScale() * 18,
                }}>
                Faculty Members
              </Text>
              <View style={[styles.dropdown, {marginLeft: 152}]}>
                <Text
                  style={{
                    color: subtextColor,
                    paddingHorizontal: 8,
                  }}>
                  2020-21
                </Text>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{
                marginVertical: PixelRatio.getFontScale() * 5,
              }}
              keyExtractor={(member) => member.id.toString()}
              data={faculty}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <Profilecard name={item.name} position={item.department} />
                );
              }}
            />
            <View
              style={{
                margin: PixelRatio.getFontScale() * 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: textColor,
                  fontSize: PixelRatio.getFontScale() * 18,
                }}>
                Core Committee Members
              </Text>
              <View
                style={[
                  styles.dropdown,
                  {marginLeft: PixelRatio.getFontScale() * 30},
                ]}>
                <Text
                  style={{
                    color: subtextColor,
                    paddingHorizontal: PixelRatio.getFontScale() * 5,
                  }}>
                  2020-21
                </Text>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{
                marginVertical: 5,
              }}
              keyExtractor={(member) => member.id.toString()}
              data={core}
              horizontal={true}
              renderItem={({item}) => {
                return (
                  <Profilecard
                    name={item.student}
                    position={item.positionAssigned}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: bgColor,
    height: '100%',
    paddingTop: PixelRatio.getFontScale() * 35,
    //paddingBottom: 20,
    //position: 'absolute',
  },
  header: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: PixelRatio.getFontScale() * 30,
    color: subtextColor,
    marginHorizontal: PixelRatio.getFontScale() * 20,
    textDecorationLine: 'underline',
    fontFamily: 'Merriweather-Regular',
    textAlign: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: backDropColor,
  },

  icon: {
    color: subtextColor,
    marginLeft: PixelRatio.getFontScale() * 370,
    marginVertical: PixelRatio.getFontScale() * 6,
    position: 'absolute',
  },
  dropdown: {
    borderRadius: PixelRatio.getFontScale() * 10,
    width: widthToDp('18%'),
    height: heightToDp('4%'),
    backgroundColor: backDropColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Committee;
