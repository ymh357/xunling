import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { useLogin, useUserInfo, useLogout } from '@/store/user';
import { useAtom } from 'jotai';
import { userInfoAtom } from '@/store/atoms/user';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const UserInteraction = () => {
  const { t } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login } = useLogin();
  const { mutate: logout } = useLogout();
  const { data: userInfo } = useUserInfo();
  const [, setUserInfo] = useAtom(userInfoAtom);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);

  const handleLogin = async () => {
    try {
      await login({ username, password });
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(t('auth.loginFailed'), error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo(null);
    } catch (error) {
      console.error(t('auth.logoutFailed'), error);
    }
  };

  return (
    <View className="bg-white/80 rounded-lg p-4">
      {userInfo ? (
        <View className="flex-row items-center">
          <Image
            source={{ uri: userInfo.avatar }}
            className="w-16 h-16 rounded-full"
            defaultSource={{
              uri: 'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',
            }}
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-medium text-[#8B4513]">{userInfo.username}</Text>
            <Text className="text-sm text-[#8B4513]/60">{userInfo.email || userInfo.phone}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} className="p-2 rounded-lg bg-[#8B4513]/10">
            <Icon name="logout" size={20} color="#8B4513" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setShowLoginModal(true)} className="flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-[#8B4513]/10 items-center justify-center">
            <Text className="text-[#8B4513]">{t('auth.login')}</Text>
          </View>
          <Text className="ml-4 text-[#8B4513]/80">{t('auth.loginHint')}</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={showLoginModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white rounded-lg p-6 w-[80%]">
            <Text className="text-lg font-medium text-[#8B4513] mb-4">{t('auth.login')}</Text>

            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder={t('auth.username')}
              className="border border-[#8B4513]/20 rounded-lg px-4 py-2 mb-3"
              placeholderTextColor="#8B4513"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder={t('auth.password')}
              secureTextEntry
              className="border border-[#8B4513]/20 rounded-lg px-4 py-2 mb-4"
              placeholderTextColor="#8B4513"
            />

            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity
                onPress={() => {
                  setShowLoginModal(false);
                  setUsername('');
                  setPassword('');
                }}
                className="px-4 py-2"
              >
                <Text className="text-[#8B4513]/60">{t('common.cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLogin} className="bg-[#8B4513] px-4 py-2 rounded-lg">
                <Text className="text-white">{t('auth.login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserInteraction;
