/* This component displays the details of the user currently logged in in the profile screen.
It takes position,name,tag and ID as props */
import React from 'react';
import {View, Text} from 'react-native';
import {backDropColor, subtextColor} from '../../Constants';
import TaskButton from './TaskButton';

const ProfileStats = ({position, name, tag, cID}) => {
  return (
    <View
      style={{
        margin: 15,
        height: 150,
        width: '95%',
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
            {position}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'lightgrey',
              textAlign: 'center',
            }}>
            {name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {tag === 'core' ? (
            <TaskButton
              width={100}
              text={tag === 'core' ? 'ASSIGN TASK' : 'REFERRAL'}
              route={tag === 'core' ? 'Assign Tasks' : 'Referral Count'}
              cID={cID}
            />
          ) : null}

          <TaskButton
            width={100}
            text={'VIEW TASKS'}
            route={'View Tasks'}
            tag={tag}
            cID={cID}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileStats;
