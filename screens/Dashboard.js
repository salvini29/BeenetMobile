import React from 'react';
import { Text, StyleSheet, View  } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];


function Dashboard( props ) {
  return (
      <View>
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