/* Profile Card is used to display the details of faculty and core members of the committee */
import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {backDropColor, subtextColor} from '../../Constants';

const image = require('../../images/profile.jpg');

const Profilecard = ({name, position}) => {
  //   const [added, setAdded] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imagecontent}>
        <View>
          <Image
            style={{height: 110, borderRadius: 5, width: 130}}
            source={image}
          />
        </View>
      </View>
      <View style={styles.textcontent}>
        <Text style={{fontSize: 12, color: subtextColor}}> {name}</Text>
        <Text style={{fontSize: 12, color: 'rgba(255,255,255,0.54)'}}>
          {position}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 150,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: backDropColor,
  },
});
export default Profilecard;
