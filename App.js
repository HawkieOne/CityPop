import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityPop</Text>
      <View style={styles.btnView}>
        <Button 
          title="SEARCH BY CITY" 
          style={styles.btn} 
          color="#B48EAD" 
          onPress={() => console.log("1")} 
          accessibilityLabel="Seacrh by city name"
        />
        <Button 
          title="SEARCH BY COUNTRY" 
          style={styles.btn} 
          color="#5E81AC" 
          onPress={() => console.log("2")} 
          accessibilityLabel="Search by country name"
        />
      </View>
      <StatusBar style="auto" />
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
