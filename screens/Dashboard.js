import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button  } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';

function Dashboard( props ) {
  const isFocused = useIsFocused();

  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);
  const navigation = useNavigation();

  /*useFocusEffect(() => {

    console.log("Focused");

  },[]);*/

  useEffect(() => {

    console.log(isFocused);
    //console.log(userGlobalData);
    /*database().ref('did/DEF').once('value', snapshot =>{

      snapshot.forEach((userSnapshot) => {
        console.log(userSnapshot);                                     
      });
      
    });*/

  }, [isFocused]); 

  /*const fetchChartData = async () => {

    database().ref('did/').once('value', snapshot =>{

      snapshot.forEach((userSnapshot) => {
        console.log(userSnapshot);                                     
      });
      
    });

  };*/

  return (
      <View>
        <Text>asddaadsadsads</Text>
        <Text>asddaadsadsads</Text>
        <Text>adsdsdasdsa</Text>
        <Button title="ASD" onPress={() => navigation.navigate('Panel')} />
        <VictoryChart width={350} theme={VictoryTheme.material}>

          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          />

        </VictoryChart>
      </View>
  );
}

export default Dashboard;