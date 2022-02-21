import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from './BackButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { resultCityState, resultCountryState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CountryResults() {
  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const results = useRecoilValue(resultCountryState)
  const setCityResults = useSetRecoilState(resultCityState);


  const onCityClickHandler = (city) => {
    setCityResults(city);
    navigation.push("CityResults");
  };


  const styles = StyleSheet.create({
    screen: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#FCFCFC',
      flex: 1,
      justifyContent: 'space-around',
    },
    mainView: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 32,
      marginTop: 'auto',
      textAlign: 'center',
    },
    citiesView: {
      paddingVertical: 15,
      marginHorizontal: 40,
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    cityTextView: {
      borderWidth: 1,
      borderColor: '#39B77C',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cityText: {
      fontSize: 20,
    }
  });
  return (
    <SafeAreaView style={styles.screen}>

      <BackButton />

      <View style={styles.mainView}>
        <Text style={styles.title}>{results.geonames[0].countryName}</Text>

        <View style={styles.citiesView}>
          <ScrollView
            alwaysBounceVertical={true}
          >
              {results.geonames.map((city, index) => (
                <TouchableOpacity
                  key={city.geonameId}
                  /**
                  * TODO: The text for every city could be in its own component
                  */
                  onPress={() => onCityClickHandler(city)}
                  style={styles.cityTextView}
                >
                  <Text style={styles.cityText}>{city.name}</Text>
                </TouchableOpacity>   
              ))}
            </ScrollView>   
        </View>
      </View>
          
    </SafeAreaView>
  )
}
