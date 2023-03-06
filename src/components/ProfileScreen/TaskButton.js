/* Tasks for the committee are displayed using this component*/
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {linearColor, subtextColor, textColor} from '../../Constants';

const TaskButton = ({width, text, route, tag, cID}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        paddingTop: 10,
        marginBottom: 20,
        height: 19,
        margin: 8,
        width: width,
        paddingLeft: 24,
        borderRadius: 2,
      }}
      onPress={() => navigation.navigate(route, {comID: cID, tag: tag})}>
      <LinearGradient
        colors={[textColor, linearColor]}
        style={{
          height: 36,
          width: width,
          opacity: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: subtextColor,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TaskButton;
