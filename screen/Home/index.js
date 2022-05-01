import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// import {poemsData} from '../../Store/Data';
// import firebase, {db, auth} from '../../config/firebase';
// import {getDatabase, ref, onValue} from 'firebase/database';

const Home = ({navigation}) => {
  const [poemsData, setPoemsData] = useState([]);
  const [loaded, setloaded] = useState(false);

  const loadData = () => {
    fetch('https://poemsdairy-default-rtdb.firebaseio.com/.json')
      .then(res => res.json())
      .then(res => {
        // console.log('poemsDatafrom API', res);
        const tempOut = [];
        const temp = Object.keys(res).map(item => {
          tempOut.push({...res[item], key: item});
          // console.log('key', item);
          // console.log('value', res[item]);
        });

        // console.log('cndasn', tempOut);
        setPoemsData(tempOut);
        setloaded(true);
        // setPoemsData([]);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.HeaderTitle}>Poems Dairy</Text>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={() => loadData()}>
          <Text style={{color: 'white', fontSize: 12}}>RELOAD</Text>
        </TouchableOpacity>
      </View>
      {loaded ? (
        <>
          {poemsData.length > 0 && (
            <ScrollView>
              {poemsData.map(item => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => navigation.navigate('Poem', {poemData: item})}
                  activeOpacity={0.5}
                  style={styles.singleContainer}>
                  <Text style={styles.singleText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </>
      ) : (
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <ActivityIndicator size={48} color="green" style={{marginTop: 100}} />
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPoem')}
        activeOpacity={0.5}
        style={styles.AddButton}>
        <View>
          <Text style={styles.AddButtonText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    position: 'relative',
  },
  titleContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },
  reloadButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: '#444',
    padding: 5,
    borderRadius: 4,
  },
  AddButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddButtonText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  HeaderTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  singleContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: '#f7f7f7',
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 2,
  },
  singleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
