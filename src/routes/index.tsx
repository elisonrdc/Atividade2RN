import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Home from '../screens/home';
import Details from '../screens/details';

// Objeto com as telas do Stack
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator();

// Deixamos nossas rotas globais
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Listagem de projetos',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Detalhes',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
