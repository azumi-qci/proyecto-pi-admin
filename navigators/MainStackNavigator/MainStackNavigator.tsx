import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DrawerNavigator } from '../DrawerNavigator';
import { LoginScreen } from '../../screens/LoginScreen';
import { AccessLogListScreen } from '../../screens/AccessLogListScreen';
import { EditAccessLogScreen } from '../../screens/EditAccessLogScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccessLogListScreen"
        component={AccessLogListScreen}
        options={{
          title: 'Registros de puerta',
        }}
      />
      <Stack.Screen
        name="EditAccessLogScreen"
        component={EditAccessLogScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar registro' : 'Nuevo registro',
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
