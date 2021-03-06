import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
const { getCode } = require('country-list');
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { apiGeoNames } from '../api/geoNames';


export default function SearchScreen({ route }) {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { searchType } = route.params;
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  const [text, onChangeText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const searchButtonClickedHandler = () => {
    if (!checkSearchNotEmpty() || !checkSearchIsLetters()) {
      return;
    }
    if (searchType === 'city') {
      handleCitySearch();
    } else if (searchType === 'country') {
      handleCountrySearch();
    }
  };

  const checkSearchIsLetters = () => {
    const regexExpression = /^[A-Za-zåÅäÄöÖ]+$/;
      if (!text.match(regexExpression)) {
        setErrorMessage("Only letters are allowed");
        return false;
      }
      return true;
  }

  const checkSearchNotEmpty = () => {
    if(text.trim() === "") {
      showErrorMessage("Please enter a " + searchType);
      return false;
    }
    return true;
  }

  const handleCitySearch = () => {
    apiGeoNames.city(text).then((response) => {
      if (response.error) {
        showErrorMessage(response.message.substring(0, 4) 
                          + " " + searchType + " " + 
                          response.message.substring(4));   
        setShowLoadingIndicator(false);     
        return;
      }  
      setShowLoadingIndicator(false);        
      // To ensure that the error message is gone if the user returns to this screen    
      setErrorMessage(null);
      navigation.push("CityResults", {
        results: response.geonames[0],
      });        
    })
    .catch(error => {
      showErrorMessage(error);  
    })
  }

  const handleCountrySearch = () => {
    // Converts the country name to respective country code 
    const countryCode = getCode(text);
    apiGeoNames.country(text, countryCode).then((response) => {
      if (response.error) {
        showErrorMessage(`${response.message.substring(0, 4)} ${searchType} ${response.message.substring(4)}`);   
        setShowLoadingIndicator(false);     
        return;
      }  
      setShowLoadingIndicator(false);        
      // To ensure that the error message is gone if the user returns to this screen    
      setErrorMessage(null);
      navigation.push("CountryResults", {
        results: response,
      });        
    })
    .catch(error => {
      showErrorMessage(error);  
    })
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
