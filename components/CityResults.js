import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from './BackButton';
import { useRecoilValue } from 'recoil';
import { resultCityState } from '../atoms/atoms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CityResults() {
  
  const insets = useSafeAreaInsets();
  const city = useRecoilValue(resultCityState);
  
  const styles = StyleSheet.create({
    screen: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      flex: 1,
      backgroundColor: '#FCFCFC',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 32,
      marginTop: 'auto',
    },
    populationView: {
      alignSelf: 'stretch',
      height: 100,
      borderWidth: 2,
      borderColor: '#39B77C',
      borderRadius: 15,
      marginTop: 20,
      marginBottom: 'auto',
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

  return (
    <SafeAreaView style={styles.screen}>

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
    </SafeAreaView>
  )
}
