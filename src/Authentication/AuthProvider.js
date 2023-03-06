/* User is authenticated with the help of this component in the Login Screen */
import React, {createContext, useState} from 'react';
import {baseURL, userDataFormat} from '../Constants';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isSignedIn,
        setCurrentUser,
        isLoading,
        setIsSignedIn,
        setIsLoading,
        signIn: async (username, password) => {
          setIsLoading(true);
          var myHeaders = new Headers();
          myHeaders.append('Content-Type', 'application/json');
          var raw = JSON.stringify({username: username, password: password});
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };
          try {
            await fetch(`${baseURL}/student_login/`, requestOptions)
              .then((response) => response.json())
              .then(async (result) => {
                if (result.Message === 'Internal Server Error') {
                  setIsLoading(false);
                  console.log('Error occurred');
                  Alert.alert('Login Failed', 'Invalid username or password', [
                    {text: 'OK', onPress: () => console.log('okay')},
                  ]);
                } else {
                  setCurrentUser(result);
                  await EncryptedStorage.setItem(
                    'user',
                    JSON.stringify(result),
                  ).then(() => console.log('stored!!!'));
                  setIsSignedIn(true);
                  setIsLoading(false);
                }
              });
          } catch (E) {
            console.warn(E);
          }
        },

        signUp: () => {},

        signOut: () => {
          Alert.alert('Are You sure ?', `Do you want to SignOut...`, [
            {
              text: 'NO',
              onPress: () => {
                console.log('NO Pressed');
              },
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: async () => {
                try {
                  setIsSignedIn(false);
                  //await AsyncStorage.clear();
                  await EncryptedStorage.clear();
                  setCurrentUser(null);
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
