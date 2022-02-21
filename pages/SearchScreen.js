import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { resultCityState, searchTypeState, resultCountryState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
const { getCode } = require('country-list');
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const searchType = useRecoilValue(searchTypeState);
  const setCityResults = useSetRecoilState(resultCityState);
  const setCountryResults = useSetRecoilState(resultCountryState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  const [text, onChangeText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const searchButtonClickedHandler = () => {
    // If the user has not entered a search term
    if(text === "") {
      showErrorMessage("Please enter a " + searchType + " search term");
      return;
    }
    setShowLoadingIndicator(true);
    if (searchType === 'city') {
      const apiURL = `http://api.geonames.org/searchJSON?name_equals=${text.trim()}&featureClass=P&username=weknowit&maxRows=1`;
      axios.get(apiURL)
      .then((response) => {
        handleCitySearchResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
    } else if (searchType === 'country') {
      // Converts the country name to respective country code 
      const countryCode = getCode(text);
      const apiURL = `http://api.geonames.org/searchJSON?q=${text.trim()}&country=${countryCode}&featureClass=P&orderby=population&username=weknowit&maxRows=20`;
      axios.get(apiURL)
      .then((response) => {
        handleCountrySearchResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const handleCitySearchResponse = (response) => {
    setShowLoadingIndicator(false);        
    if (response.status !== 200) {
      showErrorMessage("The API could not be reached.");          
      return;
    }
    // If the api return zero results
    if (response.data.totalResultsCount === 0) {          
      showErrorMessage("The city was not found.");
      return;
    }     
    // To ensure that the error message is gone if the user returns to this screen    
    setErrorMessage(null);
    setCityResults(response.data.geonames[0]);
    navigation.push("CityResults");  
  }

  const handleCountrySearchResponse = (response) => {
    setShowLoadingIndicator(false);
    if (response.status !== 200) {
      showErrorMessage("The API could not be reached.");          
      return;
    }
    // If the api return zero results
    if (response.data.totalResultsCount === 0) {
      showErrorMessage("The country was not found.");
      return;
    }
    // To ensure that the error message is gone if the user returns to this screen   
    setErrorMessage(null);
    setCountryResults(response.data);
    navigation.push("CountryResults");
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message);
  }

  const styles = StyleSheet.create({
    screen: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: '#FCFCFC',
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    mainView: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 26,
      marginTop: 'auto',
      textAlign: 'center'
    },
    searchView: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    inputArea: {
      borderBottomWidth: 1,
      borderBottomColor: '#39B77C',
      margin: 12,
    },
    input: {
      height: 40,    
      padding: 10,
      textAlign: 'left',
    },
    inputFocus: {
      height: 40,    
      padding: 10,
      textAlign: 'left',
      // outlineColor: '#39B77C',
      // outlineWidth: 1,
    },
    searchButton: {
      alignSelf: 'center',
      width: 60,
      height: 60,
      backgroundColor: '#39B77C',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
    },
    errorView: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: 50,
      marginHorizontal: 12,
    },
    errorMessage: {
      color: 'white',      
    },
    errorMessageActive: {
      backgroundColor: '#BF616A',
    },
    loadingIndicator: {
      marginBottom: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    outlineRed: {
      borderBottomWidth: 2,
      borderBottomColor: '#BF616A',
    }
  });

  return (
    <SafeAreaView style={styles.screen}>

        <BackButton />

        <View style={styles.mainView}>
          <Text style={styles.title}>SEARCH BY {searchType.toUpperCase()}</Text>

          <View style={styles.searchView}>

            {/* 
              * Only visible when error message is not null 
            */}
            <View style={[styles.errorView, errorMessage && styles.errorMessageActive]}>
              <Text style={styles.errorMessage}>
                {errorMessage}
              </Text>
            </View>

            <View style={[styles.inputArea, errorMessage && styles.outlineRed]}>
              <TextInput
                // * styles.inputFocus is active when the input has focus
                style={inputFocused ? styles.inputFocus : styles.input}
                onChangeText={onChangeText}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                value={text}
                placeholder={'Enter a ' + searchType}
                returnKeyType="search"
              />
            </View>
            
            <TouchableOpacity
              onPress={searchButtonClickedHandler}
              style={styles.searchButton}>
                <Icon name="search" size={30} style={styles.icon} />
            </TouchableOpacity>          
          </View> 

          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="black" animating={showLoadingIndicator}/>        
          </View>
        </View>
    </SafeAreaView>
  )
}
