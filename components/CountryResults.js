import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { useRecoilValue } from 'recoil';
import { resultState } from '../atoms/SearchType';

export default function CountryResults() {
  
  const results = useRecoilValue(resultState)
  console.log("Country");
  // console.log(results);

  return (
    <View style={styles.screen}>

        <BackButton />

        <Text style={styles.title}>{results.geonames[0].topnymname}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#2E3440',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
  },
  searchView: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
