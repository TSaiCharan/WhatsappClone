import React from 'react';
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Main from './screens/Main';
import Chat from './screens/Chat';
import {Provider} from 'react-redux';
import Store from './redux/store';
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Group from './screens/Group';

const Stack = createNativeStackNavigator();

function App(){
    return (
      <Provider store={Store}>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Main" component={Main}/>
          <Stack.Screen name="Chat" component={Chat}/>  
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Group" component={Group}/>
      </Stack.Navigator>
    </NavigationContainer>
      </Provider>   
    )
}

export default App; 