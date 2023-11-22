import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { useRoute } from '@react-navigation/native';
import { FC, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { EditAccessLogScreenRouteProp } from '../../types/navigation.types';

import api from '../../api';

const EditAccessLogScreen: FC = ({}) => {
  const { id } = useRoute<EditAccessLogScreenRouteProp>().params;

  const theme = useTheme();

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDoorPicker, setShowDoorPicker] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);

  const [doors, setDoors] = useState<{ id: number; name: string }[]>([]);

  const [data, setData] = useState({
    id: undefined,
    name: '',
    car_brand: '',
    car_color: '',
    car_plate: '',
    access_daytime: new Date(),
    id_door: undefined,
    visit_location: '',
  });

  const getAvailableDoors = () => {
    api
      .get<{ error: boolean; content: { id: number; name: string }[] }>(
        '/doors',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => setDoors(response.data.content))
      .catch();
  };

  const onPressSave = () => {};

  const onPressCancelSelectDoor = () => {
    setSelectedDoor(null);
    setShowDoorPicker(false);
  };

  useEffect(() => {
    const getSavedToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');

      if (savedToken) {
        setToken(savedToken);
      }
    };

    getSavedToken();
  }, []);

  useEffect(() => {
    if (doors.length && id != undefined) {
      // TODO: Fetch all access log data
    }
  }, [doors]);

  useEffect(() => {
    if (token) {
      getAvailableDoors();
    }
  }, [token]);

  return (
    <>
      <DatePicker
        cancelText="Cancelar"
        confirmText="Aceptar"
        date={data.access_daytime}
        locale="es-MX"
        modal={true}
        mode="date"
        onCancel={() => setShowDatePicker(false)}
        open={showDatePicker}
        title="Seleccionar fecha de llegada"
      />
      <DatePicker
        cancelText="Cancelar"
        confirmText="Aceptar"
        date={data.access_daytime}
        locale="es-MX"
        modal={true}
        mode="time"
        onCancel={() => setShowTimePicker(false)}
        open={showTimePicker}
        title="Seleccionar hora de llegada"
      />
      <Portal>
        <Dialog visible={showDoorPicker} onDismiss={onPressCancelSelectDoor}>
          <Dialog.Title>Seleccionar acceso</Dialog.Title>
          <Dialog.Content>
            {doors.length ? (
              doors.map(item => (
                <Pressable
                  onPress={() => setSelectedDoor(item.id)}
                  style={styles.radioButtonContainer}>
                  <RadioButton
                    key={item.id}
                    status={selectedDoor === item.id ? 'checked' : 'unchecked'}
                    value={item.id.toString()}
                  />
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </Pressable>
              ))
            ) : (
              <Text>No hay puertas disponibles</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onPressCancelSelectDoor}>Cancelar</Button>
            <Button onPress={() => setShowDoorPicker(false)}>Aceptar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Nombre"
          mode="outlined"
          style={styles.input}
        />
        <Pressable disabled={loading} onPress={() => setShowDatePicker(true)}>
          <TextInput
            editable={false}
            label="Fecha de llegada"
            mode="outlined"
            style={styles.input}
          />
        </Pressable>
        <Pressable disabled={loading} onPress={() => setShowTimePicker(true)}>
          <TextInput
            editable={false}
            label="Hora de llegada"
            mode="outlined"
            style={styles.input}
          />
        </Pressable>
        <Pressable disabled={loading} onPress={() => setShowDoorPicker(true)}>
          <TextInput
            editable={false}
            label="Acceso"
            mode="outlined"
            style={styles.input}
          />
        </Pressable>
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Marca del automóvil"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Color del automóvil"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Lugar de visita"
          mode="outlined"
          style={styles.input}
        />
        <Button disabled={loading} mode="contained-tonal" onPress={onPressSave}>
          Guardar
        </Button>
        {error.includes('empty') ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            Existen campos vacíos
          </Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    marginTop: 10,
    textAlign: 'right',
  },
  radioButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioButtonText: {
    marginLeft: 6,
  },
});

export default EditAccessLogScreen;
