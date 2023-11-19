import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List, Text, TouchableRipple } from 'react-native-paper';

import { DoorDataScreenRouteProp } from '../../types/navigation.types';
import { Log } from '../../types/data.types';

import api from '../../api';

const DoorDataScreen: FC = () => {
  const { id, name } = useRoute<DoorDataScreenRouteProp>().params;

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [logs, setLogs] = useState<Log[] | null>(null);

  const getLogs = async () => {
    api
      .get<{ error: boolean; content: Log[] }>(`/access/${id}`, {
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
    console.log(id);
  };

  const onLongPressLog = (id: number) => {
    console.log(id);
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
    <View style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        {name}
      </Text>
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
                {getTime(item.access_daytime)} | {getDate(item.access_daytime)}
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
});

export default DoorDataScreen;
