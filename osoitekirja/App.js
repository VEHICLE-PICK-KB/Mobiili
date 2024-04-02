import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Places from './Places'
import Mapview from './Mapview'



export default function App() {
const Stack = createNativeStackNavigator();
return (
<NavigationContainer>
<Stack.Navigator>
<Stack.Screen name="My Places" component={Places} />
<Stack.Screen name="Map" component={Mapview} />
</Stack.Navigator>
</NavigationContainer>
);
}
