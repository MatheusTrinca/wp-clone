import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './Chats';
import Photo from './Photo';
import { Ionicons } from '@expo/vector-icons';
import Context from '../context/Context';
import { Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === 'photo') {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
};

export default Home;
