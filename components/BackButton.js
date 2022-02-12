import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BackButton() {

    const navigation = useNavigation();

    const buttonClickedHandler = () => {
        navigation.goBack();
    };

  return (
    <View style={styles.backButtonView}>
        <TouchableOpacity onPress={buttonClickedHandler} style={styles.backButton}>
          <Icon name="arrow-left" size={20} style={styles.backIcon} />
          <Text style={styles.backText}>CityPop</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    backButtonView: {      
      marginTop: 10,
      marginLeft: 10,
      marginRight: 'auto',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderWidth: 1,
      borderColor: '#D08770',
      borderRadius: 25
    },
    backIcon: {
      marginRight: 10,
      color: '#D08770'
    },
    backText: {
      fontSize: 14
    }
  });