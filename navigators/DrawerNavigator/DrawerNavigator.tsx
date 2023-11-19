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
import { UserManagementScreen } from '../../screens/UserManagementScreen';
import { AccessManagementScreen } from '../../screens/AccessManagementScreen';

const Drawer = createDrawerNavigator();

interface CustomDrawerProps extends DrawerContentComponentProps {}

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Administración de accesos', title: 'Inicio' }}
      />
      <Drawer.Screen
        name="AccessManagement"
        component={AccessManagementScreen}
        options={{
          headerTitle: 'Administrar acceso',
          title: 'Registro de accesos',
        }}
      />
      <Drawer.Screen
        name="UserManagement"
        component={UserManagementScreen}
        options={{
          headerTitle: 'Administrar usuarios',
          title: 'Registro de usuarios',
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawer: FC<CustomDrawerProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={[
          styles.drawerHeaderContainer,
          { borderBottomColor: theme.colors.shadow },
        ]}>
        <Text style={styles.headerTextBold}>Correo electrónico</Text>
        <Text>...</Text>
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
