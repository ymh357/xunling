import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoundationScreen from '@/screens/FoundationScreen';
import CalendarScreen from '@/screens/CalendarScreen';
import ChatScreen from '@/screens/ChatScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#8B4513',
          },
          headerTitleStyle: {
            color: '#FDF5E6',
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: '#8B4513',
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#DAA520',
          tabBarInactiveTintColor: '#FDF5E6',
        }}
      >
        <Tab.Screen
          name="Foundation"
          component={FoundationScreen}
          options={{
            title: '入门',
            tabBarIcon: ({ color }) => <Icon name="yin-yang" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: '日历',
            tabBarIcon: ({ color }) => <Icon name="calendar-month" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '主页',
            tabBarIcon: ({ color }) => <Icon name="home-variant" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: '询灵',
            tabBarIcon: ({ color }) => <Icon name="message-text" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: '命格',
            tabBarIcon: ({ color }) => <Icon name="account" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
