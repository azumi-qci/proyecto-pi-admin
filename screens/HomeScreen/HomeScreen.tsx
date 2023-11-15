import Icon from 'react-native-vector-icons/MaterialIcons';
import { FC } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const HomeScreen: FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => <Icon name="key" size={24} />}>
        Registro de accesos
      </Button>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => <Icon name="person" size={24} />}>
        Registro de usuarios
      </Button>
      <Button
        style={styles.button}
        mode="contained-tonal"
        labelStyle={styles.buttonLabel}
        icon={() => <Icon name="door-front" size={24} />}>
        Registro de puertas
      </Button>

      <Button
        style={[styles.button, styles.logoutButton]}
        mode="contained-tonal"
        icon={() => (
          <Icon name="logout" size={24} color={theme.colors.surface} />
        )}
        labelStyle={[styles.buttonLabel, { color: theme.colors.surface }]}
        buttonColor={theme.colors.error}>
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
