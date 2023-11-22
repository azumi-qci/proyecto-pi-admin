import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { Text, Card, TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';

import { LoginNavigationProp } from '../../types/navigation.types';

import api from '../../api';

const LoginScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<LoginNavigationProp>();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const login = useCallback(() => {
    if (!data.email) {
      setError('empty-email');
      return;
    } else if (!data.password) {
      setError('empty-password');
      return;
    }

    setLoading(true);

    api
      .post<{ error: boolean; content: { email: string; token: string } }>(
        '/auth/login',
        {
          email: data.email.trim(),
          password: data.password.trim(),
        },
      )
      .then(async response => {
        try {
          await AsyncStorage.setItem('email', response.data.content.email);
          await AsyncStorage.setItem('token', response.data.content.token);

          navigation.replace('DrawerNavigator');
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        const axiosError = error as AxiosError;

        if (!axiosError.response) {
          setError('connection-error');
        } else if (axiosError.response.status === 401) {
          setError('wrong-data');
        }
      })
      .finally(() => setLoading(false));
  }, [data]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgrondImage}
        source={require('../../images/background.jpg')}
        resizeMode="cover">
        <Card style={styles.card}>
          <Card.Content>
            <Image
              style={styles.logoImg}
              source={require('../../images/cucei-logo.png')}
            />
            <Text style={styles.title} variant="headlineMedium">
              Administración de acceso
            </Text>
            <TextInput
              disabled={loading}
              inputMode="email"
              error={error === 'empty-email'}
              label="Correo electrónico"
              mode="outlined"
              onChangeText={text => setData({ ...data, email: text })}
              style={styles.field}
              value={data.email}
            />
            <TextInput
              disabled={loading}
              inputMode="text"
              error={error === 'empty-password'}
              label="Contraseña"
              mode="outlined"
              onChangeText={text => setData({ ...data, password: text })}
              secureTextEntry
              style={styles.field}
              value={data.password}
            />
            <Button
              disabled={loading}
              onPress={login}
              mode="contained-tonal"
              icon={
                loading
                  ? () => (
                      <Icon
                        name="hourglass-empty"
                        size={20}
                        color={theme.colors.tertiary}
                      />
                    )
                  : undefined
              }>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            {error.includes('empty') ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                Existen campos vacíos
              </Text>
            ) : null}
            {error.includes('server') ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                Hubo un error en el servidor
              </Text>
            ) : null}
            {error.includes('connection') ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                Error de conexión con el servidor
              </Text>
            ) : null}
            {error.includes('wrong') ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                Las credenciales no son válidas
              </Text>
            ) : null}
          </Card.Content>
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgrondImage: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  errorText: {
    marginTop: 10,
    textAlign: 'right',
  },
  logoImg: {
    height: 150,
    resizeMode: 'contain',
    width: '100%',
    marginBottom: 30,
  },
});

export default LoginScreen;
