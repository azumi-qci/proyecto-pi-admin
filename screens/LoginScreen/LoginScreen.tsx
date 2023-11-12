import Icon from 'react-native-vector-icons/MaterialIcons';
import { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, TextInput, Button } from 'react-native-paper';

import { colors } from '../../theme';

const LoginScreen: FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title} variant="headlineSmall">
            Iniciar sesión
          </Text>
          <TextInput
            label="Correo electrónico"
            mode="outlined"
            onChangeText={text => setData({ ...data, email: text })}
            style={styles.field}
            value={data.email}
          />
          <TextInput
            label="Contraseña"
            mode="outlined"
            onChangeText={text => setData({ ...data, password: text })}
            secureTextEntry
            style={styles.field}
            value={data.password}
          />
          <Button
            mode="contained"
            icon={
              loading
                ? () => (
                    <Icon
                      name="hourglass-empty"
                      size={20}
                      color={colors.white}
                    />
                  )
                : undefined
            }>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    marginHorizontal: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 14,
  },
  field: {
    marginBottom: 12,
  },
});

export default LoginScreen;
