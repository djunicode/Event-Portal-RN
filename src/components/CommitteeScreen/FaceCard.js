/* Face Card is used to display the events of the committees in the committee screen using a flatlist*/
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {backDropColor, subtextColor} from '../../Constants';

const image = require('../../images/events.jpg');

const Faccard = ({name, committee}) => {
  //   const [added, setAdded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imagecontent}>
        <View>
          <Image
            style={{height: 100, width: 200, borderRadius: 5}}
            source={image}
          />
        </View>
      </View>
      <View style={styles.textcontent}>
        <Text style={{fontSize: 12, color: subtextColor, paddingTop: 5}}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.54)',
            paddingTop: 5,
          }}>
          {committee}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    borderRadius: 5,
    margin: 10,
    backgroundColor: backDropColor,
  },
});
export default Faccard;
