import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login_Screen/LoginScreen';
import SignUp from '../screens/SignUp_Screen/SignUpScreen';
import ForgotPasswordScreen from '../screens/Login_Screen/ForgotPasswordScreen';
import OTPScreen from '../screens/Login_Screen/OTPScreen';
import NewPassword from '../screens/Login_Screen/NewPassword';

const RootStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpScreen" component={OTPScreen} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default RootStackScreen;
