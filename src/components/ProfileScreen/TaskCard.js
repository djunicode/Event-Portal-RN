import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {height, textColor, subtextColor} from '../../Constants';

const TaskCard = ({task, assignedbyName, assignedTo, tag}) => {
  const [isBig, setIsBig] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsBig((isBig) => !isBig)}
        style={{
          padding: PixelRatio.getFontScale() * 15,
          backgroundColor: '#505050',
          width: '100%',
          height: height * (isBig ? 0.5 : 0.25),
          borderRadius: 20,
        }}>
        <Text style={styles.comphead}>
          {' '}
          {tag == 'core' ? 'Assigned To:' : 'Assigned by:'}
        </Text>
        <Text style={styles.content}>
          {tag == 'core' ? assignedTo : assignedbyName}
        </Text>
        <Text style={styles.comphead}>Task: </Text>
        <View>
          {isBig ? (
            <Text
              style={styles.content}
              ellipsizeMode="tail"
              numberOfLines={10}>
              {task}
            </Text>
          ) : (
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
              {task}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={{height: 20}} />
    </View>
  );
};

const styles = StyleSheet.create({
  comphead: {
    color: textColor,
    fontSize: PixelRatio.getFontScale() * 26,
    textDecorationLine: 'underline',
  },
  content: {
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 17,
  },
});
export default TaskCard;
