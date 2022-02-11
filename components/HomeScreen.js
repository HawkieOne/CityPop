import { StyleSheet, Text, View, Button } from 'react-native';
import { useRecoilState } from 'recoil';
import { searchTypeState } from '../atoms/SearchType';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    
  const [type, setType] = useRecoilState(searchTypeState)
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text style={styles.title}>CityPop</Text>
          <View style={styles.btnView}>
                <Button 
                title="SEARCH BY CITY" 
                style={styles.btn} 
                color="#B48EAD" 
                onPress={() => {
                  setType("city");
                  navigation.push("SearchScreen");                    
                }} 
                accessibilityLabel="Search by city name"
                />
                <Button 
                title="SEARCH BY COUNTRY" 
                style={styles.btn} 
                color="#5E81AC" 
                onPress={() => {
                    setType("country");
                    navigation.push("SearchScreen");
                }}
                accessibilityLabel="Search by country name"
                />
            </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3440',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginTop: 'auto',
  },
  btnView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  btn: {
    backgroundColor: '#4C566A',
    color: '#5E81AC',
    marginTop: '10%',
  }
});
