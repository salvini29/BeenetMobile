import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button  } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';

function Dashboard( props ) {

  useEffect(() => {

    /*database()
    .ref('/did/DEF')
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
    });

    fetchChartData();*/

    database().ref('did/DEF').once('value', snapshot =>{

      snapshot.forEach((userSnapshot) => {
        console.log(userSnapshot);                                     
      });
      
    });

  }, []); 

  const fetchChartData = async () => {

    database().ref('did/').once('value', snapshot =>{

      snapshot.forEach((userSnapshot) => {
        console.log(userSnapshot);                                     
      });
      
    });
    //const reference = database().ref('/did/');
    //reference.limitToFirst(3).once('value');
    //console.log(reference);
    /*return database().ref('/User').once('value').then(snapshot => {
        console.log('User data: ', snapshot.val());
    });*/

  };

  return (
      <View>
        <Button title="ASD" onPress={fetchChartData} />
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