import React, { useState, useEffect } from 'react';
import { View, Text, Button, Pressable, ImageBackground, FlatList } from 'react-native';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Select,
  Center,
  ScrollView,
  Input,
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

function Panel( props ) {

  const dispatch = useDispatch();
 
  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);
 
  /*const handleIncrement = () => {
    dispatch(increment());
  };
 
  const handleDecrement = () => {
    dispatch(decrement());
  };*/
  
  useEffect(() => {

    //handleIncrement();handleIncrement();
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        email: props.mailUsuarioLogeado,
        api_key: "JU5jXTLyoVdVRXvlEWctRMSa60RsyUsYhIHXRo1OXbSSQ2r2QvaRvMH0r0gS19tp"
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch('http://10.0.2.2:8000/api/getColmenasUser', data)
    .then(response => response.json())  // promise
    .then(json => {

      dispatch({
        type: "LOAD_COLMENA",
        userData: json
      });

      console.log(json);

    });



  }, []); 

  const renderItem = ({ item }) => (
    <Box alignItems="center" mt="5">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={require('../resources/img/panal.jpg')} alt="image" width= "100%"
            height="100%"/>
          </AspectRatio>
          <Center bg="primary.600" _dark={{
          bg: "primary.600"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            COLMENA
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Nombre: {item.nombre_colmena}
            </Heading>
            <Heading size="md" ml="-1">
              Codigo: {item.codigo_colmena}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Box mr="1">
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  Estado:  
                </Text>
              </Box>
              <Box>
                { item.activa ? <Icon as={MaterialCommunityIcons} name="circle" color="#00FF00" _dark={{color: "warmGray.50"}}/> : <Icon as={MaterialCommunityIcons} name="circle" color="#ff5858" _dark={{color: "warmGray.50"}}/>}
              </Box>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <NativeBaseProvider>
      <ImageBackground source={require('../resources/img/backblur.jpg')} style={{width: '100%', height: '100%'}}>
        <View>
          <FlatList
            data={userGlobalData}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ImageBackground>
    </NativeBaseProvider>
    
  );
}

export default Panel;