import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainStackNavigator } from './navigators/MainStackNavigator';

const App: FC = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
