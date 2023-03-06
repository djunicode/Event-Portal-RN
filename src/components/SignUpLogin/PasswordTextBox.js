/* Text box for password*/
import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {backDropColor, subtextColor, width} from '../../Constants';

const Password = (props) => {
  const [visible, setVisibility] = useState(false);
  const icon = !visible ? 'eye-off' : 'eye';
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.title}
        placeholderTextColor="rgba(255, 255, 255, 0.85)"
        textAlign="left"
        style={styles.text}
        onChangeText={props.function}
        secureTextEntry={!visible}
      />
      <View style={styles.icon}>
        <Icon
          name={icon}
          color={'rgba(255, 255, 255, 0.6)'}
          onPress={() => setVisibility(!visible)}
          size={22}
          style={{paddingTop: 12}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    backgroundColor: backDropColor,
    width: width * 0.8,
    height: 47,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    fontSize: 15,
    paddingLeft: 22,
    color: subtextColor,
  },
  icon: {
    backgroundColor: backDropColor,
    width: width * 0.1,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Password;
