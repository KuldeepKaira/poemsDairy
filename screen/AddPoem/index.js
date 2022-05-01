/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import Header from '../../component/Header';

const AddPoem = ({route, navigation}) => {
  const [poemData, setPoemsData] = useState({});

  const backHandler = () => {
    navigation.navigate('Home');
  };

  const changeHandler = (name, text) => {
    setPoemsData(prev => ({...prev, [name]: text}));
  };

  const createAlert = () => {
    Alert.alert('Poem Added', 'Poem has been added successfully.', [
      {text: 'OK', onPress: () => navigation.push('Home')},
    ]);
  };

  const poemAddHandler = () => {
    const reqBody = {...poemData};

    fetch('https://poemsdairy-default-rtdb.firebaseio.com/.json', {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })
      .then(res => {
        if (res.ok) {
          setPoemsData([]);
          createAlert();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{flex: 1}}>
      <Header title={'Add a Poem'} backHandler={backHandler} />
      <View style={styles.mainContainer}>
        <Text style={styles.HeaderText}>ADD A POEM</Text>
        <ScrollView>
          <View style={{height: 500}}>
            <ScrollView style={{}}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Poem Title</Text>
                <TextInput
                  style={styles.inputBox}
                  value={poemData?.title || ''}
                  onChangeText={text => changeHandler('title', text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Author</Text>
                <TextInput
                  style={styles.inputBox}
                  value={poemData?.author || ''}
                  onChangeText={text => changeHandler('author', text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Image URL</Text>
                <TextInput
                  style={styles.inputBox}
                  value={poemData?.img || ''}
                  onChangeText={text => changeHandler('img', text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Cover URL</Text>
                <TextInput
                  style={styles.inputBox}
                  value={poemData?.cover || ''}
                  onChangeText={text => changeHandler('cover', text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Poem</Text>
                <TextInput
                  multiline={true}
                  style={[styles.inputBox, styles.poemBox]}
                  value={poemData?.poem || ''}
                  onChangeText={text => changeHandler('poem', text)}
                />
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={poemAddHandler} style={styles.AddButton}>
          <Text style={styles.buttonText}>Add Poem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddPoem;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  HeaderText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10,
  },
  inputBox: {
    borderColor: '#aaa',
    borderWidth: 2,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  inputLabel: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  poemBox: {},
  AddButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'green',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
