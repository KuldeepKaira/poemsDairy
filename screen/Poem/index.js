/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
// import {poemsData} from '../../Store/Data';

import Header from '../../component/Header';

const Poem = ({route, navigation}) => {
  const {poemData} = route.params;
  // console.log('idpassed', id);

  const backHandler = () => {
    navigation.navigate('Home');
  };

  const createAlert = () => {
    Alert.alert('Poem Delete', 'Poem has been deleted succesfully', [
      {text: 'OK', onPress: () => navigation.push('Home')},
    ]);
  };
  const areusureAlert = () => {
    Alert.alert('Delete Poem', 'Are you sure you want to delete this poem?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          deleteHandler();
        },
      },
    ]);
  };

  const deleteHandler = () => {
    // console.log('deletepressed');
    fetch(
      `https://poemsdairy-default-rtdb.firebaseio.com/${poemData.key}.json`,
      {
        method: 'DELETE',
      },
    )
      .then(res => {
        if (res.ok) {
          createAlert();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header
        title={'Poem Page'}
        backHandler={backHandler}
        showDelete={true}
        deleteHandler={areusureAlert}
      />
      <ScrollView style={{flex: 1, backgroundColor: '#e7f5ff'}}>
        <View style={styles.imageContainer}>
          <Image
            style={{width: 300, height: 300}}
            source={{uri: poemData?.img}}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{poemData?.title}</Text>
          <Text style={styles.titleAuthor}>- {poemData.author}</Text>
        </View>
        <View style={styles.poemContainer}>
          <Text style={styles.poemText}>{poemData.poem}</Text>
        </View>
        {/* <Text>{poemData?.key}</Text> */}
      </ScrollView>
    </>
  );
};

export default Poem;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    // backgroundColor: 'white',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  titleAuthor: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
    color: 'black',
  },
  poemContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  poemText: {
    fontSize: 18,
    lineHeight: 40,
    color: 'black',
  },
});
