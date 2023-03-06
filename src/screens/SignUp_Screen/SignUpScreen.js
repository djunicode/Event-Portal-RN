/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Password from '../../components/SignUpLogin/PasswordTextBox';
import TextField from '../../components/SignUpLogin/TextField';
import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import {
  backDropColor,
  bgColor,
  linearColor,
  subtextColor,
  textColor,
} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PixelRatio} from 'react-native';
import {heightToDp, widthToDp} from '../../Responsive';
const SignUp = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
        <View>
          <Animatable.View
            animation="fadeInDown"
            duration={2000}
            delay={500}
            useNativeDriver={true}>
            <Ionicons
              name="arrow-back"
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.basetext}>Let's get {'\n'}you started !</Text>
          </Animatable.View>
          <Animatable.View
            animation="bounceInLeft"
            duration={2000}
            delay={1000}
            useNativeDriver={true}>
            <View style={{paddingTop: 41}}>
              <TextField title={'Full Name'} />
            </View>
            <View style={{paddingTop: 9}}>
              <TextField title={'SAP ID'} />
            </View>
          </Animatable.View>
          <Animatable.View
            animation="bounceInRight"
            duration={2000}
            delay={1500}
            useNativeDriver={true}>
            <View style={{paddingTop: 41}}>
              <TextField title={'Username'} />
            </View>
            <View style={{paddingTop: 9}}>
              <Password title={'Password'} />
            </View>
            <View style={{paddingTop: 9}}>
              <Password title={'Confirm Password'} />
            </View>
          </Animatable.View>
          <Animatable.View
            style={{paddingTop: PixelRatio.getFontScale() * 41}}
            animation="fadeInUp"
            duration={2000}
            delay={2000}
            useNativeDriver={true}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <LinearGradient
                colors={[textColor, linearColor]}
                style={styles.button}>
                <Text style={styles.ltext}>SIGNUP AS A STUDENT</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    color: subtextColor,
    fontSize: PixelRatio.getFontScale() * 36,
    alignSelf: 'flex-start',
    marginTop: PixelRatio.getFontScale() * 20,
  },
  container: {
    paddingLeft: PixelRatio.getFontScale() * 12,
    paddingRight: PixelRatio.getFontScale() * 12,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: bgColor,
  },
  basetext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: PixelRatio.getFontScale() * 38,
    paddingTop: PixelRatio.getFontScale() * 30,
    color: subtextColor,
  },
  textinput: {
    fontFamily: 'OpenSans-Regular',
    backgroundColor: backDropColor,
    height: 47,
    width: 315,
    borderRadius: 40,
    fontSize: PixelRatio.getFontScale() * 15,
    paddingLeft: PixelRatio.getFontScale() * 13,
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
});

export default SignUp;
