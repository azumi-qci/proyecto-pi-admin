import Icon from 'react-native-vector-icons/MaterialIcons';
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import { DrawerNavigator } from '../DrawerNavigator';
import { LoginScreen } from '../../screens/LoginScreen';
import { DoorDataScreen } from '../../screens/DoorDataScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator: FC = () => {
  const theme = useTheme();

  const onPressNewLog = () => {};

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
        name="DoorDataScreen"
        component={DoorDataScreen}
        options={{
          title: 'Registros de puerta',
          headerRight: () => (
            <Pressable onPress={() => onPressNewLog()}>
              <Icon name="add" size={20} color={theme.colors.tertiary} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
