import 'react-native-gesture-handler';
import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainStackNavigator } from './navigators/MainStackNavigator';
import { PaperProvider } from 'react-native-paper';

const App: FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
