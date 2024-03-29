import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, ToastAndroid, View } from 'react-native';
import {
  Dialog,
  Portal,
  Text,
  TouchableRipple,
  Button,
  useTheme,
} from 'react-native-paper';

import {
  AccessLogListRouteProp,
  AccessLogListScreenNavigationProp,
} from '../../types/navigation.types';
import { AccessLog } from '../../types/data.types';

import api from '../../api';

const AccessLogListScreen: FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<AccessLogListScreenNavigationProp>();

  const { id, name } = useRoute<AccessLogListRouteProp>().params;

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [logs, setLogs] = useState<AccessLog[] | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [logToDelete, setLogToDelete] = useState<number | null>(null);

  const getLogs = async () => {
    api
      .get<{ error: boolean; content: AccessLog[] }>(`/access/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          show_all: true,
        },
      })
      .then(respose => {
        setLogs(respose.data.content);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  };

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const getTime = (date: string) => {
    return new Date(date).toLocaleTimeString();
  };

  const onPressLog = (id: number) => {
    navigation.push('EditAccessLogScreen', {
      id,
      refreshData: () => getLogs(),
    });
  };

  const onPressNewAccessLog = () => {
    navigation.push('EditAccessLogScreen', {
      id: undefined,
      refreshData: () => getLogs(),
    });
  };

  const onLongPressLog = (id: number) => {
    setLogToDelete(id);
    setShowDeleteDialog(true);
  };

  const onCancelDeleteLog = () => {
    setLogToDelete(null);
    setShowDeleteDialog(false);
  };

  const onConfirmDeleteLog = () => {
    api
      .delete(`/access/${logToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const itemIndex = logs?.findIndex(item => item.id === logToDelete);

        if (logs && itemIndex !== undefined && itemIndex > -1) {
          const tempList = [...logs];

          tempList.splice(itemIndex, 1);

          setLogs(tempList);
        }
        // Show message
        ToastAndroid.show(
          'Se eliminó el registro correctamente',
          ToastAndroid.SHORT,
        );
      })
      .catch(error => {
        console.warn(error);
        // Alert error
        ToastAndroid.show(
          'Hubo un error al eliminar el registro',
          ToastAndroid.SHORT,
        );
      })
      .then(() => onCancelDeleteLog());
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
    if (token && loading) {
      getLogs();
    }
  }, [token]);

  if (loading) {
    return null;
  }

  return (
    <>
      {/* Dialog */}
      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={onCancelDeleteLog}>
          <Dialog.Title>Eliminar registro</Dialog.Title>
          <Dialog.Content>
            <Text>Está por eliminar el registro, ¿desea eliminar?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onCancelDeleteLog}>Cancelar</Button>
            <Button onPress={onConfirmDeleteLog}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {/* Content */}
      <View style={styles.container}>
        <Text style={styles.title} variant="titleLarge">
          {name}
        </Text>
        <View style={styles.newButtonContainer}>
          <Button
            icon={() => (
              <Icon name="add" size={20} color={theme.colors.surface} />
            )}
            mode="contained"
            onPress={() => onPressNewAccessLog()}>
            Nuevo
          </Button>
        </View>
        <FlatList
          data={logs}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => onPressLog(item.id)}
              onLongPress={() => onLongPressLog(item.id)}
              rippleColor="rgba(0, 0, 0, .32)">
              <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text>
                  {getTime(item.access_daytime)} |{' '}
                  {getDate(item.access_daytime)}
                </Text>
                <Text>
                  {item.car_brand} {item.car_color} {item.car_plate}
                </Text>
                <Text>{item.visit_location}</Text>
              </View>
            </TouchableRipple>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  title: {
    marginBottom: 15,
  },
  itemContainer: {
    padding: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  newButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 6,
  },
});

export default AccessLogListScreen;
