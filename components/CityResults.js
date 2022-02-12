import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { useRecoilValue } from 'recoil';
import { resultState } from '../atoms/SearchType';

export default function CityResults() {
  
  const results = useRecoilValue(resultState)
  console.log("CITY");
  // console.log(results.geonames[0]);

  return (
    <View style={styles.screen}>

        <BackButton />

        <Text style={styles.title}>{results.geonames[0].toponymName}</Text>

        <View style={styles.populationView}>
          <Text style={styles.populationText}>
            Population
          </Text>
          <Text style={styles.populationNumber}>
            {results.geonames[0].population}
          </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#2E3440',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  populationView: {
    padding: 50,
    borderWidth: 1,
    borderColor: '#A3BE8C',
    borderRadius: '15px',
    marginBottom: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  populationText: {
    fontSize: 24,
  },
  populationTextNumber: {
    fontSize: 18,
  }
});
