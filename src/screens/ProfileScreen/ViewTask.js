/* Users can view the tasks for their roles in various committees in this screen.
 */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {bgColor, subtextColor, textColor, baseURL} from '../../Constants';
import {AuthContext} from '../../Authentication/AuthProvider';
import {PixelRatio} from 'react-native';
import TaskCard from '../../components/ProfileScreen/TaskCard';

const ViewTask = ({route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const {tag, comID} = route.params;

  const getViewTaskData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + currentUser.Token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `${baseURL}/${tag}tasklist/${currentUser.id}/${comID}/\n`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Message) {
          setMsg(result.Message);
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getViewTaskData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigation = useNavigation();
  return loading ? (
    <ActivityIndicator
      style={{flex: 1, backgroundColor: bgColor}}
      color={textColor}
      size={'large'}
    />
  ) : (
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
        <Text style={styles.heading}>
          {tag === 'core' ? 'TASKS GIVEN' : 'TASKS ASSIGNED'}
        </Text>
      </View>
      {msg ? (
        <Text
          style={{
            color: subtextColor,
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {msg}
        </Text>
      ) : (
        <FlatList
          data={data}
          style={{
            paddingTop: PixelRatio.getFontScale() * 50,
            paddingLeft: PixelRatio.getFontScale() * 14,
          }}
          keyExtractor={(x, i) => i}
          renderItem={({item}) => {
            return (
              <TaskCard
                assignedbyName={item.assignedbyName}
                task={item.task}
                tag={tag}
                assignedTo={item.coCommitteeName}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: bgColor,
    height: '100%',
    paddingLeft: PixelRatio.getFontScale() * 30,
    paddingRight: PixelRatio.getFontScale() * 30,
  },
  backIcon: {
    color: subtextColor,
    paddingTop: PixelRatio.getFontScale() * 50,
    alignSelf: 'flex-start',
  },
  heading: {
    color: textColor,
    left: PixelRatio.getFontScale() * 40,
    //paddingRight: PixelRatio.getFontScale() * 85,
    paddingTop: PixelRatio.getFontScale() * 50,
    fontSize: PixelRatio.getFontScale() * 30,
  },
});

export default ViewTask;
