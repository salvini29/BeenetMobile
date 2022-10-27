import React, { useState, useEffect } from 'react';
import { View, Pressable, ImageBackground, Alert} from 'react-native';
import {
  Box,
  Text,
  Heading,
  AspectRatio,
  Image,
  Select,
  Center,
  ScrollView,
  Input,
  Button,
  Icon,
  HStack,
  CheckIcon,
  FormControl,
  Stack,
  NativeBaseProvider,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

function Modificar( props ) {
  const [identificador, setIdentificador] = useState('');
  const [nombre, setNombre] = useState('');
  const [activa, setActiva] = useState('');

  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);

  const navigation = useNavigation();

  const fillTexto = (idSeleccionado) => {

    userGlobalData.forEach(colmena  => {
        if(colmena.id == idSeleccionado){
          setNombre(colmena.nombre_colmena);
          setActiva(colmena.activa);
        }
      }
    );

  };

  const modificarColmena = () => {

    if( identificador != '' )
    {
      let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
          mail_usuario: props.mailUsuarioLogeado,
          id_colmena_seleccionada: identificador,
          modif_nombre: nombre,
          modif_activa: activa,
          api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
        }),
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        }
      }
      return fetch('https://beenet.app/api/modifyColmena', data)
      .then(response => response.json())  // promise
      .then(json => {
        console.log(json);
        setIdentificador('');
        setNombre('');
        setActiva('');
        navigation.navigate('Panel');
      });
    }
    else
    {
      Alert.alert("ERROR","Tiene que seleccionar una colmena!");
    }

  };

  const eliminarColmena = () => {
    
    if( identificador != '' )
    {
      Alert.alert(
        "Esta seguro?",
        "Desea eliminar la colmena?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelado"),
            style: "cancel"
          },
          { text: "Eliminar", onPress: () => apiCallEliminar()}
        ]
      );
    }
    else
    {
      Alert.alert("ERROR","Tiene que seleccionar una colmena!");
    }

  };

  const apiCallEliminar = () => {

    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        mail_usuario: props.mailUsuarioLogeado,
        id_colmena_seleccionada: identificador,
        api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    return fetch('https://beenet.app/api/deleteColmena', data)
    .then(response => response.json())  // promise
    .then(json => {
      console.log(json);
      setIdentificador('');
      setNombre('');
      setActiva('');
      navigation.navigate('Panel');
    });

  };


  return (
    <NativeBaseProvider>
      <ImageBackground source={require('../resources/img/backblur.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={{
          flex: 1, 
          alignItems: 'center',
          justifyContent: 'center', 
      }}>
        <Box alignItems="center">
          <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700"
            }} _web={{
              shadow: 2,
              borderWidth: 0
            }} _light={{
              backgroundColor: "gray.50"
            }}>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Center>
                      <Heading size="md" ml="-1">
                        MODIFICAR UNA COLMENA
                      </Heading>
                    </Center>
                  </Stack>
                  <Box width="100%" mt="8">
                    <Box>
                      <Select InputLeftElement={<Icon as={<MaterialCommunityIcons name="badge-account" />} size={5} ml="2" color="yellow.500" />} placeholder="Seleccionar Colmena" mt="6" selectedValue={identificador} onValueChange={itemValue => {setIdentificador(itemValue); fillTexto(itemValue) } }>
                        {userGlobalData.map((colmena) => (
                          <Select.Item label={colmena.nombre_colmena} value={colmena.id} />
                        ))}
                      </Select>
                      <Text italic fontSize="xs" color="muted.400">Elija la colmena que quiere modificar o eliminar.</Text>
                    </Box>
                    <Box>
                      <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="badge-account" />} size={5} ml="2" color="yellow.500" />} placeholder="Nombre Colmena" mt="6" value={nombre} onChangeText={text => setNombre(text)}/>
                      <Text italic fontSize="xs" color="muted.400">Opcional para distinguir las colmenas.</Text>
                    </Box>
                    <Box>
                      <Select InputLeftElement={<Icon as={<MaterialCommunityIcons name="bee-flower" />} size={5} ml="2" color="yellow.500" />} placeholder="Esta en actividad la colmena?" mt="6" selectedValue={activa} onValueChange={itemValue => setActiva(itemValue)}>
                        <Select.Item label="SI" value="1"/>
                        <Select.Item label="NO" value="0"/>
                      </Select>
                      <Text italic fontSize="xs" color="muted.400">Actualmente la colmena funciona?</Text>
                    </Box>
                  </Box>
                  <Box mt="6">
                      <Button onPress={() => modificarColmena()} colorScheme="blue">Modificar</Button>
                  </Box>
                  <Box mt="1">
                      <Button onPress={() => eliminarColmena()} colorScheme="red">Eliminar</Button>
                  </Box>
                  <HStack alignItems="center" space={4} justifyContent="space-between">
                    <HStack alignItems="center">
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

export default Modificar;