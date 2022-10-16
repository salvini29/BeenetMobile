import React, { useState, useEffect } from 'react';
import { View, Pressable, ImageBackground, FlatList } from 'react-native';
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

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/userAction';

function Agregar( props ) {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [activa, setActiva] = useState('');

  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);

  const crearColmena = () => {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        mail_usuario: props.mailUsuarioLogeado,
        codigo: codigo,
        nombre: nombre,
        activa: activa,
        api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    return fetch('http://10.0.2.2:8000/api/createColmena', data)
    .then(response => response.json())  // promise
    .then(json => {
      console.log(json);
    });
  }

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
                        AGREGAR UNA COLMENA
                      </Heading>
                    </Center>
                  </Stack>
                  <Box width="100%" mt="8">
                    <Box>
                      <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="key" />} size={5} ml="2" color="yellow.500" />} placeholder="Codigo Colmena" onChangeText={text => setCodigo(text)}/>
                      <Text italic fontSize="xs" color="muted.400">Este codigo es unico y nos lo provee el hardware.</Text>
                    </Box>
                    <Box>
                      <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="badge-account" />} size={5} ml="2" color="yellow.500" />} placeholder="Nombre Colmena" mt="6" onChangeText={text => setNombre(text)}/>
                      <Text italic fontSize="xs" color="muted.400">Opcional y nos servira para distinguir las colmenas.</Text>
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
                      <Button onPress={() => crearColmena()} colorScheme="green">Guardar</Button>
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

export default Agregar;