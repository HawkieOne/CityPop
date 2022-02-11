import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Button, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BackButton() {

    const navigation = useNavigation();

    const buttonClickedHandler = () => {
        navigation.push("Home");
    };

  return (
    <View style={styles.backButtonView}>
        <TouchableOpacity onPress={buttonClickedHandler}>
        <Icon name="arrow-left" size={30} color="#D08770" style={styles.backIcon} />
        </TouchableOpacity>
        <Text>CityPop</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    backButtonView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '10%',
      marginLeft: '10%',
      marginRight: 'auto',
    },
    backIcon: {
      marginRight: '5%',
    },
  });