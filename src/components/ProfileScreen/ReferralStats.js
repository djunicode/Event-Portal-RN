/* Referral stats are displayed for co committee members to show reference details*/
import React from 'react';
import {View, Text} from 'react-native';
import {backDropColor, subtextColor} from '../../Constants';

const ReferralStats = ({event, name, person}) => {
  return (
    <View
      style={{
        margin: 15,
        height: 130, //was 185
        backgroundColor: '#a9a9a9',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: '30%',
          backgroundColor: '#505050',
        }}
      />
      <View
        style={{
          width: '70%',
          backgroundColor: backDropColor,
          paddingTop: 20,
        }}>
        <View>
          <Text
            style={{
              color: subtextColor,
              textAlign: 'center',
              fontSize: 24,
            }}>
            {event}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'lightgrey',
              textAlign: 'center',
            }}>
            {name}
          </Text>
          <Text
            style={{
              color: subtextColor,
              textAlign: 'center',
              fontSize: 24,
            }}>
            Referred to {person}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReferralStats;
