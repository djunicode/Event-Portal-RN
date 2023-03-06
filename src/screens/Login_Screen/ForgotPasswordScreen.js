/* The ForgotPasswordScreen requires the user to enter the SAP ID in order to reset the password.
The user would receive an OTP on the registered Email Id */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextField from '../../components/SignUpLogin/TextField';
import {
  bgColor,
  linearColor,
  statusbarColor,
  subtextColor,
  textColor,
} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ToastAndroid} from 'react-native';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';

const ForgotPasswordScreen = ({navigation}) => {
  const [username, setUsername] = useState('');

  const handleUser = (text) => {
    setUsername(text);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={statusbarColor} />
      <Ionicons
        name="arrow-back"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.basetext}> Enter your SAP ID</Text>
      <View style={{paddingTop: PixelRatio.getFontScale() * 50}}>
        <TextField title={'Enter your SAP ID'} function={handleUser} />
      </View>
      <View style={{paddingTop: PixelRatio.getFontScale() * 33}}>
        <TouchableOpacity
          style={{marginTop: PixelRatio.getFontScale() * 15}}
          onPress={() => {
            navigation.navigate('OtpScreen');
            ToastAndroid.show(
              'We have sent you a Mail with the OTP',
              ToastAndroid.SHORT,
            );
          }}>
          <LinearGradient
            colors={[textColor, linearColor]}
            style={styles.button}>
            <Text style={styles.ltext}>GET OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
    paddingLeft: PixelRatio.getFontScale() * 12,
    paddingRight: PixelRatio.getFontScale() * 12,
  },
  backButton: {
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 36,
    alignSelf: 'flex-start',
    marginTop: PixelRatio.getFontScale() * 20,
  },
  basetext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: PixelRatio.getFontScale() * 32,
    paddingTop: PixelRatio.getFontScale() * 72,
    color: subtextColor,
  },
  ltext: {
    textAlign: 'center',
    paddingTop: PixelRatio.getFontScale() * 15,
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 17,
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    height: PixelRatio.getFontScale() * 55,
    borderRadius: 8,
    marginTop: PixelRatio.getFontScale() * 15,
  },
});

export default ForgotPasswordScreen;
