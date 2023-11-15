import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DrawerNavigator } from '../DrawerNavigator';
import { LoginScreen } from '../../screens/LoginScreen';

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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
