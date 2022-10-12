
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Search History"  component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Language: javascript