/* eslint-disable quotes */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = props => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={props.backHandler}>
        <Text style={styles.backText}>{`< Back`}</Text>
      </TouchableOpacity>
      <Text style={styles.HeaderText}>{props.title}</Text>
      {props?.showDelete ? (
        <TouchableOpacity
          onPress={props.deleteHandler}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#555',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backText: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 50,
  },
  HeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 140,
  },
  deleteText: {
    fontSize: 12,
    color: 'white',
  },
});
