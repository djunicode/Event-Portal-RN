/* About component displays the information of the committee on the committee screen. */
import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {backDropColor, height, subtextColor} from '../../Constants';

const logo = require('../../images/acm_logo.png');

const About = (props) => {
  const [isBig, setIsBig] = useState(false);

  const onClick = () => {
    isBig ? setIsBig(false) : setIsBig(true);
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={[
          styles.container,
          {
            height: height * (isBig ? 0.65 : 0.25),
            flexDirection: isBig ? 'column' : 'row',
          },
        ]}>
        <Image
          source={logo}
          style={
            isBig
              ? {
                  marginTop: 5,
                  width: '20%',
                  height: '20%',
                  borderRadius: 15,
                  alignSelf: 'center',
                }
              : styles.image
          }
        />
        <View style={{paddingLeft: 10, paddingRight: 20}}>
          <Text style={styles.title}>About Us</Text>
          <View>
            {isBig ? (
              <Text
                style={[styles.text, {textAlign: 'center'}]}
                ellipsizeMode="tail">
                {props.about}
              </Text>
            ) : (
              <Text
                style={[styles.text, {marginRight: 100}]}
                ellipsizeMode="tail"
                numberOfLines={5}>
                {props.about}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: backDropColor,
    margin: 15,
    borderRadius: 15,
    width: '95%',
  },
  image: {
    width: '33%',
    height: '100%',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 25,
    color: subtextColor,
    textDecorationLine: 'underline',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    color: 'rgba(255,255,255,0.84)',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
});

export default About;
