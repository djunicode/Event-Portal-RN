/* First time users are prompted with this screen for logging into the application.
Users are authenticated with the AuthContext helper function.
Users are also provided with 'forgot password' option */
import React, {useContext, useState} from 'react';
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
import TextField from '../../components/SignUpLogin/TextField';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {
  backDropColor,
  bgColor,
  linearColor,
  statusbarColor,
  subtextColor,
  textColor,
  width,
} from '../../Constants';
import {AuthContext} from '../../Authentication/AuthProvider';
import {PixelRatio} from 'react-native';
import {heightToDp} from '../../Responsive';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);
  const navigation = useNavigation();

  const handleUser = (text) => {
    setUsername(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={statusbarColor} />
      <Animatable.Text
        style={styles.basetext}
        animation="fadeInDown"
        duration={2000}
        useNativeDriver={true}>
        Welcome {'\n'}Back !
      </Animatable.Text>
      <Animatable.View
        animation="fadeInRight"
        delay={1000}
        duration={1000}
        useNativeDriver={true}>
        <View style={{paddingTop: PixelRatio.getFontScale() * 62}}>
          <TextField title={'SAP ID or Username'} function={handleUser} />
        </View>
        <View style={{paddingTop: PixelRatio.getFontScale() * 17}}>
          <Password title={'Password'} function={handlePassword} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{paddingLeft: width * 0.5}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: PixelRatio.getFontScale() * 15,
                fontFamily: 'OpenSans-Regular',
                color: subtextColor,
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={1500}
        useNativeDriver={true}>
        <View style={{paddingTop: PixelRatio.getFontScale() * 33}}>
          <TouchableOpacity
            onPress={() => {
              // AsyncStorage.clear();
              // AsyncStorage.setItem('username', username);
              // AsyncStorage.setItem('password', password);
              signIn(username, password);
            }}>
            <LinearGradient
              colors={[textColor, linearColor]}
              style={styles.button}>
              <Text style={styles.ltext}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: PixelRatio.getFontScale() * 48,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: subtextColor}} />
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 5}} />
            <Text
              style={{
                fontSize: PixelRatio.getFontScale() * 17,
                fontFamily: 'OpenSans-Regular',
                color: subtextColor,
              }}>
              Don't Have an Account?
            </Text>
            <View style={{width: 5}} />
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: subtextColor}} />
        </View>
        <View style={{paddingTop: PixelRatio.getFontScale() * 14}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinearGradient
              colors={[textColor, linearColor]}
              style={styles.button}>
              <Text style={styles.ltext}>SIGNUP AS A STUDENT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
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
    fontSize: PixelRatio.getFontScale() * 38,
    paddingTop: PixelRatio.getFontScale() * 72,
    color: subtextColor,
  },
  textinput: {
    fontFamily: 'OpenSans-Regular',
    backgroundColor: backDropColor,
    height: 47,
    width: 315,
    borderRadius: PixelRatio.getFontScale() * 40,
    fontSize: PixelRatio.getFontScale() * 15,
    paddingLeft: PixelRatio.getFontScale() * 22,
  },
  row: {
    flexDirection: 'row',
    paddingTop: PixelRatio.getFontScale() * 20,
  },
  ltext: {
    textAlign: 'center',
    paddingTop: PixelRatio.getFontScale() * 15,
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 17,
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    height: heightToDp('8%'),
    borderRadius: 8,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
