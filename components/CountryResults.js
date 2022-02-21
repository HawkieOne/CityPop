import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { resultCityState, resultCountryState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';

export default function CountryResults() {
  
  const navigation = useNavigation();
  const results = useRecoilValue(resultCountryState)
  const [setCityResults] = useSetRecoilState(resultCityState);
  console.log(results);
  const buttonClickedHandler = (city) => {
    setCityResults(city);
    navigation.push("CityResults");
  };

  return (
    <View style={styles.screen}>
      <BackButton style={styles.backButton} />

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
                onPress={() => buttonClickedHandler(city)}
                style={styles.cityTextView}
              >
                 <Text style={styles.cityText}>{city.name}</Text>
              </TouchableOpacity>   
            ))}
          </ScrollView>   
      </View>
          
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FCFCFC',
    flex: 1,
    justifyContent: 'space-around',
  },
  backButton: {
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
