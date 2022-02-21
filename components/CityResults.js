import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';
import { useRecoilValue } from 'recoil';
import { resultCityState } from '../atoms/atoms';

export default function CityResults() {
  
  const city = useRecoilValue(resultCityState)

  return (
    <View style={styles.screen}>

        <BackButton />

        <Text style={styles.title}>{city.toponymName}</Text>

        <View style={styles.populationView}>
          <Text style={styles.populationText}>
            Population
          </Text>
          <Text style={styles.populationNumber}>
            {city.population}
          </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
  },
  populationView: {
    alignSelf: 'stretch',
    height: '30%',
    borderWidth: 2,
    borderColor: '#39B77C',
    borderRadius: 15,
    marginVertical: 'auto',
    marginHorizontal: 40,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  populationText: {
    fontSize: 16,
    color: '#9CA38F',
  },
  populationNumber: {
    fontWeight: 'bold',
    fontSize: 32,
    marginVertical: 'auto'
  }
});
