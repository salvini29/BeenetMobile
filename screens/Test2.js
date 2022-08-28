import React, { useState, useEffect } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';

import { useSelector } from 'react-redux';

function Test2() {

  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);

  return (
    <View>
      {userGlobalData.map( cot => <Text key={cot.id} >{cot.nombre_colmena}</Text> )}
    </View>
  );
}

export default Test2;