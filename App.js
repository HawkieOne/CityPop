import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';
import CityResults from './pages/CityResults';
import CountryResults from './pages/CountryResults';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  const Stack = createStackNavigator();
  return (
    /*
    * Recoil is a state management library https://recoiljs.org/
    * It is used to transfer data between components in the app.
    */
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home" 
            screenOptions={{headerShown: false}}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="CityResults" component={CityResults} />
            <Stack.Screen name="CountryResults" component={CountryResults} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
