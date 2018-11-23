import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const defaultImage = 'https://purepng.com/public/uploads/large/purepng.com-cd-dvdcompact-discdvdcddvd-storagedisc-17015283459240fu8t.png';

const Artist = ({name, imageSrc = defaultImage, popularity}) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={{uri: imageSrc}}
    />
    <View style={styles.details}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.popularity}>{popularity}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    flexDirection: 'row',
  },
  details: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  image: {
    height: 60,
    width: 60
  },
  title: {
    fontSize: 20,
  },
  popularity: {
    fontSize: 15,
    color: 'green'
  },
});

export default Artist;
