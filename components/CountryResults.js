import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import { useRecoilValue } from 'recoil';
import { resultCountryState } from '../atoms/atoms';

export default function CountryResults() {
  
  const results = useRecoilValue(resultCountryState)
  console.log(results);

  const buttonClickedHandler = (city) => {
    console.log(city);
  };

  return (
    <View style={styles.screen}>
      <BackButton style={styles.backButton} />

      <Text style={styles.title}>{results.genonames[0].countryName}</Text>

      <View style={styles.citiesView}>
        <ScrollView>
            {results.geonames.map((city, index) => (
              <TouchableOpacity
                key={city.geonameId}
                // Make into subcomponent
                // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
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
    position: 'sticky,'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
    textAlign: 'center',
  },
  citiesView: {
    borderWidth: 1,
    borderColor: '#39B77C',
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 40,
    marginTop: 'auto',
    marginBottom: 'auto',
    // height: "30%",
  },
  cityTextView: {
    borderWidth: 1,
    borderColor: '#39B77C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  cityText: {
    fontSize: 20,
  }
});
