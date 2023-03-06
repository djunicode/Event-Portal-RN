/* Displays details about an event along with gallery, contact information and option to register.*/
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {bgColor, subtextColor, textColor} from '../../Constants';

const ContactInfo = ({name, number}) => {
  return (
    <View style={styles.contact}>
      <View style={{flexDirection: 'row'}}>
        <MaterialCommunityIcons name="account" style={styles.icon} />
        <Text
          style={(styles.paragraph, {color: subtextColor, marginLeft: 15.33})}>
          {name}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', position: 'absolute', marginLeft: 158}}>
        <MaterialIcons name="call" style={styles.icon} />
        <Text
          style={
            (styles.paragraph,
            {
              color: subtextColor,
              marginLeft: 7,
              textDecorationLine: 'underline',
            })
          }
          onPress={() => {
            let num = '';
            if (Platform.OS === 'ios') {
              num = `telprompt:${'+91'}${number}`;
            } else if (Platform.OS === 'android') {
              num = `tel:${'+91'}${number}`;
            }
            Linking.openURL(num);
          }}>
          {number}
        </Text>
      </View>
    </View>
  );
};
const About = ({about}) => {
  return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
      <Animatable.View animation="fadeInLeftBig" duration={2000} delay={1500}>
        <Title style={styles.question}>What is this event about?</Title>
        <Paragraph
          style={
            (styles.paragraph,
            {
              paddingLeft: 13,
              borderLeftColor: subtextColor,
              borderLeftWidth: 1,
              marginLeft: 31,
              color: subtextColor,
            })
          }>
          {about}
        </Paragraph>
      </Animatable.View>
    </View>
  );
};

const Gallery = () => {
  return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
      <Title style={styles.question}>Have a look at pictures of Digihunt</Title>
      <View style={{alignSelf: 'center'}}>
        <View style={{marginTop: 14, flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={{height: 112, width: 132}}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
              }}
            />
            <Image
              style={{height: 64, width: 132, marginTop: 6}}
              source={{
                uri:
                  'https://total-event.com/wp-content/uploads/2018/01/event-planning-microsoft-ignite.jpg',
              }}
            />
          </View>
          <Image
            style={{height: 182, width: 139, marginLeft: 8}}
            source={{
              uri:
                'http://www.fedracongressi.com/fedra/wp-content/uploads/2016/02/revelry-event-designers-homepage-slideshow-38.jpeg',
            }}
          />
        </View>
        <Image
          style={{height: 81, width: 278, marginTop: 8}}
          source={{
            uri: 'https://www.countrywidevents.in/images/slide3.jpg',
          }}
        />
      </View>
    </View>
  );
};

const Register = ({register}) => {
  //'https://docs.google.com/forms/d/e/1FAIpQLScAyCuaeWKUME7LXEwTBs5rkN-admC1X9-8hUPgEsR-UeHjhg/viewform'
  const link = register;
  const [visible, setVisible] = useState(false);
  const isSubmit = (url) => {
    if (url.url !== link) {
      console.log('Submitted');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
      <Title style={styles.question}>Interested? Register Now!</Title>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={styles.paragraph}>
        <Text style={styles.link}>{link}</Text>
      </TouchableOpacity>
      <View style={styles.centeredView}>
        <Modal
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}>
          <WebView
            source={{
              uri:
                'https://docs.google.com/forms/d/e/1FAIpQLScAyCuaeWKUME7LXEwTBs5rkN-admC1X9-8hUPgEsR-UeHjhg/viewform',
            }}
            onNavigationStateChange={isSubmit}
          />
          {/* <Text>This is Webview</Text> */}
        </Modal>
      </View>
    </View>
  );
};

const Contact = ({contact}) => {
  return (
    <View style={{flex: 1, backgroundColor: bgColor}}>
      <Title style={styles.question}>Facing a problem? Contact us</Title>
      <ContactInfo
        name={contact.contactName1}
        number={contact.contactNumber1}
      />
      <ContactInfo
        name={contact.contactName2}
        number={contact.contactNumber2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: 16,
    color: subtextColor,
  },
  question: {
    color: textColor,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    marginLeft: 40,
  },
  paragraph: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  contact: {
    marginTop: 17.33,
    marginLeft: 43,
    flexDirection: 'row',
    margin: 2,
  },
  icon: {
    fontSize: 15,
    color: subtextColor,
  },
  link: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 12,
    color: subtextColor,
    textDecorationLine: 'underline',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export {About, Contact, Register, Gallery};
