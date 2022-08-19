import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Context=createContext({
  loggedin:false, 
  setlogin:()=>{},
});

const LoginScreen = () => {
  const {setlogin} = useContext(Context);

  return(
    <View style={styles.container}>
      <Text style={styles.text}>login here!</Text>
      <TouchableOpacity style={styles.button} onPress={() => setlogin(true)}>
        <Text> login! </Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>this is the home screen!</Text>
    </View>
  )
};

const ProfileScreen = () =>{
  const {setlogin} = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>this is your profile</Text>
      <Button style ={styles.button} title="logout" onPress = {() =>setlogin(false)}/>
    </View>
  );
};

export const MainScreens = () =>{
  return(
    <Tab.Navigator>
      <Tab.Screen name="home" component = {HomeScreen}/>
      <Tab.Screen name="profile" component = {ProfileScreen}/>
    </Tab.Navigator>
  );
};

export const InitNav = () => {
  const {loggedin} = useContext(Context);

  return(
    <Stack.Navigator>
      {loggedin
      ?<Stack.Screen name="all" component={MainScreens}/>
      :<Stack.Screen name="login" component={LoginScreen}/>}
    </Stack.Navigator>
  );
};

export default function App() {
  const [loggedin, setlogin] = useState(false);

  return (
    <Context.Provider value = {{loggedin, setlogin}}>
    <NavigationContainer>
      <InitNav/>
    </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color:'#888',
    fontsize: 40
  },

  button:{
    backgroundColor:'blue',
    margin:20,
    padding:20,
    borderRadius:5
  },
});
