import { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import { HomeScreen } from '../../screens/HomeScreen';

const Drawer = createDrawerNavigator();

interface CustomDrawerProps extends DrawerContentComponentProps {
  email: string;
}

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <CustomDrawer email="alejandro-hdez115@outlook.com" {...props} />
      )}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Monitoreo de entradas', title: 'Inicio' }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawer: FC<CustomDrawerProps> = ({ email, ...props }) => {
  const theme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={[
          styles.drawerHeaderContainer,
          { borderBottomColor: theme.colors.shadow },
        ]}>
        <Text style={styles.headerTextBold}>Correo electrónico</Text>
        <Text>{email}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeaderContainer: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  headerTextBold: {
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;
