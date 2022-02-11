import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import CityResults from './components/CityResults';
import CountryResults from './components/CountryResults';
import { SearchContext, SearchContextProvider } from "./shared/contexts";
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}
