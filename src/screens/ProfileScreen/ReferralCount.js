/* Co-committee members keep a track of their referrals in this screen.
fetchReferrals function is used to get referral data for the current user.  */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {bgColor, subtextColor, textColor, width} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../Authentication/AuthProvider';
import ReferralStats from '../../components/ProfileScreen/ReferralStats';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';

const ReferralCount = () => {
  const {currentUser} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [referral, setReferral] = useState([[]]);

  var id = currentUser.id;

  const fetchReferrals = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + currentUser.Token);
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://aryan123456.pythonanywhere.com/api/student_profile/' + id,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        setData(result.coCommittees);
        var list = [];
        for (var i = 0; i < data.length; i++) {
          var items = [];
          for (var j = 0; j < data[i].referrals.length; j++) {
            const obj = {
              event: data[i].referrals[j].event,
              committee: data[i].committee,
              id: data[i].referrals[j].id,
              participant: data[i].referrals[j].participant,
            };
            items.push(obj);
          }

          list.push(items);
        }

        setReferral(list);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    fetchReferrals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = useNavigation();
  if (referral.length === 0) {
    setTimeout(() => {
      fetchReferrals();
    }, 500);
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
    <View style={styles.body}>
      <View style={{flexDirection: 'row'}}>
        <Ionicons
          name="chevron-back-outline"
          size={40}
          style={styles.backIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.heading}>REFERRAL COUNT</Text>
      </View>
      <FlatList
        data={referral}
        keyExtractor={(ref) => ref.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.line} />
              <FlatList
                data={item}
                keyExtractor={(ref) => ref.id.toString()}
                renderItem={({item}) => {
                  return (
                    <View>
                      <ReferralStats
                        event={item.event}
                        name={item.committee}
                        person={item.participant}
                      />
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: bgColor,
    height: '100%',
    paddingLeft: PixelRatio.getFontScale() * 20,
    paddingRight: PixelRatio.getFontScale() * 20,
  },
  backIcon: {
    color: subtextColor,
    paddingTop: PixelRatio.getFontScale() * 40,
  },
  heading: {
    paddingLeft: PixelRatio.getFontScale() * 45,
    color: textColor,
    paddingRight: PixelRatio.getFontScale() * 35,
    paddingTop: PixelRatio.getFontScale() * 40,
    fontSize: PixelRatio.getFontScale() * 30,
  },
  line: {
    height: 5,
    width: width * 0.95,
    backgroundColor: textColor,
  },
});

export default ReferralCount;
