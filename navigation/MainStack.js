import { createStackNavigator } from '@react-navigation/stack';
import Panel from '../screens/Panel';
import Agregar from '../screens/Agregar';
import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

function MainStack(props) {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Panel" children={()=><Panel mailUsuarioLogeado={props.mailUsuarioLogeado}/>} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default MainStack;