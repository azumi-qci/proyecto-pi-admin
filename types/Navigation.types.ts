import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
};

export type DrawerParamList = {
  DrawerNavigator: undefined;
  UserManagement: undefined;
  AccessManagement: undefined;
};

export type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type DrawerNavigatorNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'DrawerNavigator'>,
  DrawerNavigationProp<DrawerParamList>
>;
