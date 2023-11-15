import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

import { LoginScreen } from '../../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator: FC = () => {
  return (
    <PaperProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
};

export default MainStackNavigator;
