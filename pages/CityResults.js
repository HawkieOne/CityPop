import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CityResults({ route }) {
  
  const insets = useSafeAreaInsets();
  const { results : city } = route.params;

  const styles = StyleSheet.create({
    screen: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      flex: 1,
      backgroundColor: '#FCFCFC',
      alignItems: 'center',
    },
    mainView: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 32,
      marginTop: 'auto',
    },
    populationView: {
      borderWidth: 2,
      borderColor: '#39B77C',
      borderRadius: 15,
      marginTop: 20,
      marginBottom: 'auto',
      marginHorizontal: 40,
      paddingTop: 30,
      paddingBottom: 30,
      paddingHorizontal: 80,
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

        <View style={styles.mainView}>
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
    </SafeAreaView>
  )
}
