import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, ImageBackground } from 'react-native';
import { VictoryVoronoiContainer, VictoryChart, VictoryTheme, VictoryLine,VictoryLabel, VictoryAxis } from "victory-native";
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
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
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';

function Dashboard( {route} ) {
  const [dataTempI, setDataTempI] = useState([]);
  const [dataTempE, setDataTempE] = useState([]);
  const [dataHumI, setDataHumI] = useState([]);
  const [dataHumE, setDataHumE] = useState([]);
  const [dataPresI, setDataPresI] = useState([]);
  const [dataPresE, setDataPresE] = useState([]);
  const [dataPeso, setDataPeso] = useState([]);

  const isFocused = useIsFocused();

  const userGlobalData = useSelector((store) => store.userGlobalData.userGlobalData);
  const navigation = useNavigation();

  const { codigo, nombre, activa } = route.params;

  useEffect(() => {

    const loadData = async () => {

      database()
      .ref('did/'+codigo)
      .once('value')
      .then(snapshot => {
        let data_firebase = snapshot.val();
        //console.log(data_firebase);
        let arrayTempI = [];
        let arrayTempE = [];
        let arrayHumI = [];
        let arrayHumE = [];
        let arrayPresI = [];
        let arrayPresE = [];
        let arrayPeso = [];
        for(var key in data_firebase) {
            //console.log(key);
            //if (data_firebase.hasOwnProperty(key)) {
            //console.log(key + " -> " + JSON.stringify(data_firebase[key]));
            //}
            let medida = (data_firebase[key]);
          
            //TEMPERATURA
            let itemp_medida = medida.temp;
            let etemp_medida = medida.etemp;
            //HUMEDAD
            let ihumid_medida = medida.humid;
            let ehumid_medida = medida.ehumid;
            //PRESION
            let ipress_medida = medida.press;
            let epress_medida = medida.epress;
            //PESO
            let peso_medida = medida.peso;
            
            let t_medida = medida.time;
            let t_medida_humana = new Date(t_medida*1000);
            let t_medida_humana_completa = t_medida_humana.toLocaleDateString("default") + " " +t_medida_humana.toLocaleTimeString("default");
  
            //console.log(t_medida_humana_completa);
            let adderDataTempI = {x: t_medida_humana_completa, y: itemp_medida};
            let adderDataTempE = {x: t_medida_humana_completa, y: etemp_medida};
            let adderDataHumI = {x: t_medida_humana_completa, y: ihumid_medida};
            let adderDataHumE = {x: t_medida_humana_completa, y: ehumid_medida};
            let adderDataPresI = {x: t_medida_humana_completa, y: ipress_medida};
            let adderDataPresE = {x: t_medida_humana_completa, y: epress_medida};
            let adderDataPeso = {x: t_medida_humana_completa, y: peso_medida};
            arrayTempI.push(adderDataTempI);
            arrayTempE.push(adderDataTempE);
            arrayHumI.push(adderDataHumI);
            arrayHumE.push(adderDataHumE);
            arrayPresI.push(adderDataPresI);
            arrayPresE.push(adderDataPresE);
            arrayPeso.push(adderDataPeso);

            //console.log(adderDataTemp);
  
            //setDataTemp(dataTemp => [...dataTemp, adderDataTemp]);
            //NO SIRVEsetDataTemp((dataTemp) => dataTemp.concat([ ...adderDataTemp]))
            //console.log( t_medida_humana_completa );
        }
        arrayTempI.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayTempE.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayHumI.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayHumE.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayPresI.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayPresE.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        arrayPeso.sort(function(a,b){
          return a.x.localeCompare(b.x);
        });
        setDataTempI(arrayTempI);
        setDataTempE(arrayTempE);
        setDataHumI(arrayHumI);
        setDataHumE(arrayHumE);
        setDataPresI(arrayPresI);
        setDataPresE(arrayPresE);
        setDataPeso(arrayPeso);
      });

    };


    loadData().catch(console.error);

  }, []); 


  return (
    <NativeBaseProvider>
      <ImageBackground source={require('../resources/img/backblur.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{marginTop: '15%', flex: 1, alignItems: 'center' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Box backgroundColor="white" width="93%" rounded="lg" overflow="hidden" >
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${(datum.y)}°, ${(datum.x)}`}/>}
            >
              <VictoryLabel text="Temperatura" x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: "#3e95cd", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataTempI}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#8e5ea2", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataTempE}
              />
              <VictoryAxis dependentAxis/>
              <VictoryAxis tickFormat={(t) => `t`}/>
            </VictoryChart>
          </Box>
          <Box backgroundColor="white" width="93%" rounded="lg" overflow="hidden" mt="5">
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${(datum.y)}%, ${(datum.x)}`}/>}
            >
              <VictoryLabel text="Humedad" x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: "#3e95cd", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataHumI}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#8e5ea2", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataHumE}
              />
              <VictoryAxis dependentAxis/>
              <VictoryAxis tickFormat={(t) => `t`}/>
            </VictoryChart>
          </Box>
          <Box backgroundColor="white" width="93%" rounded="lg" overflow="hidden" mt="5">
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${(datum.y)}hPa, ${(datum.x)}`}/>}
            >
              <VictoryLabel text="Presión" x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: "#3e95cd", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataPresI}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#8e5ea2", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataPresE}
              />
              <VictoryAxis dependentAxis/>
              <VictoryAxis tickFormat={(t) => `t`}/>
            </VictoryChart>
          </Box>
          <Box backgroundColor="white" width="93%" rounded="lg" overflow="hidden" mt="5">
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `${(datum.y)} Kg, ${(datum.x)}`}/>}
            >
              <VictoryLabel text="Peso" x={180} y={30} textAnchor="middle"/>
              <VictoryLine
                style={{
                  data: { stroke: "#3e95cd", strokeWidth:3 },
                  parent: { border: "1px solid #ccc"}
                }}
                data={dataPeso}
              />
              <VictoryAxis dependentAxis/>
              <VictoryAxis tickFormat={(t) => `t`}/>
            </VictoryChart>
          </Box>
        </ScrollView>
        </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

export default Dashboard;