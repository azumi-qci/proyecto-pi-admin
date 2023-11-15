import Icon from 'react-native-vector-icons/MaterialIcons';
import { FC, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { DrawerNavigatorNavigationProp } from '../../types/Navigation.types';

const HomeScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigatorNavigationProp>();

  const onPressLogout = useCallback(() => {
    navigation.replace('Login');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImg}
          source={require('../../images/cucei-logo.png')}
        />
      </View>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => (
          <Icon name="key" size={24} color={theme.colors.tertiary} />
        )}>
        Registro de accesos
      </Button>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => (
          <Icon name="person" size={24} color={theme.colors.tertiary} />
        )}>
        Registro de usuarios
      </Button>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => (
          <Icon name="door-front" size={24} color={theme.colors.tertiary} />
        )}>
        Registro de puertas
      </Button>

      <Button
        style={[styles.button, styles.logoutButton]}
        mode="contained-tonal"
        icon={() => (
          <Icon name="logout" size={24} color={theme.colors.surface} />
        )}
        labelStyle={[styles.buttonLabel, { color: theme.colors.surface }]}
        buttonColor={theme.colors.error}
        onPress={onPressLogout}>
        Salir
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: Dimensions.get('window').width,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImg: {
    height: 150,
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    marginBottom: 30,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 6,
  },
  buttonLabel: {
    fontSize: 15,
  },
  logoutButton: {
    marginTop: 'auto',
  },
});

export default HomeScreen;
