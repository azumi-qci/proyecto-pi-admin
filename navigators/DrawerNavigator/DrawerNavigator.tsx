import { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen } from '../../screens/HomeScreen';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Monitoreo de entrada', title: 'Inicio' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
