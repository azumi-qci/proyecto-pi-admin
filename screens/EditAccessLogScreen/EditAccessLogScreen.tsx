import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FC, useEffect, useState } from 'react';
import { Pressable, StyleSheet, ToastAndroid, View } from 'react-native';
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
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditAccessLogScreen: FC = ({}) => {
  const { id } = useRoute<EditAccessLogScreenRouteProp>().params;
  const navigation = useNavigation();
  const theme = useTheme();

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDoorPicker, setShowDoorPicker] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [doors, setDoors] = useState<{ id: number; name: string }[]>([]);

  const [data, setData] = useState({
    id: -1,
    name: '',
    car_brand: '',
    car_color: '',
    car_plate: '',
    access_daytime: new Date(),
    id_door: -1,
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

  const addNewAccessLog = () => {
    const newDate =
      selectedDate && selectedTime
        ? getCombinedDateAndTime()
        : data.access_daytime;

    api
      .post(
        `/access/${data.id_door}`,
        {
          name: data.name.trim(),
          car_brand: data.car_brand.trim(),
          car_color: data.car_color.trim(),
          car_plate: data.car_plate.trim(),
          access_daytime: `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()} ${
            newDate.toTimeString().split(' ')[0]
          }`,
          visit_location: data.visit_location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        ToastAndroid.show(
          'El registro se agregó exitosamente',
          ToastAndroid.LONG,
        );
        navigation.goBack();
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  };

  const updateAccessLog = () => {};

  const onPressSave = () => {
    setError('');

    if (
      !data.name ||
      !data.car_brand ||
      !data.car_color ||
      !data.car_plate ||
      data.id_door === -1 ||
      !data.visit_location
    ) {
      setError('empty-fields');
      return;
    } else if (!data.access_daytime || (!selectedDate && !selectedTime)) {
      setError('empty-fields');
      return;
    }

    setLoading(true);

    if (data.id > -1) {
      updateAccessLog();
      return;
    }

    addNewAccessLog();
  };

  const onPressCancelSelectDoor = () => {
    setSelectedDoor(null);
    setShowDoorPicker(false);
  };

  const onPressAcceptSelectDoor = () => {
    if (selectedDoor) {
      setData({ ...data, id_door: selectedDoor });
      setSelectedDoor(null);
      setShowDoorPicker(false);
    }
  };

  const getSelectedDoorName = (): string => {
    if (data.id_door < 0) {
      return '';
    } else {
      const doorIndex = doors.findIndex(item => item.id === data.id_door);

      if (doorIndex > -1) {
        return doors[doorIndex].name;
      }

      return '';
    }
  };

  const getCombinedDateAndTime = () => {
    return new Date(
      `${selectedDate || new Date().toDateString()} ${selectedTime}`,
    );
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
        date={selectedDate ? getCombinedDateAndTime() : data.access_daytime}
        locale="es-MX"
        modal={true}
        mode="date"
        onCancel={() => setShowDatePicker(false)}
        onConfirm={date => {
          setSelectedDate(date.toDateString());
          setShowDatePicker(false);
        }}
        open={showDatePicker}
        title="Seleccionar fecha de llegada"
      />
      <DatePicker
        cancelText="Cancelar"
        confirmText="Aceptar"
        date={selectedTime ? getCombinedDateAndTime() : data.access_daytime}
        locale="es-MX"
        modal={true}
        mode="time"
        onCancel={() => setShowTimePicker(false)}
        onConfirm={date => {
          setSelectedTime(date.toTimeString());
          setShowTimePicker(false);
        }}
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
                  key={item.id}
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
            <Button disabled={!selectedDoor} onPress={onPressAcceptSelectDoor}>
              Aceptar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.container}>
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Nombre"
          mode="outlined"
          onChangeText={text => setData({ ...data, name: text })}
          style={styles.input}
          value={data.name}
        />
        <Pressable disabled={loading} onPress={() => setShowDatePicker(true)}>
          <TextInput
            disabled={loading}
            editable={false}
            label="Fecha de llegada"
            mode="outlined"
            style={styles.input}
            value={
              selectedDate ? getCombinedDateAndTime().toLocaleDateString() : ''
            }
          />
        </Pressable>
        <Pressable disabled={loading} onPress={() => setShowTimePicker(true)}>
          <TextInput
            disabled={loading}
            editable={false}
            label="Hora de llegada"
            mode="outlined"
            style={styles.input}
            value={
              selectedTime ? getCombinedDateAndTime().toLocaleTimeString() : ''
            }
          />
        </Pressable>
        <Pressable disabled={loading} onPress={() => setShowDoorPicker(true)}>
          <TextInput
            disabled={loading}
            editable={false}
            label="Acceso"
            mode="outlined"
            style={styles.input}
            value={getSelectedDoorName()}
          />
        </Pressable>
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Marca del automóvil"
          mode="outlined"
          onChangeText={text => setData({ ...data, car_brand: text })}
          style={styles.input}
          value={data.car_brand}
        />
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Color del automóvil"
          mode="outlined"
          onChangeText={text => setData({ ...data, car_color: text })}
          style={styles.input}
          value={data.car_color}
        />
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Placa del automóvil"
          mode="outlined"
          onChangeText={text => setData({ ...data, car_plate: text })}
          style={styles.input}
          value={data.car_plate}
        />
        <TextInput
          disabled={loading}
          inputMode="text"
          label="Lugar de visita"
          mode="outlined"
          onChangeText={text => setData({ ...data, visit_location: text })}
          style={styles.input}
          value={data.visit_location}
        />
        <Button
          disabled={loading}
          mode="contained-tonal"
          onPress={onPressSave}
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
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
        {error.includes('empty') ? (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            Por favor llene todos los campos
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
