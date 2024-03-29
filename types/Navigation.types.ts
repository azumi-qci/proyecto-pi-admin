import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
  Login: undefined;
  DrawerNavigator: undefined;
  AccessLogListScreen: { id: number; name: string };
  EditAccessLogScreen: { id?: number; refreshData(): void };
};

export type DrawerParamList = {
  DrawerNavigator: undefined;
  UserManagement: undefined;
  AccessManagementScreen: undefined;
};

export type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type DrawerNavigatorNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'DrawerNavigator'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type AccessManagementScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'AccessLogListScreen'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type AccessLogListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AccessLogListScreen'
>;

export type AccessLogListRouteProp = RouteProp<
  RootStackParamList,
  'AccessLogListScreen'
>;

export type EditAccessLogScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditAccessLogScreen'
>;
