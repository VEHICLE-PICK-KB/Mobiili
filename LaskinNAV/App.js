import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen'
import History from './History'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  
const Stack = createNativeStackNavigator();

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Calculator" component={HomeScreen} />
<Stack.Screen name="History" component={History} />
</Stack.Navigator>
</NavigationContainer>
    
  );
}

