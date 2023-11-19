import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { AccessManagementScreenNavigationProp } from '../../types/Navigation.types';

import api from '../../api';

const AccessManagementScreen: FC = () => {
  const navigation = useNavigation<AccessManagementScreenNavigationProp>();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [doors, setDoors] = useState<{ id: number; name: string }[] | null>(
    null,
  );

  const getDoors = async () => {
    api
      .get<{ error: boolean; content: { id: number; name: string }[] }>(
        '/doors',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        setDoors(response.data.content);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const onPressDoor = (id: number, name: string) => {
    navigation.push('DoorDataScreen', { id, name });
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
      getDoors();
    }
  }, [token]);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Puertas</List.Subheader>
        <FlatList
          data={doors}
          renderItem={element => (
            <List.Item
              onPress={() => onPressDoor(element.item.id, element.item.name)}
              title={element.item.name}
              left={() => <List.Icon icon="door" />}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default AccessManagementScreen;
