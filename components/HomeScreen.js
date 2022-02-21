import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { searchTypeState } from '../atoms/atoms';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FlagIcon from 'react-native-vector-icons/Entypo';

export default function App() {
    
  const [type, setType] = useRecoilState(searchTypeState)
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>CityPop</Text>
          <View style={styles.btnView}>
                <TouchableOpacity 
                style={[styles.btn, styles.cityButton]} 
                onPress={() => {
                  setType("city");
                  navigation.push("SearchScreen");                    
                }} 
                accessibilityLabel="Search by city name"
                >
                  <Icon name="city" size={20} style={styles.icon} />
                  <Text style={styles.btnText}>SEARCH BY CITY</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.btn, styles.countryButton]} 
                onPress={() => {
                    setType("country");
                    navigation.push("SearchScreen");
                }}
                accessibilityLabel="Search by country name"
                >
                  <FlagIcon name="sweden" size={20} style={styles.icon} />
                  <Text style={styles.btnText}>SEARCH BY COUNTRY</Text>
                </TouchableOpacity>
            </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'space-around',   
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 'auto',
    color: '#484848',
    textAlign: 'center'
  },
  btnView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  btn: {
    flexDirection: 'row',
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#39B77C'
  },
  icon: {
    color: '#484848',
  },
  btnText: {
    marginLeft: 10,
    color: '#FCFCFC',
  },
  cityButton: {
    
  },
  countryButton: {
    marginTop: 10,
  }
});
