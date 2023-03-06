/* On successfully entering the received OTP,Password is reset on this screen */
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
import Password from '../../components/SignUpLogin/PasswordTextBox';
import {
  bgColor,
  linearColor,
  statusbarColor,
  subtextColor,
  textColor,
  height,
} from '../../Constants';
// import {AuthContext} from '../../Authentication/AuthProvider';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';

const NewPassword = ({navigation}) => {
  const [newpassword, setNewPass] = useState('');
  const [confirmpassword, setPassword] = useState('');

  const handleNewPass = (text) => {
    setNewPass(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={statusbarColor} />
      <View style={{marginTop: height / 6.3}}>
        <View style={{paddingTop: PixelRatio.getFontScale() * 20}}>
          <Text style={styles.basetext}> Enter new password</Text>
          <Password title={'Password'} function={handleNewPass} />
        </View>
        <View style={{paddingTop: PixelRatio.getFontScale() * 16}}>
          <Text style={styles.basetext}> Re-enter password</Text>
          <Password title={'Confirm Password'} function={handlePassword} />
        </View>

        <View style={{paddingTop: PixelRatio.getFontScale() * 20}}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient
              colors={[textColor, linearColor]}
              style={styles.button}>
              <Text style={styles.ltext}>Reset Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  basetext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: PixelRatio.getFontScale() * 26,
    paddingTop: PixelRatio.getFontScale() * 20,
    paddingBottom: PixelRatio.getFontScale() * 10,
    color: subtextColor,
  },
  ltext: {
    textAlign: 'center',
    padding: PixelRatio.getFontScale() * 15,
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 18,
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    marginTop: PixelRatio.getFontScale() * 40,
    height: heightToDp('8%'),
    borderRadius: 8,
  },
});

export default NewPassword;
