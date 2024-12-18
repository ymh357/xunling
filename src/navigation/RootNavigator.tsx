import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoundationScreen from '@/screens/FoundationScreen';
import CalendarScreen from '@/screens/CalendarScreen';
import ChatScreen from '@/screens/ChatScreen';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
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
            title: t('navigation.foundation'),
            tabBarIcon: ({ color }) => <Icon name="yin-yang" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: t('navigation.calendar'),
            tabBarIcon: ({ color }) => <Icon name="calendar-month" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('navigation.home'),
            tabBarIcon: ({ color }) => <Icon name="home-variant" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: t('navigation.chat'),
            tabBarIcon: ({ color }) => <Icon name="message-text" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: t('navigation.profile'),
            tabBarIcon: ({ color }) => <Icon name="account" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
