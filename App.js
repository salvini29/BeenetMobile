import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet,TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";

import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'react-native-gesture-handler';

import MainStack from './navigation/MainStack';

import Panel from './screens/Panel';
import Agregar from './screens/Agregar';
import Dashboard from './screens/Dashboard';
import Modificar from './screens/Modificar';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

var widthScreen = Dimensions.get('window').width; //full width
var heightScreen = Dimensions.get('window').height; //full height

function App() {
  const [loginUser, setloginUser] = useState('');
  const [loginPass, setloginPass] = useState('');
  const [registerName, setregisterName] = useState('');
  const [registerUser, setregisterUser] = useState('');
  const [registerPass, setregisterPass] = useState('');
  const [registerConf, setregisterConf] = useState('');

  //const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(false);
  const [showLogin, setshowLogin] = useState(true);

  const logearUser = () => {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        email: loginUser,
        password: loginPass,
        api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    return fetch('https://beenet.app/api/loginUser', data)
    .then(response => response.json())  // promise
    .then(json => {
      if( json == true )
      {
        setUser(true);
        return console.log("Logueado correctamente");
      }
      else
      {
        return console.log("No se ha podido loguear!");
      } 
    });
  }
  const registrarUser = () => {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        name: registerName,
        email: registerUser,
        password: registerPass,
        api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    return fetch('https://beenet.app/api/registerUser', data)
    .then(response => response.json())  // promise
    .then(json => {
      if( json.email == registerUser )
      {
        setUser(true);
        return console.log("Usuario creado exitosamente!");
      }
      else
      {
        return console.log("No se ha podido crear el Usuario!");
      } 
    });
  }

  _handlePress = () => {
    setshowLogin(!showLogin);
    console.log(showLogin)
  };

  //if (initializing) return null;

  if (!user) {
    return (
      <NativeBaseProvider>
        {
          showLogin ?

            // content of login
            <Center flex={1} px="3">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Bienvenido
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Logueate para continuar!
              </Heading>

              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Mail</FormControl.Label>
                  <Input autoCapitalize='none' onChangeText={text => setloginUser(text)}/>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Contraseña</FormControl.Label>
                  <Input type="password" autoCapitalize='none' onChangeText={text => setloginPass(text)}/>
                </FormControl>
                <Button mt="2" onPress={() => logearUser()}>
                  Loguearse
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Soy nuevo usuario.{" "}
                  </Text>
                  <Link
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                    onPress={() => setshowLogin(false)}
                  >
                    Registrarme
                  </Link>
                </HStack>
              </VStack>
            </Box>
            </Center>

            :
            // content of signup

            <Center flex={1} px="3">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
              <Heading
                size="lg"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                fontWeight="semibold"
              >
                Bienvenido
              </Heading>
              <Heading
                mt="1"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="medium"
                size="xs"
              >
                Registrate para continuar!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Nombre</FormControl.Label>
                  <Input autoCapitalize='none' onChangeText={text => setregisterName(text)}/>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Mail</FormControl.Label>
                  <Input autoCapitalize='none' onChangeText={text => setregisterUser(text)}/>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Contraseña</FormControl.Label>
                  <Input type="password" autoCapitalize='none' onChangeText={text => setregisterPass(text)}/>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Confirmar Contraseña</FormControl.Label>
                  <Input type="password" autoCapitalize='none' onChangeText={text => setregisterConf(text)}/>
                </FormControl>
                <HStack mt="6" justifyContent="center">
                    <Text
                      fontSize="sm"
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      Ya tengo cuenta.{" "}
                    </Text>
                    <Link
                      _text={{
                        color: "indigo.500",
                        fontWeight: "medium",
                        fontSize: "sm",
                      }}
                      onPress={() => setshowLogin(true)}
                    >
                    Loguearme
                    </Link>
                </HStack>
                <Button mt="2" onPress={() => registrarUser()}>
                  Registrarse
                </Button>
              </VStack>
            </Box>
            </Center>

        }
      </NativeBaseProvider>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#3F51B5',
            tabBarInactiveTintColor: 'gray',
            headerShown:false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
          }} >
          <Tab.Screen name="PanelTab" children={()=><MainStack mailUsuarioLogeado={loginUser}/>} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name={focused ? 'text-box' : 'text-box-outline'} color={color} size={size} />
            ),
            }}/>
          <Tab.Screen name="Agregar" children={()=><Agregar mailUsuarioLogeado={loginUser}/>} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name={focused ? 'plus-thick' : 'plus-outline'} color={color} size={size} />
            ),
            }}/>
          <Tab.Screen name="Modificar" children={()=><Modificar mailUsuarioLogeado={loginUser}/>} options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name={focused ? 'cog' : 'cog-outline'} color={color} size={size} />
            ),
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent: 'center',
    },
    containerDash:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submit:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0.02*heightScreen
    }
});